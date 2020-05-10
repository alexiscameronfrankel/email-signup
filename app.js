const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express(); 

app.use(express.static("public"));

app.get("/", function(req,res){ // / because localhost is the home page not signup.html 
   res.sendFile( __dirname + "/signup.html")
})

app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req,res){
    console.log(req.body)

    const email = req.body.email 
    const firstName = req.body.first 
    const lastName = req.body.last
    
    const data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName, 
                    LNAME: lastName
                }

            }
        ]
    }

    let jsonData = JSON.stringify(data); //because that's the format that Mailchimp specifies 

    const url = "https://us18.api.mailchimp.com/3.0/lists/02574ec0ce"

    const options = {
        method: "POST", 
        auth: "alexis:51e1fac38e3835abf70dd359f545ed6c-us18"
    }

   const request =  https.request(url, options, 'POST', function(response){
      
        response.on("data", function(data){
            console.log(JSON.parse(data)); //takes the weird terminal/server numbers and turns it into data
        })

    })
    request.write(jsonData)
    request.end();

});



app.listen(3000, function(){
    console.log("Sever is running on port 3000")
})

// API KEY
// 51e1fac38e3835abf70dd359f545ed6c-us18

//AUDIENCE ID 
//02574ec0ce