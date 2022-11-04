// import { url } from 'inspector';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Container from '../templates/Container/Container';
import ProductDescriptionContent from '../organisms/ProductDescriptionContent/ProductDescriptionContent';

class ProductDescriptionPage extends React.Component {
   componentDidMount() {
      // console.log('mounted pdp!');
   }
   render() {
      const { redirectToPLP, redirectToCard } = this.props;
      const urlString = window.location.href; //TODO: добавить истоорию поиска чтоби вернукться на предыдущую страницу
      const urlArr = urlString.split('/');
      const id = urlArr[urlArr.length - 1];
      return (
         <>
            {redirectToPLP && <Navigate to="/" replace={false} />}
            {redirectToCard && <Navigate to="/card" replace={false} />}
            <Container>
               <ProductDescriptionContent productId={id} />
            </Container>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      redirectToPLP: state.redirectToPLP,
   };
};

export default connect(mapStateToProps)(ProductDescriptionPage);
