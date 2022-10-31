import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getSingleProduct } from '../../../graphql/queries';
import BigSpinner from '../../atoms/BigSpinner/BigSpinner';
import styles from './productdescriptioncontent.module.scss';
import Typography from '../../atoms/Typography/Typography';
import ProductTitle from '../../molecules/ProductTitle/ProductTitle';
import ParamGrid from '../../molecules/ParamGrid/ParamGrid';
import ColorGrid from '../../molecules/ColorGrid/ColorGrid';
import PricePlug from '../../molecules/PricePlug/PricePlug';
import AddToCardButton from '../../atoms/AddToCardButton/AddToCardButton';
import ProductDescription from '../../atoms/ProductDescription/ProductDescription';

class ProductDescriptionContent extends Component {
   state = {
      currentBigImage: 0,
      selectedSizeName: null,
      selectedColorName: null,
      selectedParamArray: [],
      hasColor: false,
   };

   setSelectedParamArray = (arrayIndex, incomingId, added) => {
      if (added) {
         this.setState((state) => {
            const newArr = state.selectedParamArray;
            newArr.push(incomingId);
            return { selectedParamArray: newArr };
         });
      } else {
         this.setState((state) => {
            const newArr = [...state.selectedParamArray];
            newArr.splice(arrayIndex, 1, incomingId);
            return { selectedParamArray: newArr };
         });
      }
   };

   setCurrentBigImage = (newIndex) => {
      this.setState({ currentBigImage: newIndex });
   };

   setSelectedColorName = (incomingName) => {
      this.setState({ selectedColorName: incomingName });
   };

   render() {
      const { data } = this.props;
      const { loading, product } = data;
      const { currentBigImage, selectedColorName, selectedParamArray } =
         this.state;
      return (
         <>
            {loading ? (
               <BigSpinner />
            ) : (
               <div className={styles.root}>
                  <div className={styles.root__image_wrapper}>
                     <ul className={styles.root__imagelist}>
                        {product.gallery.map((el, index) => (
                           <li
                              key={index}
                              onClick={() => {
                                 this.setCurrentBigImage(index);
                              }}
                           >
                              <img src={el} alt={product.name + +index}></img>
                           </li>
                        ))}
                     </ul>
                     <img
                        src={product.gallery[currentBigImage]}
                        alt={product.name}
                     />
                  </div>
                  <div className={styles.root__information_wrapper}>
                     <ul>
                        <ProductTitle
                           brand={product.brand}
                           name={product.name}
                        />
                        {product.attributes.map((currentAttribute, index) => {
                           if (currentAttribute.id !== 'Color')
                              return (
                                 <ParamGrid
                                    key={currentAttribute.id}
                                    attributeIndex={index}
                                    sizegrid={currentAttribute}
                                    selectedParamArray={selectedParamArray}
                                    setSelectedParamArray={
                                       this.setSelectedParamArray
                                    }
                                 />
                              );
                           return (
                              <ColorGrid
                                 key={currentAttribute.id}
                                 colorgrid={currentAttribute}
                                 selectedColorName={selectedColorName}
                                 setSelectedColorName={
                                    this.setSelectedColorName
                                 }
                              />
                           );
                        })}
                        <PricePlug prices={product.prices} />
                     </ul>
                     <AddToCardButton title={`add to card`} />
                     <ProductDescription
                        descriptionString={product.description}
                     />
                  </div>
               </div>
            )}
         </>
      );
   }
}

export default graphql(getSingleProduct, {
   options: (props) => ({ variables: { id: props.productId } }),
   // refetchQueries: [{ query: getSingleProduct }], //TODO: обновлять кэш!!!
})(ProductDescriptionContent);
