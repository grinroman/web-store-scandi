import React from 'react';
import BigSpinner from '../atoms/BigSpinner/BigSpinner';
import ProductList from '../organisms/ProductList/ProductList';
import Container from '../templates/Container/Container';
import { graphql } from '@apollo/client/react/hoc';
import { getListProducts, getSingleProduct } from '../../graphql/queries.js';

class ProductListingPage extends React.Component {
   render() {
      const { data, selectedCategory } = this.props;
      const { loading, category } = data;
      return (
         <>
            <Container>
               {loading ? (
                  <BigSpinner />
               ) : (
                  <ProductList
                     selectedCategory={selectedCategory}
                     productsArray={category.products}
                  />
               )}
            </Container>
         </>
      );
   }
}

export default graphql(getListProducts)(ProductListingPage);
