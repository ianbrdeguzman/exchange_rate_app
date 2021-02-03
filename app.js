// assign HTML DOM elements
const toInput = document.querySelector('#to-input');
const fromInput = document.querySelector('#from-input');
const fromCurrency = document.querySelector('.select-from');
const toCurrency = document.querySelector('.select-to');
const exchangeBtn = document.querySelector('#exchange');

// create Date function
const createDate = () => {
    const date = document.querySelector('#date');
    const d = new Date();
    
    date.innerHTML = d.toDateString().slice(4);
};

// fetch latest exchange rate
const getRate = async () => {
    const EXR_API_KEY = '75cdb4fcb904766e08896f48';
    const EXR_API = `https://v6.exchangerate-api.com/v6/${EXR_API_KEY}/latest/${fromCurrency.value}`;

    const response = await fetch(EXR_API);
    const data = await response.json();

    // call calculate data
    calculate(data);
};

const calculate = (data) => {
    
    // get current rate
    const rate = data.conversion_rates[toCurrency.value];

    // multiple input value to current rate
    toInput.value = (fromInput.value * rate).toFixed(2);

    // call showRate function
    showRate(rate);
};

const showRate = (rate) => {
    
    // get HTML DOM element
    const rateContainer = document.querySelector('#rate-container');

    // clear innerHTML
    rateContainer.innerHTML = '';
    
    // create new item
    const item = 
    `
    <p>${fromInput.value} ${fromCurrency.value} = ${rate.toFixed(2)} ${toCurrency.value}</p>
    `

    // replace innerHTML with new item
    rateContainer.innerHTML = item;
};

const exchange = () => {
    // assign input fromCurrency value to temp container
    const tempContainer = fromCurrency.value;

    // assign toCurrency value to fromCurrency  
    fromCurrency.value = toCurrency.value;

    // assign tempContainer value to toCurrency
    toCurrency.value = tempContainer;

    // call getRate function to update
    getRate();
};

// event listener when input is made
fromInput.addEventListener('input', getRate);

// event listener when currency is change
fromCurrency.addEventListener('change', getRate);

// event listener when exchange button is clicked
exchangeBtn.addEventListener('click', exchange);

// call createDate
createDate();

// call getRate
getRate();
