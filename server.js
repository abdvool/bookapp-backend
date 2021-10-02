'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const server = express();
server.use(cors())
const bookModel = require('./modules/bookFind')
server.use(express.json());
const PORT = process.env.PORT;


// server.use(express.json())
// you need to write here if you want to use post to read the body

mongoose.connect(`${process.env.MONGO_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });


// mongoose.connect('mongodb://localhost:27017/books');


// already moved to bookFind.js
//  const bookSchema = new mongoose.Schema({
//     title: String,
//     description:String,
//     email:String
//   });

// const bookModel = mongoose.model('book', bookSchema);



function seedBookInformation() {

    const abd = new bookModel({


        title: 'deathnote',
        description: 'kill people',
        email: 'abdvool@gmail.com'
    })

    const ahmad = new bookModel({

        title: 'akame ga kill',
        description: 'fighting',
        email: 'ahmad.alhussny0@gmail.com'
    })



    const abd2 = new bookModel({

        title: '91days',
        description: 'Mafia',
        email: 'abdvool@gmail.com'
    })



    abd.save()
    ahmad.save()
    abd2.save()
}


//   seedBookInformation()


server.put('/update/:updateId', updateHandler)
server.get('/deleteBooks', deleteBookHandler)
server.get('/', homeHandler);
server.get('/getBooksOwner', getCatsHandler)
server.get('/addBook', addBookHandler)
//if  you want to use   it as post and send as post  and accept as post 
//server.post('/addBook', addBookHandler) and it will be inside the body not outside 
function homeHandler(req, res) {

    res.send('all good')

}

//localhost:3001/getBooksOwner?ownerName=razan
function getCatsHandler(req, res) {

    let email2 = req.query.email

    bookModel.find({ email: email2 }, function (error, ownerData) {

        if (error) {

            console.log('error in getting data', error);

        } else {

            // console.log(ownerData);
            res.send(ownerData)
        }

    })

}





async function deleteBookHandler(req, res) {

    let email = req.query.email
    let bookId = req.query.bookId
    console.log(bookId);
    await bookModel.deleteOne({ _id: bookId }, async function (error, data) {

        if (error) {

            console.log('error in getting data', error);

        } else {

            await bookModel.find({ email: email }, function (error, ownerData) {

                if (error) {

                    console.log('error in getting data', error);

                } else {
                    console.log('wewrewrwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
                    console.log(ownerData);
                    res.send(ownerData)
                }

            }
            )
        }


    })

}

// /addBook?ownerName1=email&bookTitle1=killer&bookDescription1=youwilldie
async function addBookHandler(req, res) {

    // console.log(req.query);
    let { ownerName1, bookTitle1, bookDescription1 } = req.query
    // let {ownerName1, bookTitle1, bookDescription1} = req.body
    // her you want to change the req.body if you want to use post because it will be inside not outside belong to line 72

    // ---------------
    // firstWay
    const newBook = new bookModel({

        title: bookTitle1,
        description: bookDescription1,
        email: ownerName1
    })
    await newBook.save()


    //secondWay

    // bookModel.create({
    //     title: bookTitle1 ,
    //     description: bookDescription1  ,
    //     email: ownerName1

    // })



    //  you can name ownerData what ever you want 
    bookModel.find({ email: ownerName1 }, function (error, ownerData) {

        if (error) {

            console.log('error in getting data', error);

        } else {

            // console.log(ownerData);
            res.send(ownerData)
        }

    }
    )
}


// ---------------



async function updateHandler(req, res) {

    console.log('finially');
    let idBook = req.params.updateId;
    let { title, description, email } = req.body;
    bookModel.findByIdAndUpdate(idBook, { title, description, email }, (err, updata) => {
        if (err) {
            console.log(err);
        } else {
            console.log("data updated");
            bookModel.find({ email: req.body.email }, (err, data) => {
                if (err) {
                    console.log("err");
                } else {
                    res.send(data);
                }
            })
        }
    })

}

















server.listen(PORT, () => {

    console.log(`listening on PORT ${PORT}`);
})















