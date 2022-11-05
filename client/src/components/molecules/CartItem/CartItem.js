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

   changeSlideHandler = (arrLength) => {};

   render() {
      const { currentImageIndex } = this.state;
      const { reduxData, data } = this.props;
      const { loading, product } = data;
      console.log(reduxData.pricesArray);
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
                        <button className={styles.root__calculator__operation}>
                           <PlusIcon scale={true} />
                        </button>
                        <Typography preset="cartdigit">1</Typography>
                        <button className={styles.root__calculator__operation}>
                           <MinusIcon scale={true} />
                        </button>
                     </div>
                     <div className={styles.root__slider}>
                        <img
                           src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                           alt="kek))"
                        />
                        <div className={styles.root__slider__wrapper}>
                           <button>
                              <SliderArrow />
                           </button>
                           <button>
                              <SliderArrow revert={true} />
                           </button>
                        </div>
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
