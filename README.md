# Mission-Accomplished

An application to connect Developers

* How to Deploy the application 
 > For deploying a web application, there are several options like AWS, Heroku,DigitalOcean etc. I have taken Heroku for simplicity.
   For deploying this app in heroku ,following steps should be taken:
 >Setup express with below code
 // ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

  
 >Set up the environment variables for storing sensitive information and create a port as const port = process.env.PORT || 5000 
 so that heroku can create a port automatically when deployed.
 
 >Set up mLab to use MONGODB_URI as mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/abc")
 
 >As we know that we have to run "npm run build" in create-react-app during production so that it compiles everything together into one place, static assets, all JavaScript, etc
 but with heroku following line of code will perform the operation and and run our server file with node once it's built.Add the folloing line
 of code to package.json :
 "scripts": {
    "start": "node server.js",
    "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"
}
>Also the version of node should be taken care so check your version of node with node-v in the command line and add the following line 
of code in your package.json 
"engines": {
    "node": "8.9.2"
}

>After these configuration
>go to heroku.com and
>Go to your Dashboard
>Select the newly created App.
>Click the 'Deploy' tab
>In 'Deployment Method', click 'GitHub'. If you have not connected your github to heroku yet, it will have you authenticate this connect request.
>Connect your Git Repo to the Heroku app. Put the name of your git repo in the "Search for repository to connect to", then click "Connect".

### Installing Locally


```
> git clone https://github.com/jbidari15/Mission-Accomplished.git
> npm install (installs the dependencies for back-end)
>cd client
>npm install (installs the dependencies for front-end)
>cd ..(get out of client)
> npm run dev (this one starts the front-end and back-end server together as concurrently is used for development)

```
### List of API used

#### Data API
* `'/api/data' - GET` - get all saved data
* `'/api/data/' - POST` - Create new Data


## Author

* **Jaya Kumar Bidari** - [jbidari15]


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
