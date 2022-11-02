import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmptyBasket from '../../atoms/EmptyBaseket/EmptyBasket';
import Typography from '../../atoms/Typography/Typography';
import { addProductToCard, deleteProductFromCard } from '../../../actions';
import OverlayProduct from '../OverlayProduct/OverlayProduct';
import styles from './cardoverlay.module.scss';
class CardOverlay extends Component {
   state = { totalCountCurrency: 0 };

   accumuclateTotal = (nextPrice) => {
      this.setState((state) => ({
         totalCountCurrency: state.totalCountCurrency + nextPrice,
      }));
   };

   render() {
      const {
         setModalIsActive,
         cardTotal,
         cardArray,
         addProductToCard,
         deleteProductFromCard,
      } = this.props;
      const { totalCountCurrency } = this.state;

      return (
         <div className={styles.root} onClick={setModalIsActive}>
            <div
               className={styles.root__overlay_wrapper}
               onClick={(e) => e.stopPropagation()}
            >
               {!cardTotal ? (
                  <EmptyBasket />
               ) : (
                  <>
                     <div className={styles.root__header}>
                        <Typography preset="overlaytitle">
                           My Bag,&nbsp;
                        </Typography>
                        <Typography preset="currency">
                           {cardTotal} items
                        </Typography>
                     </div>
                     <ul className={styles.root__products_wrapper}>
                        {cardArray.map((el, index) => (
                           <OverlayProduct
                              productInfo={el}
                              key={index}
                              addProductToCard={addProductToCard}
                              deleteProductFromCard={deleteProductFromCard}
                              accumuclateTotal={this.accumuclateTotal}
                           />
                        ))}
                     </ul>
                     <div className={styles.root__total}>
                        <Typography component="div" preset="currencyoverlay">
                           Total
                        </Typography>
                        <Typography component="div" preset="currencyoverlay">
                           {totalCountCurrency}
                        </Typography>
                     </div>
                  </>
               )}
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      currentCurrency: state.currentCurrency,
      cardTotal: state.cardTotal,
      cardArray: state.cardArray,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      addProductToCard: (
         productId,
         selectedParamArray,
         selectedColorName,
         amount
      ) =>
         dispatch(
            addProductToCard({
               id: productId,
               paramgrid: selectedParamArray,
               color: selectedColorName,
               amount: amount,
            })
         ),
      deleteProductFromCard: (
         productId,
         selectedParamArray,
         selectedColorName
      ) =>
         dispatch(
            deleteProductFromCard({
               id: productId,
               paramgrid: selectedParamArray,
               color: selectedColorName,
            })
         ),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardOverlay);
