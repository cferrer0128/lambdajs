'use strict';
const fetch = require('node-fetch')
const request = require("request");
//const url = "https://myionic.azurewebsites.net/";
const serverless = require('serverless-http');
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
//const mongojs = require('mongojs');
const MONGO_URL = process.env.MONGO_URL || null;
//Title: "S3 bucket-Aws", isdone: false, isdeleted: false

//Save Task


function addTaskApi(task){
   return new Promise((resolve, reject) => {
      MongoClient.connect(MONGO_URL, function (err, client) {
        if (err) {
          reject(err);
        }
        console.log("Connected successfully to server");
 
        let db = client.db("cferrerdb");

        if(db != null){ //is db an object
          console.log("Connected successfully to db");
          db.collection('tasks').insertOne(task, err => {
              if (err) {
                reject(err);
              }
              client.close();          
              resolve("Successfully record inserted")
            }
          );
        }else  console.log("Error on db object ", db);
       
      
      });
      
  })
   
}
function getTaskApi(){
  
  return new Promise((resolve, reject) => {
    //mongo driver
    MongoClient.connect(MONGO_URL, function (err, client) {
      
      console.log("Connected successfully to server");
      let db = client.db("cferrerdb");
      let filter ={};
      db.collection('tasks').find({}).toArray((err, docs) => {
        if (err) {reject(err);}
        console.log("Found the following records");
        client.close();
        resolve(docs)
        
      });
    
   
    
    });
    ///mongo driver
      

  })
   
}


var lambda = async (event,context,cb) =>{

  var tasksData = await getTaskApi()
  let myEvent =  event.Name?event.Name:"No Event"
  let myKey = event.PKey?event.PKey:"No Key"

 
  cb(null, {data:tasksData});
   
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