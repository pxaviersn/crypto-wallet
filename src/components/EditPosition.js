import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './EditPosition.css';

const EditItemPage = () => {
  const [coin, setCoin] = useState('');
  const [coinPrice, setCoinPrice] = useState('');
  const [value, setValue] = useState('');
  const [exchangeFee, setExchangeFee] = useState('');
  const [quantityCrypto, setQuantityCrypto] = useState('');
  const [date, setDate] = useState('');
  const [cryptoData, setCryptoData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  const token = localStorage.getItem('token');

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);



  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: false,
          },
        });
  
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
  
    fetchCryptoData();
  }, []);
  


  useEffect(() => {
    if (!token) return;

    axios
      .get(`${process.env.REACT_APP_API_URL}/operations/user/${id}`, { headers })
      .then((response) => {
        const {
          coin,
          coinPrice,
          value,
          exchangeFee,
          quantityCrypto,
          date,
        } = response.data;
        setCoin(coin);
        setCoinPrice(coinPrice);
        setValue(value);
        setExchangeFee(exchangeFee);
        setQuantityCrypto(quantityCrypto);
        setDate(date);
      });
  }, [id, token, headers]);

  useEffect(() => {
    if (!token) return;

    if (coinPrice && value && exchangeFee) {
      const suggestedQuantityCrypto = (value - exchangeFee) / coinPrice;
      setQuantityCrypto(suggestedQuantityCrypto);
    }
  }, [coinPrice, value, exchangeFee, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedOperation = {
      coin,
      coinPrice,
      value,
      exchangeFee,
      quantityCrypto,
      date,
    };
  
    axios
      .put(`${process.env.REACT_APP_API_URL}/operations/user/${id}`, updatedOperation, { headers })
      .then((response) => {
          navigate('/');
      })
      .catch((err) => console.log(err));
  };
  

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <form className="form-container" onSubmit={handleSubmit} style={{ width: "40%" }}>
          <div className="form-group">
            <div className="class-name">
              Coin:
            </div>
            <select value={coin} className="form-control" onChange={e => setCoin(e.target.value)}>
              <option value="">Select a coin</option>
              {cryptoData.map(({ id, symbol, name }) => (
                <option key={id} value={id}>
                  {`(${symbol.toUpperCase()}) - ${name}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
              <div className="class-name">
                Coin Price:
              </div>
              <input type="number" value={coinPrice} required onChange={e => setCoinPrice(e.target.value)} className="form-control" />
            </div>
    
            <div className="form-group">
              <div className="class-name">
                Value:
              </div>
              <input type="number" value={value} required onChange={e => setValue(e.target.value)} className="form-control" />
            </div>
    
            <div className="form-group">
              <div className="class-name">
                Exchange Fee:
              </div>
              <input type="number" value={exchangeFee} required onChange={e => setExchangeFee(e.target.value)} className="form-control" />
            </div>
    
            <div className="form-group">
              <div className="class-name">
                Quantity Crypto:
              </div>
              <input type="number" value={quantityCrypto} required onChange={e => setQuantityCrypto(e.target.value)} className="form-control" />
            </div>
    
            <div className="form-group">
              <div className="class-name">
                Date:
              </div>
              <input type="date" value={date} required onChange={e => setDate(e.target.value)} className="form-control" />
            </div>
    
            <div className="form-group">
              <Button variant="primary" className='confirmBtn' type="submit" style={{ marginTop: "5%", width: "100%", display: "block" }}>
                Save
              </Button>
            </div>
          </form>
        </div>
    );
};

export default EditItemPage;