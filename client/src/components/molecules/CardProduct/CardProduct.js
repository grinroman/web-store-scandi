import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';
import { connect } from 'react-redux';
import styles from './cardproduct.module.scss';
import AddCardIcon from '../../atoms/AddCardIcon/AddCardIcon';
import { Navigate } from 'react-router-dom';
import { callRedirectToPLP } from '../../../actions';

const mapStateToProps = (state) => {
   return {
      currentCurrency: state.currentCurrency,
      redurectToPLP: state.redurectToPLP,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      callRedirectToPLP: (redirect) => dispatch(callRedirectToPLP(redirect)),
   };
};

class CardProduct extends Component {
   state = { redirectToProductPage: false };

   cardClick = (e, productId) => {
      if (
         e.target.tagName.toLowerCase() === 'div' ||
         e.target.tagName.toLowerCase() === 'svg'
      ) {
         // console.log('add to card!', productId); //TODO: add to card product logic
      } else {
         this.props.callRedirectToPLP(false);
         this.setState({ redirectToProductPage: true });
      }
   };

   render() {
      const { product, currentCurrency } = this.props;
      const { redirectToProductPage } = this.state;

      const amount = product.prices.filter(
         (el) => el.currency.symbol === currentCurrency
      )[0].amount;

      return (
         <li className={styles.root}>
            {redirectToProductPage && (
               <Navigate to={`/product/${product.id}`} replace={false} />
            )}
            <button
               disabled={!product.inStock}
               className={styles.root__button}
               onClick={(e) => this.cardClick(e, product.id)}
            >
               <img
                  src={product.gallery[0]}
                  alt={product.name}
                  className={styles.root__image}
               />
               {product.inStock ? (
                  <div className={styles.root__middle}>
                     <div className={styles.root__middle__basket}>
                        <AddCardIcon />
                     </div>
                  </div>
               ) : (
                  <Typography
                     preset="outofstock"
                     color="grei"
                     className={styles.root__outofstock}
                  >
                     out of stock
                  </Typography>
               )}

               <Typography preset="cardtitle" align="left">
                  {`${product.brand} ${product.name}`}
               </Typography>
               <Typography preset="currency" align="left">
                  {currentCurrency}
                  {amount}
               </Typography>
            </button>
         </li>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);
