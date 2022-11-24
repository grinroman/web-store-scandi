import { Component } from 'react';
import styles from './plusicon.module.scss';
class PlusIcon extends Component {
   render() {
      const { scale } = this.props;
      return (
         <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={scale ? styles.zoomed : styles.root}
         >
            <g clipPath="url(#clip0_92234_46)">
               <path
                  d="M12 8V16"
                  stroke="#1D1F22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
               <path
                  d="M8 12H16"
                  stroke="#1D1F22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </g>
            <defs>
               <clipPath id="clip0_92234_46">
                  <rect width="24" height="24" fill="white" />
               </clipPath>
            </defs>
         </svg>
      );
   }
}

export default PlusIcon;
