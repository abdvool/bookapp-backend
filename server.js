'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const server = express();
server.use(cors())
const PORT= process.env.PORT;





mongoose.connect('mongodb://localhost:27017/books');


const bookSchema = new mongoose.Schema({
    title: String,
    description:String,
    email:String
  });

  const bookModel = mongoose.model('book', bookSchema);



  function seedBookInformation(){

const abd = new bookModel({

  
    title: 'deathnote',
    description:'kill people',
    email:'abdvool@gmail.com'
})

const ahmad = new bookModel({

    title: 'akame ga kill',
    description:'fighting',
    email:'ahmad.alhussny0@gmail.com'
})



const abd2 = new bookModel({

    title: '91days',
    description:'Mafia',
    email:'abdvool@gmail.com'
})



abd.save()
ahmad.save()
abd2.save()
  }


//   seedBookInformation()




server.get('/',homeHandler);
server.get('/getBooksOwner', getCatsHandler)

function homeHandler(req,res) {

    res.send('all good')

 }

//localhost:3001/getBooksOwner?ownerName=razan
 function getCatsHandler(req,res){

     let email2 =req.query.email

     bookModel.find({email:email2},function(error,ownerData){

        if(error){

            console.log('error in getting data',error);

        }else {

            console.log(ownerData);
            res.send(ownerData)
        }

    })

    



}


server.listen(PORT,() =>{

    console.log(`listening on PORT ${PORT}`);
})















