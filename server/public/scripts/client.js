console.log('client.js is sourced!');
displayResults()
let currentResults = {}

// Need a function  to store operator clicked
function operatorClicked (event){
    event.preventDefault()
    let newOperator = event.target.textContent
    currentResults.operator = newOperator
    console.log(currentResults)
}

function calculateValue(event){
    event.preventDefault()
    //store values in form and push to currentResults object
    let firstNum = document.getElementById("firstNum").value
    let secondNum = document.getElementById("secondNum").value
    currentResults.numOne = firstNum
    currentResults.numTwo = secondNum
    console.log('in calculateValue',currentResults)

    // Axios POST request
    axios({
        method: "POST",
        url: "/calculations",
        data: currentResults
      })
      .then((response)=>{
        console.log('successfully added')
        displayResults()
      })
      .catch((error)=>{
        console.log("server error", error);
      })
    document.getElementById("calculator").reset()
}

function displayResults(){


    // Axios GET request
    axios({
        method: "GET",
        url: "/calculations",
      })
      .then((response)=>{
        console.log('response from get', response.data)
       let incArray = response.data
       // display history
       let latestResult =incArray[incArray.length-1]
       let resultHistory = document.getElementById("resultHistory")
       resultHistory.innerHTML =''
       for(let items of incArray){
        resultHistory.innerHTML+= `<div>${items.numOne} ${items.operator} ${items.numTwo} = ${items.result}</div>`
       }

       // display latest result
       let recentResult = document.getElementById('recentResult')
       recentResult.innerHTML = `<h2>Result: ${latestResult.result}</h2>`
      })
      .catch((error)=>{
        console.log("server error", error);
      })
}

// Function to clear inputs
function clearInputs(event){
  event.preventDefault()
  document.getElementById("calculator").reset()
}