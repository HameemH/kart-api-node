const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://manufucterer_admin:C6zKXkZ8IxuAWCA8@cluster0.stwgp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run (){
   try{
       await  client.connect()
       const customersCollection = client.db("CRUD").collection("customers");
       const productsCollection = client.db("CRUD").collection("productrs");
       const ordersCollection = client.db("CRUD").collection("orders");

       /* Customers Section */
   }
   finally{

   }
}

app.get('/', (req, res) =>{
    res.send('Running My Node CRUD Server');
});

app.listen(port, () =>{
    console.log('CRUD Server is running');
})

run().catch(console.dir)