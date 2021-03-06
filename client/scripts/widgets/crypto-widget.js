
function retrieveData(cryptoSearchInput) {

    cryptoSearchInput = document.querySelector('.crypto-search-input')

    if (cryptoSearchInput.value === "") {
        cryptoSearchInput.value = 'BTC';
    }

    axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSearchInput.value}&tsyms=USD`).then(res => {
        let cryptoResults = res.data.DISPLAY[cryptoSearchInput.value.toUpperCase()].USD
        let cryptoImage = cryptoResults.IMAGEURL
        let cryptoPrice = cryptoResults.PRICE
        let cryptoDayHigh = cryptoResults.HIGHDAY
        let cryptoDayLow = cryptoResults.LOWDAY
        let cryptoDayChange = cryptoResults.CHANGEPCT24HOUR

        let cImage = document.querySelector('.crypto-image')
        cImage.src = `https://www.cryptocompare.com/${cryptoImage}`
        let cPrice = document.querySelector('.price')
        cPrice.textContent = `${cryptoPrice}`
        let cDayHigh = document.querySelector('.day-high')
        cDayHigh.textContent = `${cryptoDayHigh}`
        let cDayLow = document.querySelector('.day-low')
        cDayLow.textContent = `${cryptoDayLow}`
        let cDayChange = document.querySelector('.day-change')
        cDayChange.textContent = `${cryptoDayChange}`

        const cryptoData = async () => {
            const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${cryptoSearchInput.value}&tsym=USD&limit=1440&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146`);
            const json = await response.json();
            const data = json.Data.Data
            const times = data.map(obj => obj.time)
            const prices = data.map(obj => obj.high)
            return {
                    times,
                    prices
                }
            }
        /// Error handling ///
        function checkStatus(response) {
            if (response.ok) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }
       
        async function printCryptoChart() {
            let { times, prices } = await cryptoData()
            
            let cryptoChart = document.getElementById('cryptoChart').getContext('2d');
            
            let gradient = cryptoChart.createLinearGradient(0, 0, 0, 400);
            
            gradient.addColorStop(0, '#23B5D3');
            gradient.addColorStop(.425, 'rgba(255,255,255,0)');
            
            Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
            Chart.defaults.global.defaultFontSize = 12;
            
            let createCryptoChart = new Chart(cryptoChart, {
                type: 'line',
                data: {
                labels: times
                        .map(time => `${new Date(time * 1000).getHours()}:00`),
                datasets: [{
                    label: '$',
                    data: prices,
                    backgroundColor: gradient,
                    borderColor: '#23B5D3',
                    borderJoinStyle: 'round',
                    borderCapStyle: 'round',
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHitRadius: 10,
                    lineTension: .2,
                    }]
                },
                options: {
                title: {
                    display: false,
                    text: 'Crypto Chart',
                    fontSize: 35
                },
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                    gridLines: {
                        display: true,
                        color: 'rgba(250,250,250,0.1)',
                        },
                    ticks: {
                        source: 'auto',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontColor: 'rgba(250,250,250,0.6)'
                        }
                    }],
                    yAxes: [{
                    display: true,
                    gridLines: {
                        display: true,
                        color: 'rgba(250,250,250,0.1)'
                        },
                    ticks: {
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontColor: 'rgba(250,250,250,0.6)'
                        }
                    }]
                },
                tooltips: {
                    // callbacks: {
                    //     title: function() {}
                    // },
                    // displayColors: false,
                    // yPadding: 10,
                    // xPadding: 10,
                    // position: 'nearest',
                    // caretSize: 10,
                    // backgroundColor: 'rgba(120,120,120,.8)',
                    // bodyFontSize: 15,
                    // bodyFontColor: '#23B5D3',
                    bodyFontFamily: 'Arial, Helvetica, sans-serif'
                    }
                }
            });
        }
            
        async function updateCryptoPrice() {
            let { times, prices } = await cryptoData()
            let currentPrice = prices[prices.length-1].toFixed(2);
            // document.getElementById("cryptoPrice").innerHTML = "$" + currentPrice;
        }
            
        updateCryptoPrice()
        printCryptoChart()
        
        if (cryptoDayChange > 0) {
            document.querySelector('.day-change').style.color = "lawngreen";
        } else if (cryptoDayChange < 0) {
            document.querySelector('.day-change').style.color = "red";
        } else {
            document.querySelector('.day-change').style.color = "whitesmoke";
        }
    })
}

function createWidgetBody(widgetDiv) {
    cryptoWidgetHTML = `
    <div class="crypto-widget-container">
        <div class="crypto-details-container">
        <form method="" class="crypto-search-form">
        <input type="text" class="crypto-search-input" placeholder="Search ticker...">
        </form>
        <img src="" class="crypto-image">
        <div class="crypto-price">
        <span class="crypto-value-descriptor">Current price: </span>
        <span class="price"></span>
        </div>
        <div class="crypto-day-high">
        <span class="crypto-value-descriptor">24 hour high: </span> 
        <span class="day-high"></span>
        </div>
        <div class="crypto-day-low">
        <span class="crypto-value-descriptor">24 hour low: </span>
        <span class="day-low"></span>
        </div>
        <div class="crypto-day-change">
        <span class="crypto-value-descriptor">24 hour change: </span>
        <span class="day-change"></span>
        <span class="day-low">%</span>
        </div>
        </div>
        </div>
        <div class="crypto-chart-canvas">
        <canvas id="cryptoChart"><canvas>
    </div>
    `
    
    cryptoWidget = document.createElement('div')
    cryptoWidget.classList.add('crypto-widget')
    cryptoWidget.innerHTML = cryptoWidgetHTML
    widgetDiv.append(cryptoWidget)

    let cryptoSearchForm = document.querySelector('.crypto-search-form')
    let cryptoSearchInput = document.querySelector('.crypto-search-input')
    retrieveData(cryptoSearchInput)

    cryptoSearchForm.addEventListener('submit', event => {
        event.preventDefault()
        retrieveData(cryptoSearchInput)
    })
}

function initialiseCryptoWidget(widgetDiv) {
    createWidgetBody(widgetDiv)
}


