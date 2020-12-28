"use strict";


const USDbaseFiatURL = "https://api.exchangeratesapi.io/latest?base=USD"


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


function getFiat(USDbaseFiatURL, callback) {
    fetch(USDbaseFiatURL)
        .then((response) => response.json())
        .then((fiatData) => {
            // when loaded, prepare objects
            callback(fiatData);
        });
}



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




