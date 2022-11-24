import { Component } from 'react';
import { connect } from 'react-redux';
import EmptyBasket from '../../atoms/EmptyBaseket/EmptyBasket';
import Typography from '../../atoms/Typography/Typography';
import { addProductToCard, deleteProductFromCard } from '../../../actions';
import { Link } from 'react-router-dom';
import OverlayProduct from '../OverlayProduct/OverlayProduct';
import styles from './cardoverlay.module.scss';
import { wordForm } from '../../../calculations/wordForm';
import OverlayButton from '../../atoms/OverlayButton/OverlayButton';
class CardOverlay extends Component {
   state = { redirectToCard: false };

   redirectToCard = () => {
      this.props.setModalIsActive();
   };
   checkout = () => {
      console.log('logic of purchasing!');
   };

   render() {
      const {
         setModalIsActive,
         cardTotal,
         cardArray,
         addProductToCard,
         deleteProductFromCard,
         cardTotalInCurrency,
         currentCurrency,
      } = this.props;

      return (
         <>
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
                              {cardTotal} {wordForm('item', cardTotal)}
                           </Typography>
                        </div>
                        <ul className={styles.root__products_wrapper}>
                           {cardArray.map((el, index) => (
                              <OverlayProduct
                                 productInfo={el}
                                 key={index}
                                 addProductToCard={addProductToCard}
                                 deleteProductFromCard={deleteProductFromCard}
                              />
                           ))}
                        </ul>
                        <div className={styles.root__total}>
                           <Typography component="div" preset="currencyoverlay">
                              Total
                           </Typography>
                           <Typography component="div" preset="currencyoverlay">
                              {currentCurrency}
                              {cardTotalInCurrency.toFixed(2)}
                           </Typography>
                        </div>
                        <div className={styles.root__buttons}>
                           <Link to="/cart">
                              <OverlayButton
                                 colorPreset={'paragraph'}
                                 text={'view bag'}
                                 action={this.redirectToCard}
                              />
                           </Link>
                           <OverlayButton
                              colorPreset={'textdarkmode'}
                              text={'checkout'}
                              action={this.checkout}
                           />
                        </div>
                     </>
                  )}
               </div>
            </div>
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardOverlay);
