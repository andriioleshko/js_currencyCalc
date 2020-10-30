const usdRateBuy     = document.getElementById('usdRateBuy');
const usdRateSell    = document.getElementById('usdRateSell');
const eurRateBuy     = document.getElementById('eurRateBuy');
const eurRateSell    = document.getElementById('eurRateSell');
const gpbRateBuy     = document.getElementById('gpbRateBuy');
const gpbRateSell    = document.getElementById('gpbRateSell');

fetch("https://api.monobank.ua/bank/currency")
    .then(response => {return response.json()})
    .then(data => {
        console.log(data)
        usdRateBuy. textContent  = data[0].rateBuy;
        usdRateSell.textContent  = data[0].rateSell;
        eurRateBuy. textContent  = data[1].rateBuy;
        eurRateSell.textContent  = data[1].rateSell;
        gpbRateBuy. innerHTML    = (data[5].rateCross * 0.95).toFixed('2');
        gpbRateSell.innerHTML    = (data[5].rateCross * 1.05).toFixed('2');
    })
    .catch(err => {
        console.log(err)
    })

    buy_button.onclick = () => {
        let buy = true;
        setResult(buy);
    }
    
    sel_button.onclick = () => {
        let buy = false;
        setResult(buy);
    }
    
    getTextBuySell = (buy) => {
        switch (buy) {
            case true:
                return "купівлі";
            case false:
                return "продажу";
        }
    }

    getCurencyPrice = (buy, indexOfCurrency) => {
        switch (buy) {
            case true:
                switch (indexOfCurrency) {
                    case 0:
                        currencyPrice = usdRateBuy.textContent;
                        break;
                    case 1:
                        currencyPrice = eurRateBuy.textContent;
                        break;
                    case 2:
                        currencyPrice = gpbRateBuy.textContent;
                        break;
                }
                break;
            case false:
                switch (indexOfCurrency) {
                    case 0:
                        currencyPrice = usdRateSell.textContent;
                        break;
                    case 1:
                        currencyPrice = eurRateSell.textContent;
                        break;
                    case 2:
                        currencyPrice = gpbRateSell.textContent;
                        break;
                }
                break;
            }
        return currencyPrice;
    }

    setResult = (buy) => {
        let result;
        let currencyPrice;
        let textBuySell;
    
        const indexOfCurrency = document.getElementById('selectCurrency').options.selectedIndex;
        const descriptionOfCurrency = document.getElementById('selectCurrency').options[indexOfCurrency].text;
        const val = document.getElementById('input-value').value;
    
        textBuySell = getTextBuySell(buy);
        currencyPrice = getCurencyPrice(buy, indexOfCurrency);
        
        result = (val * currencyPrice).toFixed('2');
    
        document.getElementById('result').innerHTML = `Для ${textBuySell} ${val} ${descriptionOfCurrency} необхідно: ${result} грн.`;
    }
