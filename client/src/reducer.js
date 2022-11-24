import Cookies from 'js-cookie';

const initialState = {
   currentCurrency: Cookies.get('currentCurrency')
      ? JSON.parse(Cookies.get('currentCurrency'))
      : '$',
   cardTotal: Cookies.get('cardTotal')
      ? JSON.parse(Cookies.get('cardTotal'))
      : 0,
   cardArray: Cookies.get('cardArray')
      ? JSON.parse(Cookies.get('cardArray'))
      : [],
   cardTotalInCurrency: Cookies.get('cardTotalInCurrency')
      ? JSON.parse(Cookies.get('cardTotalInCurrency'))
      : 0,
   currentCategory: Cookies.get('currentCategory')
      ? JSON.parse(Cookies.get('currentCategory'))
      : 'all',
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'CHANGE_PRODUCT_CATEGORY': {
         return { ...state, currentCategory: action.payload };
      }
      case 'CURRENCY_CHANGE': {
         const currentCurrency = action.payload;
         const newCardTotalInCurrency = state.cardArray.reduce((sum, el) => {
            const currentPrice = el.pricesArray.filter(
               ({ currency }) => currency.symbol === currentCurrency
            )[0].amount;
            sum += currentPrice * el.amount;
            return sum;
         }, 0);
         Cookies.set('currentCurrency', JSON.stringify(currentCurrency));
         Cookies.set(
            'cardTotalInCurrency',
            JSON.stringify(newCardTotalInCurrency)
         );
         return {
            ...state,
            currentCurrency: action.payload,
            cardTotalInCurrency: newCardTotalInCurrency,
         };
      }
      case 'ADD_PRODUCT_TO_CARD': {
         const productIsNew = state.cardArray.some(
            (el) => el.id === action.payload.id
         );
         let newCardArray;
         if (!productIsNew) {
            newCardArray = state.cardArray;
            newCardArray.push(action.payload);
         } else {
            const indexOfSameProduct = state.cardArray.findIndex(
               (el) =>
                  el.paramgrid.join('') === action.payload.paramgrid.join('') &&
                  el.color === action.payload.color
            );
            if (indexOfSameProduct === -1) {
               newCardArray = state.cardArray;
               newCardArray.push(action.payload);
            } else {
               newCardArray = state.cardArray;
               newCardArray[indexOfSameProduct].amount =
                  newCardArray[indexOfSameProduct].amount + 1;
            }
         }
         const newCardTotal = state.cardTotal + 1;

         const newCardTotalInCurrency =
            state.cardTotalInCurrency +
            action.payload.pricesArray.filter(
               (el) => el.currency.symbol === state.currentCurrency
            )[0].amount;
         Cookies.set('cardArray', JSON.stringify(newCardArray));
         Cookies.set('cardTotal', JSON.stringify(newCardTotal));
         Cookies.set(
            'cardTotalInCurrency',
            JSON.stringify(newCardTotalInCurrency)
         );
         return {
            ...state,
            cardArray: newCardArray,
            cardTotal: newCardTotal,
            cardTotalInCurrency: newCardTotalInCurrency,
         };
      }
      case 'DELETE_PRODUCT_FROM_CARD': {
         const newCardArray = state.cardArray;
         const indexOfUpdatingProd = newCardArray.findIndex(
            (el) =>
               el.paramgrid.join('') === action.payload.paramgrid.join('') &&
               el.color === action.payload.color &&
               el.id === action.payload.id
         );

         const newCardTotalInCurrency =
            state.cardTotalInCurrency -
            action.payload.pricesArray.filter(
               (el) => el.currency.symbol === state.currentCurrency
            )[0].amount;
         Cookies.set(
            'cardTotalInCurrency',
            JSON.stringify(newCardTotalInCurrency)
         );

         if (newCardArray[indexOfUpdatingProd].amount === 1) {
            newCardArray.splice(indexOfUpdatingProd, 1);
         } else {
            newCardArray[indexOfUpdatingProd].amount -= 1;
         }
         let newCardTotal = state.cardTotal - 1;
         Cookies.set('cardArray', JSON.stringify(newCardArray));
         Cookies.set('cardTotal', JSON.stringify(newCardTotal));

         return {
            ...state,
            cardArray: newCardArray,
            cardTotal: newCardTotal,
            cardTotalInCurrency: newCardTotalInCurrency,
         };
      }
      default:
         return state;
   }
};

export default reducer;
