'use strict';
const fetch = require('node-fetch')
const request = require("request");
//const url = "https://myionic.azurewebsites.net/";
const serverless = require('serverless-http');
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
//const mongojs = require('mongojs');
const MONGO_URL = process.env.MONGO_URL || null;

function updateTaskApi(task){
  return new Promise((resolve, reject) => {
     MongoClient.connect(MONGO_URL, function (err, client) {
       if (err) {
         reject(err);
       }
       console.log("Connected successfully to server");

       let db = client.db("cferrerdb");
       let idObject = new ObjectID(task.id);

       if(db != null){ //is db an object {_id:task._id},{ $set: { isdone: task.isdone} },{ upsert: true }
       //filter: {a:2}, update: {$set: {a:2}}, upsert:true }
         console.log("Connected successfully to db");
         db.collection('tasks').updateOne({_id:idObject},{$set:{isdone:task.isdone?true:false,isdeleted:task.isdeleted?true:false}},(err,res) =>{
             if (err) {
                client.close(); 
                reject(err);
             }
                client.close();          
                resolve("Successfully record updated Task Id --"+ JSON.stringify(idObject)+ " is deleted "+ task.isdeleted)
           }
         )
         
       }else  console.log("Error on db object ", db);
      
     
     });
     
 })
  
}

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

var lambda_put = async (event,context,cb) =>{

  let myEvent = event._id?event._id:null
  let isDone =  event.isdone;
  let isDeleted =  event.isdeleted
 
  let packageData = {
    id:myEvent,
    isdone:isDone,
    Title:event.Title,
    isdeleted:isDeleted
    
  }
  var tasksData = await updateTaskApi(packageData);
 



  cb(null, { Postmessage: 'Async/Await Serverless v1.0! Your function updateTaskApi executed successfully-',dataresponse:tasksData , packageSent:event});
      
};
var lambda_post = async (event,context,cb) =>{

  let myDate = new Date().toJSON();
  let myEvent =  event.Title?event.Title:"Lambda Schedule Event -- "+myDate
  let myKey = event.PKey?event.PKey:"No Key"
 
  let packageData = {
    Title:myEvent,
    isdone:false,
    isdeleted:false,
    date:myDate
  }
  var tasksData = await addTaskApi(packageData);
 



  cb(null, { Postmessage: 'Async/Await Serverless v1.0! Your function addTaskApi executed successfully-',dataresponse:tasksData , packageSent:packageData});
      
};

module.exports.app = lambda;

module.exports.post = lambda_post;

module.exports.put = lambda_put;
