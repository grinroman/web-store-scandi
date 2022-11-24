import React from 'react';
import Header from './components/molecules/Header/Header';
import ErrorPage from './components/pages/ErrorPage';
import CartPage from './components/pages/CartPage';
import ProductListingPage from './components/pages/ProductListingPage';
import ProductDescriptionPage from './components/pages/ProductDescriptionPage';
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from 'react-router-dom';
import CardOverlay from './components/molecules/CardOverlay/CardOverlay';

class App extends React.Component {
   state = {
      selectedCategory: 'all',
      modalIsActive: false,
      redirectToCard: false,
   };

   setSelectedCategory = (name) => {
      this.setState({ selectedCategory: name });
   }; //FIXME: загнать в redux

   setModalIsActive = () => {
      this.setState((state) => ({
         modalIsActive: !state.modalIsActive,
      }));
   };

   render() {
      const { selectedCategory, modalIsActive, redirectToCard } = this.state;
      return (
         <Router>
            <Header
               selectedCategory={selectedCategory}
               setSelectedCategory={this.setSelectedCategory}
               setModalIsActive={this.setModalIsActive}
            />
            {modalIsActive && (
               <CardOverlay
                  setModalIsActive={this.setModalIsActive}
                  setRedirectToCard={this.setRedirectToCard}
               />
            )}
            <Routes>
               <Route path="*" element={<Navigate to="/all" replace />} />
               <Route
                  path="/all"
                  element={
                     <ProductListingPage
                        selectedCategory={selectedCategory}
                        redirectToCard={redirectToCard}
                     />
                  }
               />
               <Route
                  path="/tech"
                  element={
                     <ProductListingPage
                        selectedCategory={selectedCategory}
                        redirectToCard={redirectToCard}
                     />
                  }
               />
               <Route
                  path="/clothes"
                  element={
                     <ProductListingPage
                        selectedCategory={selectedCategory}
                        redirectToCard={redirectToCard}
                     />
                  }
               />
               <Route path="/cart" element={<CartPage />} />
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
