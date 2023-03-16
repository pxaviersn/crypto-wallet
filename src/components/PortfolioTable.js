import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import IsLogged from './isLogged';
import './PortfolioTable.css';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import InfoBar from './InfoBar';



const ManageItemsPage = () => {
  const [operations, setOperations] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);
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
  axios.get(`${process.env.REACT_APP_API_URL}/operations/user`, { headers })
  .then(response => {
    setOperations(response.data);
    let investedSum = 0;
    let currentBalanceSum = 0;

    response.data.forEach(operation => {
      investedSum += operation.value;
      currentBalanceSum += operation.quantityCrypto * (currentPrices[operation.coin] || 0);
    });

    setTotalInvested(investedSum);
    setTotalCurrentBalance(currentBalanceSum);

    const profitSum = currentBalanceSum - investedSum;
    setTotalProfit(profitSum);
    setTotalProfitPercentage((profitSum / investedSum) * 100);
  })
  .catch(err => console.log(err));
}, [refresh, currentPrices]);

  

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const uniqueCoinIds = Array.from(new Set(operations.map(operation => operation.coin)));
        
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: uniqueCoinIds.join(','),
            order: 'market_cap_desc',
            per_page: uniqueCoinIds.length,
            page: 1,
            sparkline: false,
          },
        });
        
        const prices = response.data.reduce((acc, curr) => {
          acc[curr.id] = parseFloat(curr.current_price);
          return acc;
        }, {});
  
        setCurrentPrices(prices);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };
  
    if (operations.length > 0) {
      const currentTime = new Date();
      if (!lastFetched || (currentTime - lastFetched) > 5 * 60 * 1000) {
        fetchPrices();
        setLastFetched(currentTime);
      }
    }
  }, [operations, lastFetched]);
  
  const deleteOperation = operationId => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Error: no token found');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    axios.delete(`${process.env.REACT_APP_API_URL}/operations/user/${operationId}`, { headers })
      .then(response => {
        setRefresh(!refresh);
      })
      .catch(err => console.log(err));
  };

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  };

  const formatQuantityCrypto = (value) => {
    return parseFloat(value).toFixed(7);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const calculateProfit = (value, currentBalance) => {
    return currentBalance - value;
  };

  const calculateProfitPercentage = (value, profit) => {
    return (profit / value) * 100;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  
  const getProfitClass = (value) => {
    return value >= 0 ? 'profit-positive' : 'profit-negative';
  };

  return (
    <IsLogged>
      <div className="premium">
      <InfoBar
  totalInvested={totalInvested}
  totalCurrentBalance={totalCurrentBalance}
  totalProfit={totalProfit}
  totalProfitPercentage={totalProfitPercentage}
/>

      <table className="table table-hover" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Coin Price</th>
            <th>Balance</th>
            <th>Exchange Fee</th>
            <th>Quantity Crypto</th>
            <th>Date</th>
            <th>Current Balance</th>
            <th>($)Profit</th>
            <th>(%)Profit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation) => {
            const currentBalance = operation.quantityCrypto * (currentPrices[operation.coin] || 0);
            const profit = calculateProfit(operation.value, currentBalance);
            const profitPercentage = calculateProfitPercentage(operation.value, profit);
            return (
              <tr key={operation._id}>
                <td>{capitalizeFirstLetter(operation.coin)}</td>
                <td>{formatCurrency(operation.coinPrice)}</td>
                <td>{formatCurrency(operation.value)}</td>
                <td>{formatCurrency(operation.exchangeFee)}</td>
                <td>{formatQuantityCrypto(operation.quantityCrypto)}</td>
                <td>{formatDate(operation.date)}</td>
                <td>{formatCurrency(currentBalance)}</td>
                <td className={getProfitClass(profit)}>{formatCurrency(profit)}</td>
                <td className={getProfitClass(profitPercentage)}>{profitPercentage.toFixed(2)}%</td>
                <td>
                  <Link to={`/operations/user/${operation._id}`}>
                    <MdEdit size={20} />
                  </Link>
                  <button style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: 0, outline: 'none',}}  onClick={() => deleteOperation(operation._id)}>
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </IsLogged>  
);

};

export default ManageItemsPage;
