"use strict";

// https://api.binance.com/api/v3/avgPrice?symbol=ETHBTC

const USDbaseFiatURL = "https://api.exchangeratesapi.io/latest?base=USD"
const cryptoBaseURL = " https://api.binance.com"
const cryptoSymbolsURL = "https://api.binance.com/api/v3/exchangeInfo"
const coinbaseUSDURL = "https://api.coinbase.com/v2/exchange-rates?currency=USD"


let query = "/api/v3/ticker/price"

let cryptoSymbol = "BTC";
let query2 = "/api/v3/avgPrice?symbol=" + cryptoSymbol + "USDT";
console.log(query2)


// let cryptoURL = cryptoBaseURL + query2;
let cryptoURL = cryptoBaseURL + query;
console.log(cryptoURL)


// init()
let currenciesSymbols = [];
let currencySymbols = [];
let uniqueCryptoSymbols = [];


const input = document.querySelectorAll(".input");
const select = document.querySelectorAll(".currencies-symbol");

const fiatInput = document.querySelectorAll(".fiat-input");
const fiatSelect = document.querySelectorAll(".fiat-currencies-symbol");

const cryptoInput = document.querySelectorAll(".crypto-input");
const cryptoSelect = document.querySelectorAll(".crypto-currencies-symbol");

// let symbols = "";
let rates = [];
let fiatData;
let cryptoData;
let cryptoSymbolsData;
let cryptoCurrencies = [];
let coinbaseData;
let ratesCoinbase = [];




// function init() {
//     console.log("init");
//     getFiat(USDbaseFiatURL, cryptoURL, prepareData);
// }




Promise.all([
    fetch(USDbaseFiatURL),
    fetch(cryptoURL),
    fetch(cryptoSymbolsURL),
    fetch(coinbaseUSDURL)
]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
        return response.json();
    }));
}).then(function (data) {
    console.log(data)
    // asigning the data sets to the previously declared variable
    fiatData = data[0];
    cryptoData = data[1];
    cryptoSymbolsData = data[2].symbols;
    coinbaseData = data[3];
    prepareData(fiatData, cryptoData, cryptoSymbolsData, coinbaseData);
}).catch(function (error) {
    // if there's an error, log it
    console.log(error);
});




function prepareData(fiatData, cryptoData, cryptoSymbolsData, coinbaseData) {
    console.log(coinbaseData.data.rates);

    let currenciesSymbols = Object.keys(coinbaseData.data.rates);
    ratesCoinbase = coinbaseData.data.rates;

    currenciesSymbols.map(elem => {
        currenciesSymbols = currenciesSymbols + `<option value=${elem}>${elem}</option>`;
        return currenciesSymbols;
    });

    for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = currenciesSymbols;
    }






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




    // console.log(cryptoSymbolsData)


    // Getting all crypto symbols
    for (let i = 0; i < cryptoSymbolsData.length; i++) {
        cryptoCurrencies[i] = cryptoSymbolsData[i].baseAsset;
    }
    // console.log(cryptoCurrencies);


    // Getting uniques crypto symbols
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    let uniqueCryptoSymbols =
        cryptoCurrencies.filter(onlyUnique);
    // console.log(uniqueCryptoSymbols); 

    uniqueCryptoSymbols.map(elem => {
        uniqueCryptoSymbols = uniqueCryptoSymbols + `<option value=${elem}>${elem}</option>`;
        return uniqueCryptoSymbols;
    });

    for (let i = 0; i < cryptoSelect.length; i++) {
        cryptoSelect[i].innerHTML = uniqueCryptoSymbols;
    };

    // cryptoInput[0].value = "";
    // cryptoInput[1].value = "";
    inputListeners();

    // console.log(cryptoData)
};




function inputListeners() {

    input[0].addEventListener("keyup", () => coinbaseConversion(1, 0));
    input[1].addEventListener("keyup", () => coinbaseConversion(0, 1));
    select[0].addEventListener("change", () => coinbaseConversion(1, 0));
    select[1].addEventListener("change", () => coinbaseConversion(1, 0));


    fiatInput[0].addEventListener("keyup", () => fiatConversion(1, 0));
    fiatInput[1].addEventListener("keyup", () => fiatConversion(0, 1));
    fiatSelect[0].addEventListener("change", () => fiatConversion(1, 0));
    fiatSelect[1].addEventListener("change", () => fiatConversion(1, 0));

    cryptoInput[0].addEventListener("keyup", () => binanceConversion(1, 0));
    cryptoInput[1].addEventListener("keyup", () => binanceConversion(0, 1));
    cryptoSelect[0].addEventListener("change", () => binanceConversion(1, 0));
    cryptoSelect[1].addEventListener("change", () => binanceConversion(0, 1));


};



function coinbaseConversion(k, l) {
    console.log(select[k].value)
    input[k].value = input[l].value * ratesCoinbase[select[k].value] / ratesCoinbase[select[l].value];
    input[k].value = parseFloat(input[k].value).toFixed(4); //restraining the number of decimals 

};



function fiatConversion(i, j) {
    console.log(fiatInput[i].value)
    fiatInput[i].value = fiatInput[j].value * rates[fiatSelect[i].value] / rates[fiatSelect[j].value];
    fiatInput[i].value = parseFloat(fiatInput[i].value).toFixed(2); //restraining the number of decimals 
    console.log(fiatSelect[i].value)
};



function binanceConversion(x, z) {
    let selectedParity0 = cryptoSelect[0].value + cryptoSelect[1].value;
    let selectedParity1 = cryptoSelect[1].value + cryptoSelect[0].value;
    console.log(selectedParity0, selectedParity1)

    document.querySelector(".pair-alert").innerHTML = ""

    for (let i = 0; i < cryptoData.length; i++) {
        let elem = cryptoData[i];

        if (selectedParity0 == elem.symbol || selectedParity1 == elem.symbol) {
            console.log(elem.price)
            console.log(elem.symbol)
            cryptoInput[x].value = cryptoInput[z].value * elem.price;
        }
        else if (selectedParity0 == selectedParity1) {
            cryptoInput[x].value = cryptoInput[z].value;
            // console.log(elem.price)
        }

    }

}













// const USDbaseFiatURL = "https://api.exchangeratesapi.io/latest?base=USD"
// const cryptoBaseURL = " https://api.binance.com"

// let query = "/api/v3/ticker/price"
// let cryptoURL = cryptoBaseURL + query;



// init()


// function init() {
//     console.log("init");
//     getFiat(cryptoURL, prepareData);
// }



// async function getFiat(cryptoURL, callback) {
//     await fetch(cryptoURL)
//         .then((response) => response.json())
//         .then((cryptoData) => {
//             // when loaded, prepare objects
//             callback(cryptoData);

//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }


// function prepareData(cryptoData) {

//     console.log(cryptoData)
// };
