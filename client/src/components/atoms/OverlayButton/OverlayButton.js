import React, { Component } from 'react';
import Typography from '../Typography/Typography';
import clsx from 'clsx';
import styles from './overlaybutton.module.scss';
export default class OverlayButton extends Component {
   render() {
      const { colorPreset, text, action } = this.props;

      return (
         <button
            className={clsx(
               styles.root,
               colorPreset === 'paragraph'
                  ? styles['viewbag']
                  : styles['checkout']
            )}
            onClick={action}
         >
            <Typography color={colorPreset} preset="overlaybtn">
               {text}
            </Typography>
         </button>
      );
   }
}
