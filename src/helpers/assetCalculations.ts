export const calculatePnL = (currentPrice: number, quantity: number, averagePrice: number) => {
  const invested = averagePrice * quantity;
  const currentValue = currentPrice * quantity;
  const profitLoss = currentValue - invested;
  const profitLossPercent = invested ? (profitLoss / invested) * 100 : 0;

  return {
    profitLoss,       // cantidad ganada o perdida
    profitLossPercent // porcentaje
  };
};