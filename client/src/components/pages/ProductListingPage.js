import React from 'react';
import BigSpinner from '../atoms/BigSpinner/BigSpinner';
import ProductList from '../organisms/ProductList/ProductList';
import Container from '../templates/Container/Container';
import { graphql } from '@apollo/client/react/hoc';
import { getSingleCategory } from '../../graphql/queries.js';

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
//getSingleCategory
export default graphql(getSingleCategory, {
   options: () => {
      const urlString = window.location.href;
      const urlArr = urlString.split('/');
      const categoryName = urlArr[urlArr.length - 1];
      return { variables: { category: { title: categoryName } } };
   },
})(ProductListingPage);
