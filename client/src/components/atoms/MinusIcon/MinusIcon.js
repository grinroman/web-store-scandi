import { Component } from 'react';
import styles from './minusicon.module.scss';
class MinusIcon extends Component {
   render() {
      const { scale } = this.props;

      return (
         <svg
            width="10"
            height="2"
            viewBox="0 0 10 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={scale ? styles.zoomed : styles.root}
         >
            <path
               d="M1 1H9"
               stroke="#1D1F22"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      );
   }
}

export default MinusIcon;
