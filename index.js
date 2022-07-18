const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
           /* Products Section */

           app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
          });
          app.post('/products', async(req,res)=>{
            const product =req.body;
            const addProduct = await productsCollection.insertOne(product)
            res.send(addProduct)
          })
          app.delete('/products/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productsCollection.deleteOne(query);
            
            res.send(result);
          })
          app.put('/products/:id', async(req, res) =>{
            const id = req.params.id;
            const updatedProduct = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updatedDoc = {
                $set: updatedProduct
            };
            const result = await productsCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
    
        })

        /* Order Section */
        app.post('/orders', async(req,res)=>{
            const order =req.body;
            const addOrder = await ordersCollection.insertOne(order)
            res.send(addOrder)

        })
        app.get('/orders', async (req, res) => {
            const query = {}
            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
          });
            // Order of a specific customer filtered by email
          app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            const query = {email:email}
            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
          });
          app.put('/orders/:id', async(req,res) =>{
            const id = req.params.id;
            
            const updatedOrder = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
              $set: updatedOrder,
            };
            const result = await ordersCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })
        app.delete('/orders/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await ordersCollection.deleteOne(query);
            res.send(result);
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