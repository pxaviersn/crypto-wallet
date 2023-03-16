import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import InfoBar from '../components/InfoBar';

const HomePage = () => {
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalCurrentBalance, setTotalCurrentBalance] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalProfitPercentage, setTotalProfitPercentage] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Error: no token found');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/operations/user`, { headers });
        const uniqueCoinIds = Array.from(new Set(response.data.map(operation => operation.coin)));

        const pricesResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: uniqueCoinIds.join(','),
            order: 'market_cap_desc',
            per_page: uniqueCoinIds.length,
            page: 1,
            sparkline: false,
          },
        });

        const prices = pricesResponse.data.reduce((acc, curr) => {
          acc[curr.id] = parseFloat(curr.current_price);
          return acc;
        }, {});

        let investedSum = 0;
        let currentBalanceSum = 0;

        response.data.forEach(operation => {
          investedSum += operation.value;
          currentBalanceSum += operation.quantityCrypto * (prices[operation.coin] || 0);
        });

        setTotalInvested(investedSum);
        setTotalCurrentBalance(currentBalanceSum);

        const profitSum = currentBalanceSum - investedSum;
        setTotalProfit(profitSum);
        setTotalProfitPercentage((profitSum / investedSum) * 100);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  }, []);

  return (
    <div>
        <Navbar />
        <InfoBar
          totalInvested={totalInvested}
          totalCurrentBalance={totalCurrentBalance}
          totalProfit={totalProfit}
          totalProfitPercentage={totalProfitPercentage}
        />
    </div>
  );
};

export default HomePage;
