import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductToCard } from '../../../actions';
import EmptyBasket from '../../atoms/EmptyBaseket/EmptyBasket';
import Typography from '../../atoms/Typography/Typography';
import OverlayProduct from '../OverlayProduct/OverlayProduct';
import styles from './cardoverlay.module.scss';
class CardOverlay extends Component {
   render() {
      const { setModalIsActive, currentCurrency, cardTotal, cardArray } =
         this.props;

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
                     <ul>
                        {cardArray.map((el, index) => (
                           <OverlayProduct productInfo={el} key={index} />
                        ))}
                     </ul>
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

export default connect(mapStateToProps)(CardOverlay);
