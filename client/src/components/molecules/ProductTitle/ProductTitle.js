import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import clsx from 'clsx';
import styles from './producttitle.module.scss';

class ProductTitle extends Component {
   render() {
      const { brand, name, paddingDisabled } = this.props;

      return (
         <div className={clsx(styles.root, paddingDisabled && styles.nomargin)}>
            <Typography preset="brand" className={styles.root__brand}>
               {brand}
            </Typography>
            <Typography preset="productname">{name}</Typography>
         </div>
      );
   }
}

export default ProductTitle;
