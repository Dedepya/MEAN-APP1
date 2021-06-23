//create express app
const exp = require("express")
const app = exp();
const path = require("path")

//connect angular app with express server
app.use(exp.static(path.join(__dirname, './dist/MeanApp1')))

//import APIS
const userApi = require("./APIS/user-api")


//execute specific api based on path
app.use("/user", userApi)

//import MongoCLient
const mc = require("mongodb").MongoClient;

//connection string
const databaseUrl = "mongodb+srv://dedeepya195:dedeepya195@cluster0.vc3bf.mongodb.net/vnrdb2021?retryWrites=true&w=majority"

//const databaseUrl="mongodb://<username>:<password>@cluster0-shard-00-00.rjvoz.mongodb.net:27017,cluster0-shard-00-01.rjvoz.mongodb.net:27017,cluster0-shard-00-02.rjvoz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

let userCollectionObj;

//connect to DB
mc.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log("err in db connection", err);
    }
    else {
        //get database object
        let databaseObj = client.db("vnrdb2021")
        //create usercollection object

        userCollectionObj = databaseObj.collection("usercollection")
        app.set("userCollectionObj",userCollectionObj)
        console.log("Connected to database")

    }
})



//invalid path
app.use((req, res, next) => {

    res.send({ message: `path ${req.url} is invalid` })
})

//error handling middleware
app.use((err, req, res, next) => {
    res.send({ message: `error is ${err.message}` })
})


//assign port
const port = 3000;
app.listen(port, () => console.log(`Server running on ${port}...`))