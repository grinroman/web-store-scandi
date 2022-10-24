import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';
import { connect } from 'react-redux';
import styles from './cardproduct.module.scss';
import CartIcon from '../../atoms/CartIcon/CartIcon';
import AddCardIcon from '../../atoms/AddCardIcon/AddCardIcon';

const mapStateToProps = (state) => {
   return { currentCurrency: state.currentCurrency };
};

class CardProduct extends Component {
   constructor(props) {
      super(props);
      this.state = { idOfHoveredCard: null };
   }

   cardClick = (e, productId) => {
      if (
         e.target.tagName.toLowerCase() === 'div' ||
         e.target.tagName.toLowerCase() === 'svg'
      ) {
         console.log('basket', productId);
      } else {
         console.log('card', productId);
      }
   };

   render() {
      const { product, currentCurrency } = this.props;

      const amount = product.prices.filter(
         (el) => el.currency.symbol === currentCurrency
      )[0].amount;

      return (
         <li className={styles.root}>
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
                  {product.name}
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

export default connect(mapStateToProps)(CardProduct);
