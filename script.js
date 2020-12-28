"use strict";


const fiatAPIurl = "https://api.exchangeratesapi.io/latest"

// Request specific exchange rates by setting the symbols parameter.
// const fiatAPIurl = "https://api.exchangeratesapi.io/latest?symbols=USD,GBP"

// Quote against a different currency by setting the base parameter in the request.
// const fiatAPIurl = "https://api.exchangeratesapi.io/latest?base=USD "


init()

let currencySymbols = [];
let eurBasedRate;

let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");

const fiatInput = document.querySelectorAll(".fiat-input");
const fiatSelect = document.querySelectorAll(".currencies-symbol");
let symbols = "";
let rates = [];








function init() {
    console.log("init");
    getFiat(fiatAPIurl, prepareData);
}


function getFiat(fiatAPIurl, callback) {
    fetch(fiatAPIurl)
        .then((response) => response.json())
        .then((fiatData) => {
            // when loaded, prepare objects
            callback(fiatData);
            getRates(fiatData);

        });
}



function prepareData(fiatData) {

    let currencySymbols = Object.keys(fiatData.rates)
    rates = fiatData.rates;
    console.log(rates)
    currencySymbols.map(item => {
        currencySymbols = currencySymbols + `<option value=${item}>${item}</option>`;
        return currencySymbols;
    });

    for (let i = 0; i < fiatSelect.length; i++) {
        fiatSelect[i].innerHTML = currencySymbols;
    }

    inputListeners();
};



function getRates(fiatData) {
    console.log("get")


    const rates = fiatData.rates;
    // console.log(rates)

}


// function inputListeners() {

//     fiatInput[0].addEventListener("keyup", () => {
//         fiatInput[1].value = fiatInput[0].value * rates[fiatSelect[1].value] / rates[fiatSelect[0].value];
//     });

//     fiatInput[1].addEventListener("keyup", () => {
//         fiatInput[0].value = fiatInput[1].value * rates[fiatSelect[0].value] / rates[fiatSelect[1].value];
//     });

//     fiatSelect[0].addEventListener("change", () => {
//         fiatInput[1].value = fiatInput[0].value * rates[fiatSelect[1].value] / rates[fiatSelect[0].value];
//     });

//     fiatSelect[1].addEventListener("change", () => {
//         fiatInput[1].value = fiatInput[0].value * rates[fiatSelect[1].value] / rates[fiatSelect[0].value];
//     });

// }



function inputListeners() {

    fiatInput[0].addEventListener("keyup", () => conversion(1, 0));

    fiatInput[1].addEventListener("keyup", () => conversion(0, 1));

    fiatSelect[0].addEventListener("change", () => conversion(1, 0));

    fiatSelect[1].addEventListener("change", () => conversion(1, 0));

}

function conversion(i, j) {
    fiatInput[i].value = fiatInput[j].value * rates[fiatSelect[i].value] / rates[fiatSelect[j].value];
}




