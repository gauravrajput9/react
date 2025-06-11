import { useState } from "react";
import { CurrencyDropdown } from "./Dropdown";
import { getPosts } from "../api/postApi";

const Currency = () => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [receivedData, setReceivedData] = useState({});
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleConversion = async () => {
    setLoading(true);
    if(amount <= 0){
        window.alert("Enter Amount Greater than Zero...");
        return;
    }
    try {
      const res = await getPosts(from, to, amount);
      const data = await res.data;
      setReceivedData(res.data);
      setConvertedAmount(data.conversion_result);
      setLoading(false); // Set loading to false once conversion is done
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
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
          Conversion Rate: 1 {from} = {receivedData.conversion_rate} {to}
        </h2>
      </div>

      <div className="output-div text-center mb-6">
        <div className="text-xl font-semibold">
          {convertedAmount > 0 ? convertedAmount : "Conversion will appear here"}
        </div>
      </div>

      <button
        onClick={handleConversion}
        disabled={amount <= 0 || loading}
        className={`conversion-btn px-6 py-3 rounded text-white transition ${
          amount <= 0 || loading
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700" 
        }`}
      >
        {loading ? (
          <span className="animate-spin">⏳</span> 
        ) : (
          "Convert"
        )}
      </button>
    </section>
  );
};

export default Currency;
