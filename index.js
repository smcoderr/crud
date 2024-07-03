const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors(
  // {
  //   origin:["https://crud-frondend-api.vercel.app"],
  //   methods:["POST","GET"],
  //   credentials:true
  // }
));
app.use(express.json());

mongoose.connect("mongodb+srv://souravoz2018:E4UOt6dJlytZY8A8@cluster0.pkddqg6.mongodb.net/crud");

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get("/", (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)  // Corrected parameter name from _id to id
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put("/updateUser/:id", (req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});


app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
