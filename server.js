require('dotenv').config()
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const PartnerSchema = mongoose.Schema({
    name : {
        type:String ,
        required: true ,
    }
    ,
    partner :{
        type : String ,
        required : true ,
    }
},{timestamps:true});


const Partner = mongoose.model('Partner' , PartnerSchema);

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
})();

const app = express(); 

app.use(bodyParser.json())
app.use(cors()); 

app.post('/About' , async(req , res)=>{ 
    
const {name , partner }  = req.body ; 

const newPartner =  new Partner({name , partner});    
const result = await newPartner.save()  
     res.send(result);
})  

app.get('/About' , async(req , res)=>{ 
      
     const responseData = await Partner.find();  
     let myArr = []  
     
     responseData.forEach(element => {
        myArr.push(element)
     }); 
     console.log(myArr)
     res.send(myArr);
}) 

app.listen(process.env.PORT, ()=>{
    console.log('Haa ! chalu Ho Gya main To');
})