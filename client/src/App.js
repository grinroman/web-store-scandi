import React from 'react';
import Header from './components/molecules/Header/Header';
import ErrorPage from './components/pages/ErrorPage';
import CardPage from './components/pages/CardPage';
import ProductListingPage from './components/pages/ProductListingPage';
import ProductDescriptionPage from './components/pages/ProductDescriptionPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardOverlay from './components/molecules/CardOverlay/CardOverlay';

class App extends React.Component {
   state = {
      selectedCategory: 'all',
      modalIsActive: false,
      redirectToCard: false,
   };

   setSelectedCategory = (name) => {
      this.setState({ selectedCategory: name });
   };

   setModalIsActive = () => {
      this.setState((state) => ({
         modalIsActive: !state.modalIsActive,
      }));
   };
   setRedirectToCard = (flag) => {
      this.setState({ redirectToCard: flag });
   };

   componentDidMount() {
      console.log('the whole app mountiong!');
   }

   render() {
      const { selectedCategory, modalIsActive, redirectToCard } = this.state;
      return (
         <Router>
            <Header
               selectedCategory={selectedCategory}
               setSelectedCategory={this.setSelectedCategory}
               setModalIsActive={this.setModalIsActive}
               setRedirectToCard={this.setRedirectToCard}
            />
            {modalIsActive && (
               <CardOverlay
                  setModalIsActive={this.setModalIsActive}
                  setRedirectToCard={this.setRedirectToCard}
               />
            )}
            <Routes>
               <Route
                  path="/"
                  element={
                     <ProductListingPage
                        selectedCategory={selectedCategory}
                        redirectToCard={redirectToCard}
                     />
                  }
               />
               <Route path="/card" element={<CardPage />} />
               <Route
                  path="/product/:id"
                  element={
                     <ProductDescriptionPage redirectToCard={redirectToCard} />
                  }
               />
               <Route path="*" element={<ErrorPage />} />
            </Routes>
         </Router>
      );
   }
}

export default App;
