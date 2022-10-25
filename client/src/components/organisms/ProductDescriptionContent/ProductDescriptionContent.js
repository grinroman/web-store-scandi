import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getSingleProduct } from '../../../graphql/queries';
import BigSpinner from '../../atoms/BigSpinner/BigSpinner';
import styles from './productdescriptioncontent.module.scss';
import Typography from '../../atoms/Typography/Typography';
import ProductTitle from '../../molecules/ProductTitle/ProductTitle';
import SizeGrid from '../../molecules/SizeGrid/SizeGrid';

class ProductDescriptionContent extends Component {
   state = { currentBigImage: 0 };

   setCurrentBigImage = (newIndex) => {
      this.setState({ currentBigImage: newIndex });
   };

   render() {
      const { data } = this.props;
      const { loading, product } = data;
      const { currentBigImage } = this.state;
      //   console.log(product.attributes);
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
                     <ProductTitle brand={product.brand} name={product.name} />
                     <SizeGrid sizegrid={product} />
                  </div>
               </div>
            )}
            <p></p>
         </>
      );
   }
}

export default graphql(getSingleProduct, {
   options: (props) => ({ variables: { id: props.productId } }),
})(ProductDescriptionContent);

// export default ProductDescriptionContent;
