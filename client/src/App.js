import React from 'react';
import Header from './components/molecules/Header/Header';
import ErrorPage from './components/pages/ErrorPage';
import CardPage from './components/pages/CardPage';
import ProductListingPage from './components/pages/ProductListingPage';
import ProductDescriptionPage from './components/pages/ProductDescriptionPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends React.Component {
   state = { selectedCategory: 'all' };

   setSelectedCategory = (name) => {
      this.setState({ selectedCategory: name });
   };

   render() {
      const { selectedCategory } = this.state;

      return (
         <Router>
            <Header
               selectedCategory={selectedCategory}
               setSelectedCategory={this.setSelectedCategory}
            />
            <Routes>
               <Route
                  path="/"
                  element={
                     <ProductListingPage selectedCategory={selectedCategory} />
                  }
               />
               <Route path="/card" element={<CardPage />} />
               <Route
                  path="/product/:id"
                  element={<ProductDescriptionPage />}
               />
               <Route path="*" element={<ErrorPage />} />
            </Routes>
         </Router>
      );
   }
}

export default App;
