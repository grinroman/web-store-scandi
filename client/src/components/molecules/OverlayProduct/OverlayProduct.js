import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import Typography from '../../atoms/Typography/Typography';
import { getSingleProduct } from '../../../graphql/queries';
import { connect } from 'react-redux';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';
import styles from './overlayproduct.module.scss';
import PricePlug from '../PricePlug/PricePlug';
import OverlayParamGrid from '../OverlayParamGrid/OverlayParamGrid';

class OverlayProduct extends Component {
   state = { amount: 1 };

   render() {
      const { productInfo, data, currentCurrency } = this.props;
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
                     <PricePlug prices={product.prices} small={true} />
                     {product.attributes.map((currentAttribute) => {
                        if (currentAttribute.id !== 'Color') {
                           return (
                              <OverlayParamGrid
                                 paramgrid={currentAttribute}
                                 key={currentAttribute.id}
                              />
                           );
                        }

                        return <p>heh</p>;
                     })}
                  </ul>
                  <div className={styles.root__amount_wrapper}>
                     <Typography
                        preset="calculator"
                        className={styles.root__calculator}
                        component="button"
                     >
                        +
                     </Typography>
                     <Typography preset="calculator" component="div">
                        {productInfo.amount}
                     </Typography>
                     <Typography
                        preset="calculator"
                        className={styles.root__calculator}
                        component="button"
                     >
                        -
                     </Typography>
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

// const mapStateToProps = (state) => {
//    return {
//       currentCurrency: state.currentCurrency,
//    };
// };

export default graphql(getSingleProduct, {
   options: (props) => ({ variables: { id: props.productInfo.id } }),
   // refetchQueries: [{ query: getSingleProduct }], //TODO: обновлять кэш!!!
})(OverlayProduct);
