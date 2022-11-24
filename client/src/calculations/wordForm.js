export const wordForm = (incomingWord, currentNumber) => {
   return currentNumber === 1 ? incomingWord : `${incomingWord}s`;
};
