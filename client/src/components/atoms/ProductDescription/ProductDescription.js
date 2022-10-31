import React, { Component } from 'react';
import styles from './productdescription.module.scss';
import DOMPurify from 'dompurify';
import Typography from '../Typography/Typography';
export default class ProductDescription extends Component {
   render() {
      const { descriptionString } = this.props;

      return (
         <div className={styles.root}>
            <Typography preset="description" component="div">
               <div
                  dangerouslySetInnerHTML={{
                     __html: DOMPurify.sanitize(descriptionString),
                  }}
               />
            </Typography>
         </div>
      );
   }
}
