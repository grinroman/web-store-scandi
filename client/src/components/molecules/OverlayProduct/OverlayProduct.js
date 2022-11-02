import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import Typography from '../../atoms/Typography/Typography';
import { getSingleProduct } from '../../../graphql/queries';
import { connect } from 'react-redux';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';
import styles from './overlayproduct.module.scss';
import PricePlugOverlay from '../PricePlugOverlay/PricePlugOverlay';
import OverlayParamGrid from '../OverlayParamGrid/OverlayParamGrid';
import OverlayColorGrid from '../OverlayColorGrid/OverlayColorGrid';

class OverlayProduct extends Component {
   state = { amount: 1 };

   incrementAmount = () => {
      this.setState((state) => ({
         amount: state.amount + 1,
      }));
      const { data, productInfo } = this.props;
      this.props.addProductToCard(
         data.product.id,
         productInfo.paramgrid,
         productInfo.color,
         this.state.amount
      );
   };
   decrementAmount = () => {
      const { data, productInfo } = this.props;

      if (this.state.amount === 1) {
         this.props.deleteProductFromCard(
            data.product.id,
            productInfo.paramgrid,
            productInfo.color
         );
      } else {
         this.setState((state) => ({
            amount: state.amount - 1,
         }));

         this.props.deleteProductFromCard(
            data.product.id,
            productInfo.paramgrid,
            productInfo.color
         );
      }
   };

   render() {
      const { productInfo, data, accumuclateTotal } = this.props;
      const { loading, product } = data;

      //TODO: заменить на svg

      return (
         <>
            {loading ? (
               <SmallSpinner />
            ) : (
               <li className={styles.root}>
                  <ul className={styles.root__content}>
                     <Typography preset="overlayproduct" component="li">
                        {product.brand}
                     </Typography>
                     <Typography preset="overlayproduct" component="li">
                        {product.name}
                     </Typography>
                     <PricePlugOverlay
                        prices={product.prices}
                        accumuclateTotal={accumuclateTotal}
                     />
                     {product.attributes.map((currentAttribute, index) => {
                        if (currentAttribute.id !== 'Color') {
                           return (
                              <OverlayParamGrid
                                 paramgrid={currentAttribute}
                                 key={currentAttribute.id}
                                 selectedAttribute={
                                    productInfo.paramgrid[index]
                                 }
                              />
                           );
                        }
                        return (
                           <OverlayColorGrid
                              colorgrid={currentAttribute}
                              key={currentAttribute.id}
                              selectedAttribute={productInfo.color}
                           />
                        );
                     })}
                  </ul>
                  <div className={styles.root__amount_wrapper}>
                     <button
                        className={styles.root__calculator}
                        onClick={this.incrementAmount}
                     >
                        +
                     </button>
                     <Typography preset="calculator" component="div">
                        {productInfo.amount}
                     </Typography>
                     <button
                        className={styles.root__calculator}
                        onClick={this.decrementAmount}
                     >
                        -
                     </button>
                  </div>
                  <img
                     className={styles.root__image}
                     src={product.gallery[0]}
                     alt={product.name}
                  />
               </li>
            )}
         </>
      );
   }
}

export default graphql(getSingleProduct, {
   options: (props) => ({ variables: { id: props.productInfo.id } }),
   // refetchQueries: [{ query: getSingleProduct }], //TODO: обновлять кэш!!!
})(OverlayProduct);
