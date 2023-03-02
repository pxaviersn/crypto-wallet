
import React from 'react';
import 'reactjs-popup/dist/index.css';
import  './addOperation.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddOperation() {
  const [formValues, setFormValues] = useState({
    coin: '',
    coinPrice: '',
    value: '',
    exchangeFee: '',
    quantityCrypto: '',
    date: '',
  });

  const [cryptoOptions, setCryptoOptions] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=400&page=1')
      .then((response) => {
        const options = response.data.map((crypto) => ({
          value: crypto.id,
          label: crypto.name,
          icon: crypto.image,
        }));
        setCryptoOptions(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCoinChange = (event) => {
    setFormValues({
      ...formValues,
      coin: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setFormValues({
      ...formValues,
      date: event.target.value,
    });
  };

  function handleCoinPriceChange(event) {
    const newCoinPrice = event.target.value;
    const newValue = formValues.quantityCrypto * (newCoinPrice - formValues.exchangeFee);
    setFormValues({ ...formValues, coinPrice: newCoinPrice, value: newValue });
  }

  function handleValueChange(event) {
    const newValue = event.target.value;
    const newQuantityCrypto = (newValue - formValues.exchangeFee) / formValues.coinPrice;
    setFormValues({ ...formValues, value: newValue, quantityCrypto: newQuantityCrypto });
  }

  function handleExchangeFeeChange(event) {
    const newExchangeFee = event.target.value;
    const newValue = formValues.quantityCrypto * (formValues.coinPrice - newExchangeFee);
    const newQuantityCrypto = (formValues.value - newExchangeFee) / formValues.coinPrice;
    setFormValues({ ...formValues, exchangeFee: newExchangeFee, value: newValue, quantityCrypto: newQuantityCrypto });
  }

  function handleQuantityCryptoChange(event) {
    const newQuantityCrypto = event.target.value;
    const newValue = newQuantityCrypto * (formValues.coinPrice - formValues.exchangeFee);
    setFormValues({ ...formValues, quantityCrypto: newQuantityCrypto, value: newValue });
  }

  return (
    <form className='form-class'>
      <label>
        <div className='div-text'>Crypto</div>
        <select className='input' name="coin" value={formValues.coin} onChange={handleCoinChange}>
          <option value=""></option>
          {cryptoOptions.map((option) => (
            <option key={option.value} value={option.value}>
              <img src={option.icon} alt={`${option.label} icon`} width="16" height="16" />
              {option.label}
            </option>
          ))}
        </select>
      </label>

      
      <label>
      <div className='div-text'>Date:</div>
      <input
          className='input'
          type="date"
          name="date"
          required
          value={formValues.date}
          onChange={handleDateChange}
        />
      </label>


      <label>
      <div className='div-text'>Coin Price:</div>
        <input
          className='input'
          type="number"
          name="coin-price"
          value={formValues.coinPrice}
          onChange={handleCoinPriceChange}
        />
      </label>

      <label>
      <div className='div-text'>Value:</div>
        <input
        className='input'
          type="number"
          name="value"
          value={formValues.value}
          onChange={handleValueChange}
        />
      </label>

      <label>
        <div className='div-text'>Exchange Fee:</div>
        <input
          className='input'
          type="number"
          name="exchange-fee"
          value={formValues.exchangeFee}
          onChange={handleExchangeFeeChange}
        />
      </label>

      <label>
        <div className='div-text'>Crypto Quantity:</div>
        <input
          className='input'
          type="number"
          name="quantity-crypto"
          step="0.001"
          value={formValues.quantityCrypto}
          onChange={handleQuantityCryptoChange}
        />
      </label>

      <input type="submit" value="Save" />
    </form>
  );
}