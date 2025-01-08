const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");
const exchangeBtn = document.querySelector(".container button");
let from_curr = document.querySelector(".from select");
let to_curr = document.querySelector(".to select");
const dateUpdate = document.querySelector(".update");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
        
       
    }
    select.addEventListener("change", (evt) =>{
            updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}



const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input")
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 0){
        amountValue = 1;
        amount.value = "1";
    }
    
    let from = from_curr.value.toLowerCase()
    let to = to_curr.value.toLowerCase()
    const URL = `${BASE_URL}/${from_curr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    
    let rate = 0;
    for(curr in data[from]){
        if(curr === to){
           rate = data[from][to]; 
           newRate = rate.toFixed(2); //toFixed() show the few desimal number
           //Massage part
           msg.innerText = `${amountValue} ${from_curr.value} = ${amountValue*newRate} ${to_curr.value}`;
           date = data["date"];
           dateUpdate.innerText = `Last update on ${date}`
        }
    }
};


exchangeBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    // console.log(rate);
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
