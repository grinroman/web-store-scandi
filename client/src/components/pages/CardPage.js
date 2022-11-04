import React from 'react';
import Container from '../templates/Container/Container';
import { Navigate } from 'react-router-dom';
import { callRedirectToCard } from '../../actions';
import { connect } from 'react-redux';
class CardPage extends React.PureComponent {
   componentDidMount() {
      console.log('card page mounted!');
   }

   render() {
      return (
         <Container>
            <div>kek!</div>
         </Container>
      );
   }
}


export default CardPage;
