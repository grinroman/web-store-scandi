import React, { Component } from 'react';

import { addProductToCard } from '../../../actions';
import styles from './cardoverlay.module.scss';
class CardOverlay extends Component {
   render() {
      const { setModalIsActive } = this.props;

      return (
         <div className={styles.root} onClick={setModalIsActive}>
            <div
               className={styles.root__overlay_wrapper}
               onClick={(e) => e.stopPropagation()}
            ></div>
         </div>
      );
   }
}

export default CardOverlay;
