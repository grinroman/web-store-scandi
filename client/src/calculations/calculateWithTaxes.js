const _coficient = 0.21;

export const calculateWithTaxes = (totalPrice) => totalPrice * _coficient;

export const calculateTotal = (arrayOfCard) => {
   arrayOfCard.reducer((acc, item) => acc + item, 0);
};
