import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { getPosts } from '../../api/postApi';
import { CurrencyDropdown } from '../Dropdown';

export const CurrencyReact = () => {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");


    const {data, isLoading, isError,error, refetch} = useQuery({
        queryKey : ["currency"],
        queryFn : () => getPosts(from, to, amount),
        refetch : false,
    });

    

    const handleConversion = () =>{
        refetch();
    }

    if(isError)return <h1>Error: {error.message}</h1>
    if(isLoading) return <h1>Loading....</h1>

  return(
      <section className="currency-converter p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Currency Converter</h1>
  
        <div className="w-full max-w-md mb-6">
          <label htmlFor="amount" className="block mb-1 font-medium">
            Amount
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            id="amount"
            placeholder="Enter the amount"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>
  
        <div className="w-full max-w-2xl flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <label className="block mb-1 font-medium">From:</label>
            <CurrencyDropdown value={from} setValue={setFrom} />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">To:</label>
            <CurrencyDropdown value={to} setValue={setTo} />
          </div>
        </div>
  
        <div className="conversion-rate w-full max-w-md mb-6 text-center bg-gray-200 dark:bg-gray-700 rounded p-3">
          <h2 className="text-lg font-semibold">
            Conversion Rate: 1 {from} = {data.conversion_rate} {to}
          </h2>
        </div>
  
        <div className="output-div text-center mb-6">
          <div className="text-xl font-semibold">
            {data.data.conversion_result > 0 ? data.data.conversion_result.toFixed(2)  : "Conversion will appear here"}
          </div>
        </div>
  
        <button
          onClick={handleConversion}
          disabled={amount <= 0 || isLoading}
          className={`conversion-btn px-6 py-3 rounded text-white transition ${
            amount <= 0 || isLoading
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700" 
          }`}
        >
          {isLoading ? (
            <span className="animate-spin">⏳</span> 
          ) : (
            "Convert"
          )}
        </button>
      </section>
    );
}
