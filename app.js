require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const  {User}  = require('./models/model');
const cors = require('cors')
const app = express();
const url='mongodb://localhost:27017/CrudOperationDB';
app.use(cors());
app.use(express.json())

mongoose.connect(url).then(()=>{
    console.log("Connected Successfully.......!!!!!");
}).catch(err=>{
    console.log(err,"error occured!!!!!!!!!");
})

//get method
app.get('/getUser',async (req,res)=>{
    const user = await User.find();
   res.send({error:false,message:"User data got successfully",Result:user});
});

//post method
app.post('/addUser', async (req,res) => {
    const data = new User({
        name:req.body.name,
        age:req.body.age
    })
    const newUser = await data.save();
    if(newUser){
    res.send({error:false,message:'UserData Posted Successfully',Result:newUser});
    }else{
    res.send({error:true,message:'UserData not posted',Result:res});
    }
});

//Update method 
app.put('/editUser/:_id',async (req,res)=>{
    User.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, data){
        if(err) return res.send({err:true,message:err.message})
        else
        res.send({err:false,message:"updated successfully",Result:data})
    })
})

//Delete method
app.delete('/deleteUser/:_id', async (req,res)=>{
    User.findByIdAndRemove(req.params._id, function (err, data){
        if(err) return res.send({err:true,message:err.message})
         else 
          res.send({error:false,message:"deleted successfully!!!",Result:data})
    });

})

app.listen(5000, ()=>{
    console.log('5000 port is running');
})
