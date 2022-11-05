import React from 'react';
import Container from '../templates/Container/Container';

import CartList from '../organisms/CardList/CartList';
class CartPage extends React.PureComponent {
   render() {
      return (
         <Container>
            <CartList />
         </Container>
      );
   }
}

export default CartPage;
