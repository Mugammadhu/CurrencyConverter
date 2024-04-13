import { useState,useEffect, useTransition } from 'react'
import './currency.css'
import axios from 'axios'


export const CurrencyConverter = () => {
    const [amount,setAmount]=useState(1);
    const [fromCurrency,setFromCurrency]=useState("USD");
    const [toCurrency,setToCurrency]=useState("INR");
    const [convertedCurrency,setConvertedCurrenct]=useState(null)
    const [exchangeRate,setExchangeRate]=useState(null);

    const handleAmountChange=(e)=>{
        
        setAmount(e.target.value);
    }


    useEffect(()=>{
       const getExchangeRate=async()=>{
        try{
            let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
            const response=await axios.get(url);
            setExchangeRate(response.data.rates[toCurrency]);
        }
        catch(error){
            console.log(error)
        }
       };
       getExchangeRate();
    },[fromCurrency,toCurrency])

useEffect(()=>{
    if(exchangeRate!==null){
        setConvertedCurrenct(amount*exchangeRate)
    }
},[amount,exchangeRate])



  return (
    <>
    <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
            <h1>Currency Converter</h1>
            <div className='input-container'>
                <label htmlFor="amt">Amount:</label>
                <input type="number"  id="amt" value={amount} onChange={handleAmountChange}/>
            </div>
            <div className='input-container'>
                <label htmlFor="fromCurrency">From Currency:</label>
                <select  id="fromCurrency" value={fromCurrency} onChange={(e)=>{setFromCurrency(e.target.value)}}>
                    <option value="USD">USD-United State Dollar</option>
                    <option value="EUR">EUR-Euro</option>
                    <option value="GBP">GBP-British Pound Sterling</option>
                    <option value="JPY">JPY-Japanese Yen</option>
                    <option value="AUD">AUD-Australian Dollar</option>
                    <option value="CAD">CAD-Canadian Dollar</option>
                    <option value="CNY">CNY-Chinese Yuan</option>
                    <option value="INR">INR-Indian Rupee</option>
                    <option value="BRL">BRL-Brazilian Real</option>
                    <option value="ZAR">ZAR-South African</option>
                </select>    
            </div>
            <div className='input-container'>
                <label htmlFor="toCurrency">To Currency:</label>
                <select  id="toCurrency" value={toCurrency} onChange={(e)=>{setToCurrency(e.target.value)}}>
                    <option value="USD">USD-United State Dollar</option>
                    <option value="EUR">EUR-Euro</option>
                    <option value="GBP">GBP-British Pound Sterling</option>
                    <option value="JPY">JPY-Japanese Yen</option>
                    <option value="AUD">AUD-Australian Dollar</option>
                    <option value="CAD">CAD-Canadian Dollar</option>
                    <option value="CNY">CNY-Chinese Yuan</option>
                    <option value="INR">INR-Indian Rupee</option>
                    <option value="BRL">BRL-Brazilian Real</option>
                    <option value="ZAR">ZAR-South African</option>
                </select>    
            </div>
            <div className='result'>
                <p>{amount} {fromCurrency} is equal to {convertedCurrency} {toCurrency}</p>
            </div>
        </div>
    </div>
    </>
  )
}
