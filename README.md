This is a starter template for [Serverless](https://serverless.com/framework/) projects.


**The Serverless Framework** – Build applications comprised of microservices that run in response to events, auto-scale for you, and only charge you when they run.  This lowers the total cost of maintaining your apps, enabling you to build more logic, faster.

<img align="right" width="400" src="https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/email/sls-getting-started.gif" />

1. **Install via npm:**
  ```bash
  npm install -g serverless
  ```

2. **Set-up your [Provider Credentials](./docs/providers/aws/guide/credentials.md)**. [Watch the video on setting up credentials](https://www.youtube.com/watch?v=HSd9uYj2LJA)

3. **Create a Service:**

  You can create a new service or [install existing services](#how-to-install-a-service).
  ```bash
  # Create a new Serverless Service/Project
  serverless create --template aws-nodejs --path my-service
  # Change into the newly created directory
  cd my-service
  ```

4. **Deploy a Service:**

  Use this when you have made changes to your Functions, Events or Resources in `serverless.yml` or you simply want to deploy all changes within your Service at the same time.
  ```bash
  serverless deploy -v
  ```

5. **Deploy the Function:**

  Use this to quickly upload and overwrite your AWS Lambda code on AWS, allowing you to develop faster.
  ```bash
  serverless deploy function -f hello
  ```

6. **Invoke the Function:**

 Invokes an AWS Lambda Function on AWS and returns logs.
  ```bash
  serverless invoke -f hello -l
  ```
# 7. **in this project:**
  # Use serverless-webpack
   ```bash
   git clone https://github.com/cferrer0128/lambdajs.git lambdajs
   cd into the folder lambdajs
   then npm install
  

  ```
  # Use serverless-webpack plugin to transpile ES6/E
    ```bash
                **inside the yml file**
            plugins:
                - serverless-webpack
        
    ```
# Use serverless-webpack with Async/await
 ```bash
        var lambda2 = async (event,context,cb) =>{

            var tasksData = await getTaskApi();
            cb(null, {data:tasksData});
        }
 ```
 # Use serverless-webpack with .babelrc
 ```bash  
         **inside the .babelrc file**
        "plugins": ["transform-runtime"],
        "presets": ["env", "stage-3"]
 ```
# Use serverless-webpack with MongoDB
    ```bash
        environment: 
            MONGO_URL: "mongodb://userdb:userdb@ds163718.mlab.com:63718/cferrerdb"  
    ```
  
