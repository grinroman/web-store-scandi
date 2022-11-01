import React from 'react';
import Header from './components/molecules/Header/Header';
import ErrorPage from './components/pages/ErrorPage';
import CardPage from './components/pages/CardPage';
import ProductListingPage from './components/pages/ProductListingPage';
import ProductDescriptionPage from './components/pages/ProductDescriptionPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardOverlay from './components/molecules/CardOverlay/CardOverlay';

class App extends React.Component {
   state = { selectedCategory: 'all', modalIsActive: false };

   setSelectedCategory = (name) => {
      this.setState({ selectedCategory: name });
   };

   setModalIsActive = () => {
      this.setState((state) => ({
         modalIsActive: !state.modalIsActive, //TODO: закрывать список при нажатии вне его
      }));
   };

   render() {
      const { selectedCategory, modalIsActive } = this.state;
      return (
         <Router>
            <Header
               selectedCategory={selectedCategory}
               setSelectedCategory={this.setSelectedCategory}
               setModalIsActive={this.setModalIsActive}
            />
            {modalIsActive && (
               <CardOverlay setModalIsActive={this.setModalIsActive} />
            )}
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
