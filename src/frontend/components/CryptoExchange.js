// 导入必要的库和组件
import React from "react";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
const theme: Theme = {
  primary: "#1F4A05",
  secondary: "#5F7D52",
  interactive: "#CBD6BA",
  container: "#D9ECD9",
  module: "#E9F7DF",
  accent: "#8E8B78",
  outline: "#CADDC2",
  dialog: "#FFF",
  fontFamily: "Nunito",
  borderRadius: 0.8,
};

function CryptoExchange() {
  return (
    <div
      className="Uniswap"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SwapWidget />
    </div>
  );
}

export default CryptoExchange;

/*import axios from "axios";

// 创建一个React组件
const CryptoExchange = () => {
  // 设置状态变量
  const [exchangeRate, setExchangeRate] = useState(null);
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("");

  // 获取汇率数据
  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${fiatCurrency}${cryptoCurrency}`
      );
      setExchangeRate(response.data.price);
    } catch (error) {
      console.error("获取汇率数据出错:", error);
    }
  };

  // 当用户输入改变时，更新状态变量
  const handleFiatCurrencyChange = (event) => {
    setFiatCurrency(event.target.value.toUpperCase());
  };

  const handleCryptoCurrencyChange = (event) => {
    setCryptoCurrency(event.target.value.toUpperCase());
  };

  // 当用户点击按钮时，获取汇率数据
  const handleButtonClick = () => {
    fetchExchangeRate();
  };

  // 渲染组件
  return (
    <div>
      <input
        type="text"
        placeholder="输入法币"
        value={fiatCurrency}
        onChange={handleFiatCurrencyChange}
      />
      <input
        type="text"
        placeholder="输入加密货币"
        value={cryptoCurrency}
        onChange={handleCryptoCurrencyChange}
      />
      <button onClick={handleButtonClick}>获取汇率</button>
      {exchangeRate && <p>汇率: {exchangeRate}</p>}
    </div>
  );
};

export default CryptoExchange;*/
