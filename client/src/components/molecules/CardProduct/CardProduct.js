import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import { connect } from 'react-redux';
import styles from './cardproduct.module.scss';
import AddCardIcon from '../../atoms/AddCardIcon/AddCardIcon';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { addProductToCard } from '../../../actions';

class CardProduct extends Component {
   state = { redirectToProductPage: false };

   cardClick = (e) => {
      if (
         e.target.tagName.toLowerCase() === 'div' ||
         e.target.tagName.toLowerCase() === 'svg'
      ) {
         e.preventDefault();
         const { product } = this.props;
         // console.log(product.attributes);
         let defaultSelectedParamArray = product.attributes.reduce(
            (acc, el) => {
               if (el.id !== 'Color') {
                  acc.push(el.items[0].value);
               }
               return acc;
            },
            []
         );

         let defaultSelectedColor;
         if (product.attributes.findIndex((el) => el.id === 'Color') !== -1) {
            defaultSelectedColor = product.attributes.filter(
               (el) => el.id === 'Color'
            )[0].items[0].id;
         }

         this.props.addProductToCard(
            product.id,
            defaultSelectedParamArray,
            defaultSelectedColor,
            1,
            product.prices
         );
         this.props.enqueueSnackbar(
            'Product was successfully added to the card with default parameters!',
            {
               variant: 'success',
               vertical: 'top',
            }
         );
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

const mapDispatchToProps = (dispatch) => {
   return {
      addProductToCard: (
         productId,
         selectedParamArray,
         selectedColorName,
         amount,
         pricesArray
      ) =>
         dispatch(
            addProductToCard({
               id: productId,
               paramgrid: selectedParamArray,
               color: selectedColorName,
               amount: amount,
               pricesArray,
            })
         ),
   };
};

export default withSnackbar(
   connect(mapStateToProps, mapDispatchToProps)(CardProduct)
);
