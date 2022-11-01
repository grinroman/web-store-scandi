import React, { Component } from 'react';
import Typography from '../Typography/Typography';
import styles from './addtocardbutton.module.scss';
class AddToCardButton extends Component {
   render() {
      const { title, testNotistack } = this.props;

      return (
         //TODO: компонент нигде не используется
         <button className={styles.root} onClick={testNotistack}>
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
