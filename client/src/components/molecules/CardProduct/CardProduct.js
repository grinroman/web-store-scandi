import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import { connect } from 'react-redux';
import styles from './cardproduct.module.scss';
import AddCardIcon from '../../atoms/AddCardIcon/AddCardIcon';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { callRedirectToPLP } from '../../../actions';

class CardProduct extends Component {
   state = { redirectToProductPage: false };

   cardClick = (e) => {
      if (
         e.target.tagName.toLowerCase() === 'div' ||
         e.target.tagName.toLowerCase() === 'svg'
      ) {
         e.preventDefault();
         //TODO: add to card default settings product!
      }
   };

   render() {
      const { product, currentCurrency } = this.props;
      const { redirectToProductPage } = this.state;

      const amount = product.prices.filter(
         (el) => el.currency.symbol === currentCurrency
      )[0].amount;

      return (
         <Link to={`/product/${product.id}`}>
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
         </Link>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      currentCurrency: state.currentCurrency,
      redurectToPLP: state.redurectToPLP,
   };
};

export default connect(mapStateToProps)(CardProduct);
