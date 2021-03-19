import React,  {useEffect, useState} from 'react';
import CurrencyRow from './components/CurrencyRow';
import './components/Converter.css';

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [toCurrency,setToCurrency] = useState()
  const [fromCurrency,setFromCurrency] =useState()
  const [units, setUnits] = useState(1)
  const [changeInFromUnits,  setChangeInFromUnits] = useState(true)
  const [exchangeRates, setExchangeRates] = useState('')


  let fromUnits, toUnits;
  if(changeInFromUnits){
    fromUnits = units
    toUnits = units * exchangeRates;
  } else{
    toUnits = units
    fromUnits = units / exchangeRates;
  }
  
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRates(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  useEffect(() => {
      fetch('https://api.exchangeratesapi.io/latest')
      .then(response => response.json())
      .then(data => {
        const firstOption = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstOption)
        setExchangeRates(data.rates[firstOption])
      })
  },[]);

  const handleFromAmountChange = (e) => {
    setUnits(e.target.value)
    setChangeInFromUnits(true);
  }

  const handleToAmountChange = (e) => {
    setUnits(e.target.value)
    setChangeInFromUnits(false);
  }

  return (
    <div>
      <h1>Convert Currency</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}  
        currentCurrency={fromCurrency}
        onChangeUnits={handleFromAmountChange}
        onCurrencyChange={(e) => setFromCurrency(e.target.value)}
        units={fromUnits}

      />
      <div className="equals">=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        currentCurrency={toCurrency}
        onChangeUnits={handleToAmountChange}
        onCurrencyChange={(e) => setToCurrency(e.target.value)}
        units={toUnits}
      />
    </div>

  );
}

export default App;
