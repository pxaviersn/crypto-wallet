import './InfoBar.css';

const InfoBar = ({
  totalInvested,
  totalCurrentBalance,
  totalProfit,
  totalProfitPercentage,
}) => {
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  };

  const getProfitClass = (value) => {
    return value >= 0 ? 'profit-positive' : 'profit-negative';
  };

  return (
    <div className="info-bar">
      <div className="info-item">
        <span className="info-label">Total Invested:</span>
        <span className="info-value">{formatCurrency(totalInvested)}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Current Balance:</span>
        <span className="info-value">{formatCurrency(totalCurrentBalance)}</span>
      </div>
      <div className="info-item">
        <span className="info-label">(%) Profit:</span>
        <span className={`info-value ${getProfitClass(totalProfitPercentage)}`}>
          {totalProfitPercentage.toFixed(2)}%
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">($) Profit:</span>
        <span className={`info-value ${getProfitClass(totalProfit)}`}>
          {formatCurrency(totalProfit)}
        </span>
      </div>
    </div>
  );
};

export default InfoBar;
