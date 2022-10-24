const initialState = { currentCurrency: '$' };

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'CURRENCY_CHANGE':
         return { ...state, currentCurrency: action.payload };
      default:
         return state;
   }
};

export default reducer;
