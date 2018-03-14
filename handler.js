'use strict';
const fetch = require('node-fetch')

const request = require("request");
const url = "https://myionic.azurewebsites.net/api/tasks";
const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', function (req, res) {

  getTaskApi().then((response) =>{
    res.send(response)
  })

})
function getTaskApi(){
  
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(err); return;
      }
      resolve(body);
    });
      

  })
   
}


var lambda = async (event,context,cb) =>{

  var tasksData = await getTaskApi()
  cb(null, { message: 'Async/Await Serverless v1.0! Your function executed successfully!', data: tasksData });
   
};

module.exports.handler = lambda;