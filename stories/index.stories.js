import React from "react";
import { storiesOf } from "@storybook/react";
import apiConfig from "./apiConfig";
import { RestClient } from '../src';

const Demo = () => {
  const Client = new RestClient();

  Client.call(apiConfig.getUsers, null, null).then(res => {
    console.log(res.data);
  });

  Client.call(apiConfig.getUser, {id: 3}, null).then(res => {
    console.log(res.data);
  });

  let reqBody = {
      "name": "morpheus",
      "job": "leader"
  }

  Client.call(apiConfig.createUser, null, reqBody).then(res => {
    console.log(res.data);
  });

  return null;
};

storiesOf("Rest Client", module).add("demo", () => <Demo />);
