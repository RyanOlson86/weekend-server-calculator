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
    // console.log(currentResults)
    document.getElementById("calculator").reset()
}