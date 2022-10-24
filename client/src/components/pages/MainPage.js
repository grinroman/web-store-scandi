import React from 'react';
import BigSpinner from '../atoms/BigSpinner/BigSpinner';
import Header from '../molecules/Header/Header';
import ProductList from '../organisms/ProductList/ProductList';
import Container from '../templates/Container/Container';
import { graphql } from '@apollo/client/react/hoc';
import { getListProducts } from '../../graphql/queries.js';

class MainPage extends React.Component {
   state = { selectedCategory: 'all' };

   setSelectedCategory = (name) => {
      this.setState({ selectedCategory: name });
   };

   render() {
      const { selectedCategory } = this.state;
      const { data } = this.props;
      const { loading, category } = data;
      return (
         <>
            <Header
               selectedCategory={selectedCategory}
               setSelectedCategory={this.setSelectedCategory}
            />
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
         //стейты ощие для хэдера и других компонентов

         //header
         //свичём в зависимости от стейта перебраные условия и подгрузка нужной страницы
         //с нужными данными
      );
   }
}

export default graphql(getListProducts)(MainPage);
