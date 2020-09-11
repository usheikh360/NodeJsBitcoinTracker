//jshint esversion:6

const express = require ("express");
const bodyParser = require ("body-parser");
const request = require("request");

//Initialise our app
const app = express();

app.use(bodyParser.urlencoded({extended:true})); //urlencoded all lower case

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url : "https://apiv2.bitcoinaverage.com/convert/global",
    method:"get",
    qs : {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){

  var data = JSON.parse(body);
  var price = data.price;
  console.log(price);

  var currentTime = data.time;

  res.write("<p>The current time is " +currentTime + "</p>" );
  res.write("<h1>The conversion of " + amount + crypto +  " in " + fiat + " is " + price +"</h1>");
  res.send();
  });

});



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
