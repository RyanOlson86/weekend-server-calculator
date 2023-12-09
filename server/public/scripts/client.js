console.log('client.js is sourced!');

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
    currentResults.num1 = firstNum
    currentResults.num2 = secondNum
    console.log('in calculateValue',currentResults)

    // Axios POST request
    axios({
        method: "POST",
        url: "/calculations",
        data: { 
            numbers: currentResults
        }
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
       let latestResult =incArray[incArray.length-1].numbers
       let resultHistory = document.getElementById("resultHistory")
       resultHistory.innerHTML+= `<div>${latestResult.num1} ${latestResult.operator} ${latestResult.num2} = ${latestResult.result}</div>`

       // display latest result
       let recentResult = document.getElementById('result')
       recentResult.innerHTML = latestResult.result
      })
      .catch((error)=>{
        console.log("server error", error);
      })
}