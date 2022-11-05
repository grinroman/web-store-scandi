import React, { Component } from 'react';
import MinusIcon from '../../atoms/MinusIcon/MinusIcon';
import PlusIcon from '../../atoms/PlusIcon/PlusIcon';
import SliderArrow from '../../atoms/SliderArrow/SliderArrow';
import { getSingleProduct } from '../../../graphql/queries';
import Typography from '../../atoms/Typography/Typography';
import { graphql } from '@apollo/client/react/hoc';

import styles from './cartitem.module.scss';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';
import ProductTitle from '../ProductTitle/ProductTitle';
import PricePlug from '../PricePlug/PricePlug';
import ParamGrid from '../ParamGrid/ParamGrid';
import ColorGrid from '../ColorGrid/ColorGrid';
class CartItem extends Component {
   state = { currentImageIndex: 0 };

   changeSlideHandler = (arrLength, add) => {
      const { currentImageIndex } = this.state;
      if (currentImageIndex + add === arrLength) {
         this.setState({ currentImageIndex: 0 });
      }
      if (currentImageIndex + add === -1) {
         this.setState({ currentImageIndex: arrLength - 1 });
      } else {
         this.setState((state) => ({
            currentImageIndex: state.currentImageIndex + add,
         }));
      }
   };

   orderHandler = () => {
      console.log('order action!');
   };

   incrementAmount = () => {
      this.setState((state) => ({
         amount: state.amount + 1,
      }));
      const { data, reduxData } = this.props;
      this.props.addProductToCard(
         data.product.id,
         reduxData.paramgrid,
         reduxData.color,
         this.state.amount,
         data.product.prices
      );
   };

   decrementAmount = () => {
      const { data, reduxData } = this.props;

      if (this.state.amount === 1) {
         this.props.deleteProductFromCard(
            data.product.id,
            reduxData.paramgrid,
            reduxData.color,
            data.product.prices
         );
      } else {
         this.setState((state) => ({
            amount: state.amount - 1,
         }));

         this.props.deleteProductFromCard(
            data.product.id,
            reduxData.paramgrid,
            reduxData.color,
            data.product.prices
         );
      }
   };

   render() {
      const { currentImageIndex } = this.state;
      const { reduxData, data } = this.props;
      const { loading, product } = data;
      return (
         <>
            {loading ? (
               <SmallSpinner />
            ) : (
               <li className={styles.root}>
                  <ul className={styles.root__information_wrapper}>
                     <li>
                        <ProductTitle
                           brand={product.brand}
                           name={product.name}
                           paddingDisabled={true}
                        />
                     </li>
                     <PricePlug prices={reduxData.pricesArray} />
                     {product.attributes.map((currentAttribute, index) => {
                        if (currentAttribute.id !== 'Color') {
                           return (
                              <ParamGrid
                                 key={currentAttribute.id}
                                 attributeIndex={index}
                                 sizegrid={currentAttribute}
                                 selectedParamArray={reduxData.paramgrid}
                                 haveExistingParamArray={true}
                              />
                           );
                        }
                        return (
                           <ColorGrid
                              key={currentAttribute.id}
                              colorgrid={currentAttribute}
                              selectedColorName={reduxData.color}
                              haveExistingColor={true}
                           />
                        );
                     })}
                  </ul>
                  <div className={styles.root__image_carousel}>
                     <div className={styles.root__calculator}>
                        <button
                           className={styles.root__calculator__operation}
                           onClick={this.incrementAmount}
                        >
                           <PlusIcon scale={true} />
                        </button>
                        <Typography preset="cartdigit">
                           {reduxData.amount}
                        </Typography>
                        <button
                           className={styles.root__calculator__operation}
                           onClick={this.decrementAmount}
                        >
                           <MinusIcon scale={true} />
                        </button>
                     </div>
                     <div className={styles.root__slider}>
                        <img
                           src={product.gallery[currentImageIndex]}
                           alt={product.id + +currentImageIndex}
                        />
                        {product.gallery.length > 1 && (
                           <div className={styles.root__slider__wrapper}>
                              <button
                                 onClick={() =>
                                    this.changeSlideHandler(
                                       product.gallery.length,
                                       1
                                    )
                                 }
                              >
                                 <SliderArrow />
                              </button>
                              <button
                                 onClick={() =>
                                    this.changeSlideHandler(
                                       product.gallery.length,
                                       -1
                                    )
                                 }
                              >
                                 <SliderArrow revert={true} />
                              </button>
                           </div>
                        )}
                     </div>
                  </div>
               </li>
            )}
         </>
      );
   }
}

export default graphql(getSingleProduct, {
   options: (props) => ({ variables: { id: props.reduxData.id } }),
})(CartItem);
