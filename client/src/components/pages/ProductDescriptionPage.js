// import { url } from 'inspector';
import React from 'react';
import Container from '../templates/Container/Container';
import ProductDescriptionContent from '../organisms/ProductDescriptionContent/ProductDescriptionContent';

class ProductDescriptionPage extends React.Component {
   render() {
      const urlString = window.location.href;
      const urlArr = urlString.split('/');
      const id = urlArr[urlArr.length - 1];
      return (
         <>
            <Container>
               <ProductDescriptionContent productId={id} />
            </Container>
         </>
      );
   }
}

export default ProductDescriptionPage;
