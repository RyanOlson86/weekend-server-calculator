const express = require('express');
const app = express();
const bodyParser = require('body-parser')
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}))

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res)=>{
  console.log('In GET /calculations', calculations)
  res.send(calculations)
})

// POST /calculations
app.post('/calculations', (req, res)=>{
  console.log('In POST /calculations', req.body)
  calculateResult(req.body)
  calculations.push(req.body)
  res.sendStatus(201);
})


function calculateResult(incObject){
  let number1 = JSON.parse(incObject.num1)
  let number2 = JSON.parse(incObject.num2)

  if (incObject.operator==='+'){
    incObject.result = number1 + number2
  }
  if (incObject.operator==='-'){
    incObject.result = number1 - number2
  }
  if (incObject.operator==='*'){
    incObject.result = number1 * number2
  }
  if (incObject.operator==='/'){
    incObject.result = number1 / number2
  }

}


// ! DON'T GO BELOW
// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
