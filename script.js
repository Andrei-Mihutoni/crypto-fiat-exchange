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



input1.addEventListener("keyup", conversion1)
input2.addEventListener("keyup", conversion2)




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
    let selectSybmol = document.getElementsByClassName("currencies-symbol");

    for (let i = 0; i < currencySymbols.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = currencySymbols[i];
        selectSybmol[0].appendChild(option);

        // for (let i = 0; i < select.length; i++) {
        //     selectSybmol[i].appendChild(option)
        // }
    }
    for (let i = 0; i < currencySymbols.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = currencySymbols[i];
        selectSybmol[1].appendChild(option);
    }

    // select1.addEventListener("change", () => {
    //     console.log(typeof fiatData.rates)
    // })


    const fiatDataKeys = Object.keys(fiatData.rates);
    console.log(fiatDataKeys.value)


};

function getRates(fiatData) {
    console.log("get")

    const rates = fiatData.rates;
    // console.log(rates)
}


function conversion1(fiatData) {

    // input2.value = input1.value * 5;
    console.log(select1.value)
    // input1.value = input2.value;
}

function conversion2() {
    // input2.value = input1.value;
}






