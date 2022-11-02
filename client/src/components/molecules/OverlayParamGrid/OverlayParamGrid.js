import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import clsx from 'clsx';
import styles from './overlayparamgrid.module.scss';
export default class OverlayParamGrid extends Component {
   render() {
      const { paramgrid, selectedAttribute } = this.props;

      return (
         <div className={styles.root}>
            <Typography preset="overlayproduct">{paramgrid.id}</Typography>

            <ul className={styles.root__params_wrapper}>
               {paramgrid.items.map((el) => (
                  <Typography
                     key={el.id}
                     className={clsx(
                        styles.root__params_wrapper__item,
                        selectedAttribute === el.value && styles['selected']
                     )}
                     preset="categoryoverlay"
                     color={selectedAttribute === el.value && 'textdarkmode'}
                  >
                     {el.value}
                  </Typography>
               ))}
            </ul>
         </div>
      );
   }
}
