import React, { Component } from 'react';
import clsx from 'clsx';
import styles from './sliderarrow.module.scss';
class SliderArrow extends Component {
   render() {
      const { revert } = this.props;
      return (
         <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(styles.root, revert && styles['revert'])}
         >
            <path
               d="M7.25 1.06857L1.625 6.6876L7.25 12.3066"
               stroke="white"
               strokeWidth="1.5"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      );
   }
}

export default SliderArrow;
