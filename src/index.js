import axios from 'axios';
import axiosRetry from 'axios-retry';
import format from "string-template";

const inRange = (value, min, max) => value >= min && value <= max

export const Request = { GET:"get", POST:"post", PUT:"put", DELETE:"delete" }

export class RestClient{
    constructor(configs){
        this._configs=Object.assign({
            api:'/api',
            timeOut:5000,
            retry:0
        },configs)
        
        this.axiosConfig = {
            baseURL: this._configs.api,
            timeout: this._configs.timeOut
        }
        this.client = axios.create(this.axiosConfig)
    }

    call = async (endpoint, urlParams, postValue) => {

        this.client.interceptors.request.use((config) => {
            return config;
        },  (error) => {
            return Promise.reject(error);
        });
    
        this.client.interceptors.response.use((response) => {
            return response;
        },  (error) => {
            console.log("interceptors response error")
            return Promise.reject(error);
        });
    
        axiosRetry(this.client, { retries: this._configs.retry || 0, retryDelay: (retryCount) => {
            return retryCount * 1000;
        }});

        let formatedUrl = urlParams? format(endpoint.uri,urlParams) : endpoint.uri;

        

        let requestConfig = {
            url: formatedUrl,
            method: endpoint.method 
        }
        
        if (endpoint.method != Request.GET) {
            requestConfig['data'] = postValue
        }

        try {
            let response = await this.client.request(requestConfig)
            return transformResponse(response)
        } catch (error) {
            if (error.response) {
              return transformResponse(error.response)
            }
            throw error
        }
    }
}

const wrapAxiosResponse = (axiosResponse) =>{
    const wrappedResponse = {
        status: axiosResponse.status,
        statusText: axiosResponse.statusText,
        config: axiosResponse.config,
        headers: axiosResponse.headers,
        status: axiosResponse.status,
        data: axiosResponse.data
    }

    wrappedResponse.isOk = wrappedResponse.status == 200
    wrappedResponse.isCreated = wrappedResponse.status == 201
    wrappedResponse.isBadRequest = wrappedResponse.status == 400
    wrappedResponse.isForbidden = wrappedResponse.status == 403
    wrappedResponse.isNotFound = wrappedResponse.status == 404
    wrappedResponse.isServerError = wrappedResponse.status == 500

    wrappedResponse.isSuccessful = inRange(wrappedResponse.status, 200, 299)
    wrappedResponse.isClientError = inRange(wrappedResponse.status, 400, 499)

    return wrappedResponse
}

const transformResponse = (response) => {
    const wrappedResponse = wrapAxiosResponse(response)
    return wrappedResponse
}

export const Endpoint = (method, url) => {
    return {
        uri: url,
        method: method
    }
}

const apiWrapper = { RestClient, Endpoint, Request };
export default apiWrapper