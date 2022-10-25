import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './producttitle.module.scss';

class ProductTitle extends Component {
   render() {
      const { brand, name } = this.props;

      return (
         <div>
            <Typography preset="brand" className={styles.root__brand}>
               {brand}
            </Typography>
            <Typography preset="productname">{name}</Typography>
         </div>
      );
   }
}

export default ProductTitle;
