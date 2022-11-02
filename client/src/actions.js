export const currencyChange = (newCurrency) => ({
   type: 'CURRENCY_CHANGE',
   payload: newCurrency, // on the level of react-redux actions can be not pure
});

export const callRedirectToPLP = (redirect) => ({
   type: 'REDIRECT_TO_PLP',
   payload: redirect,
});

export const addProductToCard = (productInfo) => {
   return { type: 'ADD_PRODUCT_TO_CARD', payload: productInfo };
};


export const deleteProductFromCard = (productInfo) => {
   return { type: 'DELETE_PRODUCT_FROM_CARD', payload: productInfo };
};
