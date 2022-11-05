import React, { Component } from 'react';
import Container from '../templates/Container/Container';
import ErrorPageComponent from '../organisms/ErrorPageComponent/ErrorPageComponent';
export default class ErrorPage extends Component {
   render() {
      return (
         <Container>
            <ErrorPageComponent />
         </Container>
      );
   }
}
