import React, { Component } from 'react';
import Typography from '../Typography/Typography';
import styles from './addtocardbutton.module.scss';
class AddToCardButton extends Component {
   render() {
      const { title } = this.props;

      return (
         <button className={styles.root}>
            <Typography
               preset="headertextselected"
               color="textdarkmode"
               align="center"
            >
               {title}
            </Typography>
         </button>
      );
   }
}

export default AddToCardButton;
