import React from 'react';
import Typography from '../../atoms/Typography/Typography';
import CardProduct from '../../molecules/CardProduct/CardProduct';
import styles from './productlist.module.scss';

class ProductList extends React.Component {
   state = { products: [] };

   render() {
      const { selectedCategory, productsArray, currentCurrency } = this.props;
      return (
         <div className={styles.root}>
            <Typography
               preset="header1"
               className={styles.root__header}
               component="h3"
            >
               {selectedCategory}
            </Typography>
            <div className={styles.root__list_wrapper}>
               {selectedCategory === 'all'
                  ? productsArray.map((el) => (
                       <CardProduct
                          product={el}
                          currentCurrency={currentCurrency}
                          key={el.id}
                       />
                    ))
                  : productsArray
                       .filter((el) => el.category === selectedCategory)
                       .map((el) => <CardProduct product={el} key={el.id} />)}
            </div>
         </div>
      );
   }
}

export default ProductList;
