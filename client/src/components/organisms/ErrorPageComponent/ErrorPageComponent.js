import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './errorpagecomponent.module.scss';
export default class ErrorPage extends Component {
   render() {
      return (
         <div className={styles.root}>
            <Typography className={styles.root__message} preset="productname">
               Such page not exist!
            </Typography>
         </div>
      );
   }
}
