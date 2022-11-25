import { Component } from 'react';
import styles from './productdescription.module.scss';
import Typography from '../Typography/Typography';
import parse from 'html-react-parser';
export default class ProductDescription extends Component {
   render() {
      const { descriptionString } = this.props;

      return (
         <div className={styles.root}>
            <Typography preset="description" component="div">
               {parse(descriptionString)}
            </Typography>
         </div>
      );
   }
}
