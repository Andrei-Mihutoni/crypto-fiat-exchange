"use strict";


const USDbaseFiatURL = "https://api.exchangeratesapi.io/latest?base=USD"
const cryptoBaseURL = " https://api.binance.com"

let query = "/api/v3/ticker/price"
let cryptoURL = cryptoBaseURL + query;
console.log(cryptoURL)


init()

let currencySymbols = [];

const fiatInput = document.querySelectorAll(".fiat-input");
const fiatSelect = document.querySelectorAll(".currencies-symbol");

let symbols = "";
let rates = [];



function init() {
    console.log("init");
    getFiat(USDbaseFiatURL, prepareData);
}


async function getFiat(USDbaseFiatURL, callback) {
    await fetch(USDbaseFiatURL)
        .then((response) => response.json())
        .then((fiatData) => {
            // when loaded, prepare objects
            callback(fiatData);
        });
}


// Promise.all([
//     fetch(url1).then(value => value.json()),
//     fetch(url2).then(value => value.json())
//     ])
//     .then((value) => {
//        console.log(value)
//       //json response
//     })
//     .catch((err) => {
//         console.log(err);
//     });




function prepareData(fiatData) {

    let currencySymbols = Object.keys(fiatData.rates)
    rates = fiatData.rates;
    console.log(rates)
    currencySymbols.map(elem => {
        currencySymbols = currencySymbols + `<option value=${elem}>${elem}</option>`;
        return currencySymbols;
    });

    for (let i = 0; i < fiatSelect.length; i++) {
        fiatSelect[i].innerHTML = currencySymbols;
    }

    inputListeners();
};




function inputListeners() {
    fiatInput[0].addEventListener("keyup", () => conversion(1, 0));
    fiatInput[1].addEventListener("keyup", () => conversion(0, 1));
    fiatSelect[0].addEventListener("change", () => conversion(1, 0));
    fiatSelect[1].addEventListener("change", () => conversion(1, 0));
}

function conversion(i, j) {
    fiatInput[i].value = fiatInput[j].value * rates[fiatSelect[i].value] / rates[fiatSelect[j].value];
    fiatInput[i].value = parseFloat(fiatInput[i].value).toFixed(2); //restraining the number of decimals 
}


