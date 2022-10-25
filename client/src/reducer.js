const initialState = { currentCurrency: '$', redurectToPLP: true };

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'CURRENCY_CHANGE':
         return { ...state, currentCurrency: action.payload };
      case 'REDIRECT_TO_PLP':
         return { ...state, redurectToPLP: action.payload };
      default:
         return state;
   }
};

export default reducer;
