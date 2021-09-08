"use strict";



const USDbaseFiatURL = "https://api.exchangeratesapi.io/latest?base=USD";            // URL for the FIAT exchage-rate API
const cryptoBaseURL = " https://api.binance.com";                                    // Binance base API URL for crypto rates
let query = "/api/v3/ticker/price";                                                  // query for all crypto rates endpoint
let binanceCryptoURL = cryptoBaseURL + query;                                        // Binance all crypto pairs URL

const cryptoSymbolsURL = "https://api.binance.com/api/v3/exchangeInfo";              // Binance API endpoint for retreiving the crypto currencies symbols
const coinbaseUSDURL = "https://api.coinbase.com/v2/exchange-rates?currency=USD";    // Coinbase API URL for exchange rates, USD base


// let query2 = "/api/v3/avgPrice?symbol=" + cryptoSymbol + "USDT";
// let cryptoSymbol = "BTC";
// let binanceCryptoURL = cryptoBaseURL + query2;



// declaring the variables

// Coinbase fiat/crypto convertor 
const input = document.querySelectorAll(".input");
const select = document.querySelectorAll(".currencies-symbol");
let currenciesSymbols = [];
let coinbaseData;
let ratesCoinbase = [];


// Fiat convertor 
const fiatInput = document.querySelectorAll(".fiat-input");
const fiatSelect = document.querySelectorAll(".fiat-currencies-symbol");
let fiatCurrenciesSymbols = [];
let fiatRates = [];
let fiatData;


//Binance crypto convertor
const cryptoInput = document.querySelectorAll(".crypto-input");
const cryptoSelect = document.querySelectorAll(".crypto-currencies-symbol");
let uniqueCryptoSymbols = [];
let cryptoData;
let cryptoSymbolsData;
let cryptoCurrencies = [];



init();


function init() {
    console.log("init");
    fetchData();
}



function fetchData() {
    Promise.all([
        fetch(coinbaseUSDURL),
        //fetch(USDbaseFiatURL),
        fetch(binanceCryptoURL),
        fetch(cryptoSymbolsURL)
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        console.log("fetched data:", data);
        // asigning the data sets to the previously declared variable
        // by storing the data to variable, we have a "cache" like effect.
        coinbaseData = data[0];
        fiatData = data[1];
        cryptoData = data[2];
        cryptoSymbolsData = data[3].symbols;
        prepareData(coinbaseData, fiatData, cryptoData, cryptoSymbolsData);
    }).catch(function (error) {
        console.log(error); //log any fetching error
    });
}



function prepareData(coinbaseData, fiatData, cryptoData, cryptoSymbolsData) {


    //       *** Coinbase fiat/crypto convertor ***

    let currenciesSymbols = Object.keys(coinbaseData.data.rates);  //iterate through the fetched object and storing the currencies symbols in a variable
    ratesCoinbase = coinbaseData.data.rates;
    console.log("Coinbase rates (to USD):", ratesCoinbase);

    // formating and injecting the currencies symbols in the DOM
    currenciesSymbols.map(elem => {
        currenciesSymbols = currenciesSymbols + `<option value=${elem}>${elem}</option>`;
        return currenciesSymbols;
    });
    for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = currenciesSymbols;
    };




    //       *** fiat/fiat convertor ***

    let fiatCurrenciesSymbols = Object.keys(fiatData.rates); //iterate through the fetched object and storing the currencies symbols in a variable.
    fiatRates = fiatData.rates;
    console.log("fiat rates (to USD): ", fiatRates);

    // formating and injecting the currencies symbols in the "select" dropdown.
    fiatCurrenciesSymbols.map(elem => {
        fiatCurrenciesSymbols = fiatCurrenciesSymbols + `<option value=${elem}>${elem}</option>`;
        return fiatCurrenciesSymbols;
    });
    for (let i = 0; i < fiatSelect.length; i++) {
        fiatSelect[i].innerHTML = fiatCurrenciesSymbols;
    };




    //       *** Binance crypto/crypto convertor ***

    // getting all crypto symbols.
    for (let i = 0; i < cryptoSymbolsData.length; i++) {
        cryptoCurrencies[i] = cryptoSymbolsData[i].baseAsset;
    };


    // getting uniques crypto symbols, formating and injecting the currencies symbols in the "select" dropdown. for the "select" dropdown. 
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    };
    let uniqueCryptoSymbols =
        cryptoCurrencies.filter(onlyUnique);
    uniqueCryptoSymbols.map(elem => {
        uniqueCryptoSymbols = uniqueCryptoSymbols + `<option value=${elem}>${elem}</option>`;
        return uniqueCryptoSymbols;
    });
    for (let i = 0; i < cryptoSelect.length; i++) {
        cryptoSelect[i].innerHTML = uniqueCryptoSymbols;
    };

    inputListeners();
};

//       *** Coinbase fiat/crypto convertor ***
//       *** fiat/fiat convertor ***
//       *** Binance crypto/crypto convertor ***


function inputListeners() {

    //       *** Coinbase fiat/crypto convertor ***
    input[0].addEventListener("keyup", () => coinbaseConversion(1, 0));
    input[1].addEventListener("keyup", () => coinbaseConversion(0, 1));
    select[0].addEventListener("change", () => coinbaseConversion(1, 0));
    select[1].addEventListener("change", () => coinbaseConversion(1, 0));

    //       *** fiat/fiat convertor ***
    fiatInput[0].addEventListener("keyup", () => fiatConversion(1, 0));
    fiatInput[1].addEventListener("keyup", () => fiatConversion(0, 1));
    fiatSelect[0].addEventListener("change", () => fiatConversion(1, 0));
    fiatSelect[1].addEventListener("change", () => fiatConversion(1, 0));


    //       *** Binance crypto/crypto convertor ***
    cryptoInput[0].addEventListener("keyup", () => binanceConversion())
    cryptoSelect[0].addEventListener("change", () => binanceConversion());
    cryptoSelect[1].addEventListener("change", () => binanceConversion());
};




function coinbaseConversion(k, l) {
    input[k].value = input[l].value * ratesCoinbase[select[k].value] / ratesCoinbase[select[l].value];
    input[k].value = parseFloat(input[k].value).toFixed(4); //restraining the number of decimals 
};


function fiatConversion(i, j) {
    fiatInput[i].value = fiatInput[j].value * fiatRates[fiatSelect[i].value] / fiatRates[fiatSelect[j].value];
    fiatInput[i].value = parseFloat(fiatInput[i].value).toFixed(2); //restraining the number of decimals 
};



function binanceConversion() {
    // the rates from the binance API endpoint, comes as parity between specific crypto currencies,
    //so I want to compare the selected by the user pair with existing pair form the api data.
    let selectedParity0 = cryptoSelect[0].value + cryptoSelect[1].value;
    let selectedParity1 = cryptoSelect[1].value + cryptoSelect[0].value;
    for (let i = 0; i < cryptoData.length; i++) {
        let elem = cryptoData[i];
        // loops through the data and check if there is a match between the pair selected by the user (e.g: ETHBTC), and the symbol pair from the data.
        if (selectedParity0 == elem.symbol) {
            console.log(selectedParity0)
            cryptoInput[1].value = cryptoInput[0].value * elem.price; // if there is a match, multiply the input value with the rate.
            cryptoInput[1].value = parseFloat(cryptoInput[1].value).toFixed(4); //restraining the number of decimals.
        } else if (selectedParity1 == elem.symbol) {
            cryptoInput[1].value = cryptoInput[0].value * (1 / elem.price);
            cryptoInput[1].value = parseFloat(cryptoInput[1].value).toFixed(4); //restraining the number of decimals.
        } else if (selectedParity0 == selectedParity1) {
            cryptoInput[1].value = cryptoInput[0].value;
        }
        // if there is no rate found, prompt the user --- not functional yet
        // else if (selectedParity0 !== elem.symbol || selectedParity1 !== elem.symbo || selectedParity0 !== selectedParity1) {
        //     document.querySelector(".no-rate").innerHTML = "no rate found for this currency pair";
        //     // console.log("no rate")
        // }
    }
};

