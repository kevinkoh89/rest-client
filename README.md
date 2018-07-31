### API CLIENT

Restful API Client using axios

##### Creating New file in your project apiConfig.js

After install the rest-client, you need to create a apiConfig file in your project under service folder
All your API used in your project will be set in apiConfig

1. import Endpoint function and Request method from 'rest-client'
2. set your API's calling method and uri

##### How to set apiConfig

1. inside EndPoint() function, first parameter is the API's request method. And there are 4 type of method (Request.GET, Request.POST, Request.PUT, Request.DELETE). Second parameter is the API's endpoints(URIs), URI parameter will be in curly bracket {uriParam}

```
import { Endpoint, Request } from 'rest-client';

const apiConfig = {
	getUsers: Endpoint(Request.GET, "/users"),
	apiGetWithParam: Endpoint(Request.GET, "/uri/{param1}/{param2}"),
	createUser: Endpoint(Request.POST, "/users"),
	getUser: Endpoint(Request.DELETE, "/users/{id}")
};

export default apiConfig;
```

##### Sample calling API using rest-client in your store

1. import your apiConfig file
2. import the RestClient from 'rest-client'

RestClient.call() accept 3 parameters

* first (request.method and API's URI) which you already set in apiConfig file. 
* second parameter are URI's params values(object format), request header
* third parameter is your request body

```
import apiConfig from './apiConfig';
import { RestClient } from 'rest-client';

const Client = new RestClient();

Client.call(apiConfig.getUsers, null, null).then(res => {
	console.log(res.data);
});
```
##### Using PROXY for development
add proxy in package.json
````
"proxy": "https://reqres.in",
````

testing using fake api provided by https://reqres.in


##### To see the demo
````
npm start storybook
````
