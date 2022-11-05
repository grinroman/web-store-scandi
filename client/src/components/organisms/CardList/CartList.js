import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import CartItem from '../../molecules/CartItem/CartItem';
import { connect } from 'react-redux';
import { addProductToCard, deleteProductFromCard } from '../../../actions';
import styles from './cartlist.module.scss';
class CardList extends Component {
   render() {
      const {
         cardTotal,
         cardArray,
         addProductToCard,
         deleteProductFromCard,
         cardTotalInCurrency,
         currentCurrency,
      } = this.props;

      return (
         <div className={styles.root}>
            <Typography
               preset="cardheader"
               className={styles.root__header}
               component="h3"
               align="left"
            >
               Cart
            </Typography>
            <ul className={styles.root__items_wrapepr}>
               {cardArray.map((el) => (
                  <CartItem reduxData={el} key={el.id} />
               ))}
            </ul>
            <div className={styles.root__total}></div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      currentCurrency: state.currentCurrency,
      cardTotal: state.cardTotal,
      cardArray: state.cardArray,
      cardTotalInCurrency: state.cardTotalInCurrency,
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
      deleteProductFromCard: (
         productId,
         selectedParamArray,
         selectedColorName,
         pricesArray
      ) =>
         dispatch(
            deleteProductFromCard({
               id: productId,
               paramgrid: selectedParamArray,
               color: selectedColorName,
               pricesArray,
            })
         ),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
