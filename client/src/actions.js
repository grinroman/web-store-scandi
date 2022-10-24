export const currencyChange = (newCurrency) => ({
   type: 'CURRENCY_CHANGE',
   payload: newCurrency, // on the level of react-redux actions can be not pure
});
