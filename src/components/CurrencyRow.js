import React from 'react';


const CurrencyRow = ({currencyOptions, currentCurrency, units, onChangeUnits, onCurrencyChange}) => {

    return (
        <div>
            <input type="number" value={units} onChange={onChangeUnits}/>
            <select value={currentCurrency} onChange={onCurrencyChange}>
            {currencyOptions.map(currency => (
                    <option value={currency} key={currency}>
                        {currency}
                    </option>
                ))
            }
            </select>
        </div>
    )
}

export default CurrencyRow;