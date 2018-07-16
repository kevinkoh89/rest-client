### API CLIENT

Restful API Client using axios

### Switch to Marine Online NPM server
You need to switch to Marine Online NPM server to be able to install package from our private server
```
$ npm install -g nrm
$ nrm add bmonpm http://nexus.pm.bwoilmarine.com/repository/npm_group/
$ nrm use bmonpm
```

### Installing this package 
Run below command to install the bmo-rest-client package to your current project
```
$ npm install bmo-rest-client
```

##### Creating New file in your project apiConfig.js

After install the bmo-rest-client, you need to create a apiConfig file in your project under service folder
All your API used in your project will be set in apiConfig

1. import Endpoint function and Request method from 'bmo-rest-client'
2. set your API's calling method and uri

##### How to set apiConfig

1. allCountry, portList, getFormFields are your API name, you can name it whatever you want
2. inside EndPoint() function, first parameter is the API's request method. And there are 4 type of method (Request.GET, Request.POST, Request.PUT, Request.DELETE). Second parameter is the API's endpoints(URIs), URI parameter will be in curly bracket {uriParam}

```
import { Endpoint, Request } from 'bmo-rest-client';

const apiConfig = {
	allCountry : Endpoint(Request.GET, "/pda_api/portexcel/allcountry"),
	getFormFields : Endpoint(Request.GET, "/pda_api/port/field/{country}/{port}"),
	calculate: Endpoint(Request.POST, "/pda_api/port/calculate"),
	getRateOfExchange: Endpoint(Request.GET, "/currency/exchangerate/{country}")
}

export default apiConfig;
```

##### Sample calling API using bmo-rest-client in your store

1. import your apiConfig file
2. import the RestClient from 'bmo-rest-client'

RestClient.call() accept 3 parameters

* first (request.method and API's URI) which you already set in apiConfig file. 
* second parameter are URI's params values(object format), request header
* third parameter is your request body

```
import apiConfig from './apiConfig';
import { RestClient } from 'bmo-rest-client';

const FormFields = () =>{
	RestClient.call(apiConfig.getFormFields, {country: country, port: port}, null)
	.then(res => {
		//you can assign the data from api to your observable
		console.log(res.data)
	})
}
```
##### Using PROXY for development
add proxy in package.json
````
"proxy": "http://www.sit1.bwoilmarine.com",
````