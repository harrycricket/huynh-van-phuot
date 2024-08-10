'use client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';
import { fetchPrices } from '../utils/api';
import tokenIcons from '../utils/token';

const CurrencySwapForm = () => {
  const [tokens, setTokens] = useState([]);
  const [prices, setPrices] = useState({});
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenList = [
          { symbol: 'BLUR', label: 'BLUR' },
          { symbol: 'BUSD', label: 'BUSD' },
          { symbol: 'USD', label: 'USD' }, 
          { symbol: 'GMX', label: 'GMX' }, 
          { symbol: 'RATOM', label: 'RATOM' },
          { symbol: 'STEVMOS', label: 'STEVMOS' },
          { symbol: 'LUNA', label: 'LUNA' },
          { symbol: 'ATOM', label: 'ATOM' },
          { symbol: 'WBTC', label: 'WBTC' },
          { symbol: 'OKT', label: 'OKT' },
          { symbol: 'ETH', label: 'Ethereum' },
          { symbol: 'YieldUSD', label: 'YieldUSD' },
          { symbol: 'SWTH', label: 'SWTH' },
        ];

        const tokenOptions = tokenList.map((token) => ({
          value: token.symbol,
          label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={tokenIcons[token.symbol]}
                alt={token.symbol}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              {token.label}
            </div>
          ),
        }));
        setTokens(tokenOptions);

        const pricesData = await fetchPrices();
        console.log(pricesData, 'pricesDatapricesData');
        setPrices(pricesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromToken || !toToken || !amount || isNaN(amount) || amount <= 0) {
      setError('Please fill in all fields correctly.');
      return;
    }

    const priceList = prices.reduce((acc, item) => {
      acc[item.currency] = item.price;
      return acc;
    }, {});
    const fromPrice = priceList[fromToken.value] || 0;
    const toPrice = priceList[toToken.value] || 0;

    // console.log(fromToken, 'fromToken');
    // console.log(fromPrice, 'fromPrice');

    if (fromPrice === 0 || toPrice === 0) {
      setError('Price data is missing for selected tokens.');
      return;
    }

    const amountInUSD = amount * fromPrice;
    const converted = amountInUSD / toPrice;

    setConvertedAmount(converted.toFixed(2));
    setError(null);
  };

  return (
    <div className='w-1/3 mx-auto px-12 py-10 border border-gray-300 rounded-md shadow-md'>
      {loading ? (
        <div className='text-center'>
          <ClipLoader size={24} color='orange' speedMultiplier={0.75} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className='text-center font-bold text-xl'>Convert Currency</p>
          {error && <p className='error'>{error}</p>}
          <div className='mb-3.5'>
            <label>From:</label>
            <Select
              options={tokens}
              onChange={setFromToken}
              value={fromToken}
              isClearable
              placeholder='Select currency'
            />
            <input
              type='number'
              placeholder='Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className='mb-3.5'>
            <label>To:</label>
            <Select
              options={tokens}
              onChange={setToToken}
              value={toToken}
              isClearable
              placeholder='Select currency'
            />
          </div>
          <button type='submit'>Convert</button>
          {convertedAmount !== null && (
            <div className='result'>
              <h3>Converted Amount: <span className='text-lime-500 text-xl font-bold'>{convertedAmount}</span></h3>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default CurrencySwapForm;
