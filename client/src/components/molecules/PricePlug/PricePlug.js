import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import { connect } from 'react-redux';
import styles from './priceplug.module.scss';
class PricePlug extends Component {
   render() {
      const { prices, currentCurrency } = this.props;
      // console.log(currentCurrency);

      const currency = prices.filter(
         ({ currency }) => currency.symbol === currentCurrency
      )[0];

      return (
         <li className={styles.root}>
            <Typography preset="optionsgridtitle">price</Typography>
            <Typography preset="optionsgridtitle">
               {currency.currency.symbol} {currency.amount}
            </Typography>
         </li>
      );
   }
}

const mapStateToProps = (state) => {
   return { currentCurrency: state.currentCurrency };
};

export default connect(mapStateToProps)(PricePlug);
