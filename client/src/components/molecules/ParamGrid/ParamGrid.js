import React, { Component, PureComponent } from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './paramgrid.module.scss';
import clsx from 'clsx';
export default class ParamGrid extends PureComponent {
   componentDidMount() {
      this.props.setSelectedParamArray(
         this.props.attributeIndex,
         this.props.sizegrid.items[0].value
      );
   }

   render() {
      const {
         sizegrid,
         selectedParamArray,
         setSelectedParamArray,
         attributeIndex,
      } = this.props;
      return (
         <li className={styles.root}>
            <Typography preset="overlaytitle">{sizegrid.id}</Typography>
            <ul className={styles.root__sizes_wrapper}>
               {sizegrid.items.map((el) => (
                  <li
                     key={el.id}
                     onClick={() =>
                        setSelectedParamArray(attributeIndex, el.value)
                     }
                  >
                     <Typography
                        preset="headertextblank"
                        color={
                           selectedParamArray[attributeIndex] === el.value &&
                           'textdarkmode'
                        }
                        className={clsx(
                           styles.root__sizes_wrapper__item,
                           selectedParamArray[attributeIndex] === el.value &&
                              styles['selected']
                        )}
                     >
                        {el.value}
                     </Typography>
                  </li>
               ))}
            </ul>
         </li>
      );
   }
}
