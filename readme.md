This is my answer to the exchange-rate website.

The fiat-to-fiat converter and is 100% functional.
The crypto converter with the data provided by Binance is 90% functional. There are some cryptocurrencies that are not converted.
I could not find on binance api, a rates between crypto and fiat.
I seen there is USDT (Tether), a crypto coin that mirrors the price of US dollar. Without any deep financial knowledge, and without all crypto currencies prices in Binance data, I searched for other, more direct, data source, for crypto/fiat/crypto conversion.

Therefore I chose to use the data from the Coinbase API (the same used by Google exchange): https://api.coinbase.com/v2/exchange-rates?currency=USD; Coinbase API documentation:https://developers.coinbase.com/api/v2#get-exchange-rates

I found it to be more easy to work with, well formated JSON and multiple options suitable for a small exchage app (e.g: chosing a base currency for all rates).

Caching the API calls: since I have't worked before with caching, I store the fetched data in variables, keeping the number of calls to minimum per session. ("like cache" effect).
