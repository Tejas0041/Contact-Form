const express = require("express");
const app = express();
const port =80;
const path= require("path");
const fs=require('fs');

// connecting Mongoose//
const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/gymdata', {useNewUrlParser: true});

// Defining the Schema//

const formSchema = new mongoose.Schema({
  Name:String,
  Age: Number,
  Gender: String,
  Contact: String,
  Address: String,
  More: String

});


const formData = mongoose.model('formData', formSchema);

// Now, if a post request comes.. we have to store that data from the post request into a database//



app.use('/static',express.static('static'));    

// It helps to bring the data from form to Express//
app.use(express.urlencoded());

app.set('view engine','pug');

app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    res.status(200).render('index.pug');
})

// saving data to MongoDB//

app.post('/',(req,res)=>{

   const myData= new formData(req.body);

   myData.save().then(()=>
   {
    res.status(200).render('message.pug');

   }).catch((error) => {
    console.error("Error saving data:", error);
    res.status(404).send("Your Data cannot be submitted");
  });
  



  

    // let nameOfUser= req.body.Name;
    // let ageOfUser= req.body.Age;
    // let genderOfUser= req.body.Gender;
    // let contactOfUser= req.body.Contact;
    // let addressOfUser= req.body.Address;
    // let moreOfUser= req.body.More;

    // let data= `Name: ${nameOfUser}, Age: ${ageOfUser}, Gender:${genderOfUser}, Contact:${contactOfUser}, Address:${addressOfUser}, more:${moreOfUser}
    
    // `;

    // fs.writeFileSync('output.txt',data);

    // const sourceFilePath = 'output.txt';
    // const destinationFilePath = 'database.txt';
    

    // fs.readFile(sourceFilePath, 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Error reading source file:', err);
    //       return;
    //     }
      
        
    //     fs.appendFile(destinationFilePath, data, 'utf8', (err) => {
    //       if (err) {
    //         console.error('Error writing to destination file:', err);
    //         return;
    //       }
      
    //       console.log('Content successfully appended to the destination file.');
    //     });
    //   });

    // res.status(200).render('message.pug');

})

const http= require('http');
const hostname='127.0.0.1';

app.listen(port, ()=>{
    console.log(`The application started successfully at http://${hostname} at the port ${port}`);
})