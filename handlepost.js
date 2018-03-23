'use strict';
const fetch = require('node-fetch')
const request = require("request");
const url = "https://myionic.azurewebsites.net/";
const serverless = require('serverless-http');
const express = require('express')
const app = express()

const mongojs = require('mongojs');

//Title: "S3 bucket-Aws", isdone: false, isdeleted: false

//Save Task


function addTaskApi(task){
  
  
  return new Promise((resolve, reject) => {
   
    request.post({url:url+'api/task',form: task}, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });

  })
   
}
function getTaskApi(){
  
  return new Promise((resolve, reject) => {
    request(url+'api/tasks', (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
      

  })
   
}


var lambda = async (event,context,cb) =>{

  var tasksData = await getTaskApi()
  let myEvent =  event.Name?event.Name:"No Event"
  let myKey = event.PKey?event.PKey:"No Key"

 
  cb(null, { Lambdamessage: 'Async/Await Serverless v1.0! Your function executed successfully-'+myEvent+"-"+myKey,data:tasksData});
   
};


var lambda2 = async (event,context,cb) =>{

  let myEvent =  event.Name?event.Name:"Lambda Schedule Event "
  let myKey = event.PKey?event.PKey:"No Key"
  let myDate = new Date().toJSON();

  let packageData = {
    Title:myEvent+"--"+myDate,
    isdone:false,
    isdeleted:false,
    date:myDate
  }
  var tasksData = await addTaskApi(packageData);
 

  cb(null, { Postmessage: 'Async/Await Serverless v1.0! Your function executed successfully-',dataresponse:tasksData , packageSent:packageData});
      
};

module.exports.app = lambda;

module.exports.post = lambda2;