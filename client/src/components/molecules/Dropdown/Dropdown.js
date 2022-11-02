import React from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './dropdown.module.scss';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { currencyChange } from '../../../actions';
import bindActionCreators from 'redux';

class Dropdown extends React.PureComponent {
   //TODO: оптимизация если валюта не меняется при нажатии на кнопку текущей валбты - PureComponent
   constructor(props) {
      super(props);
      this.state = {
         isActive: false,
      };
   }

   setIsActive = () => {
      this.setState((state) => ({
         isActive: !state.isActive, //TODO: закрывать список при нажатии вне его
      }));
   };

   setCurrentCurrency = (symbol) => {
      this.props.currencyChange(symbol);
      this.setIsActive();
   };

   render() {
      const { currencies, currentCurrency } = this.props;
      const { isActive } = this.state;
      return (
         <div className={styles.root}>
            <button
               className={styles.root__dropdown_btn}
               onClick={this.setIsActive}
            >
               <Typography
                  preset="currency"
                  component="div"
                  className={styles.root__currencylabel}
               >
                  {currentCurrency}
               </Typography>
               <div
                  className={clsx(
                     styles.root__dropdown_btn__arrow,
                     isActive && styles['isactive']
                  )}
               >
                  <svg
                     width="8"
                     height="4"
                     viewBox="0 0 8 4"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M1 3.5L4 0.5L7 3.5"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </div>
            </button>
            {isActive && (
               <ul className={styles.root__dropdown_content}>
                  {currencies.map((el, index) => {
                     return (
                        <li
                           onClick={() => this.setCurrentCurrency(el.symbol)}
                           key={index}
                           className={styles.root__dropdown_item}
                        >
                           <Typography
                              preset="currency"
                              component="button"
                              align="left"
                           >
                              {el.symbol} {el.label}
                           </Typography>
                        </li>
                     );
                  })}
               </ul>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return { currentCurrency: state.currentCurrency };
};
const mapDispatchToProps = (dispatch) => {
   return { currencyChange: (symbol) => dispatch(currencyChange(symbol)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
// export default Dropdown;
