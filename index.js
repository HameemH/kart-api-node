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
       app.get('/users', async (req,res)=>{
        const query ={};
        const cursor = customersCollection.find(query)
        const users = await cursor.toArray();
        res.send(users)
        })
        //   will use to update and add new customer with same api as it is put method 
        app.put('/users/:email', async(req,res) =>{
            const email = req.params.email;

            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
              $set: user,
            };
            const result = await customersCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })
        app.delete('users/:email', async(req,res) =>{
            const email =req.params.email;
            const query ={email:email};
            const user = await customersCollection.deleteOne(query);
            
            res.send(user)

        })

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