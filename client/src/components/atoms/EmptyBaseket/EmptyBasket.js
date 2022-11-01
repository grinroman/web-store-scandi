import React, { Component } from 'react';
import Typography from '../Typography/Typography';
import styles from './emptybasket.module.scss';
export default class EmptyBasket extends Component {
   render() {
      return (
         <div className={styles.root}>
            <img src="images/empty-basket.svg" alt="empty-basket" />
            <Typography preset="outofstock" align="center">
               The card is empty. <br /> You should to add something!
            </Typography>
         </div>
      );
   }
}
