import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import clsx from 'clsx';
import { connect } from 'react-redux';
import styles from './priceplugoverlay.module.scss';
class PricePlugOverlay extends Component {
   render() {
      const { currentCurrency, prices } = this.props;
      const currency = prices.filter(
         ({ currency }) => currency.symbol === currentCurrency
      )[0];

      return (
         <li className={clsx(styles.root, styles['narrow'])}>
            <Typography preset={'currencyoverlay'}>
               {currency.currency.symbol} {currency.amount}
            </Typography>
         </li>
      );
   }
}

const mapStateToProps = (state) => {
   return { currentCurrency: state.currentCurrency };
};

export default connect(mapStateToProps)(PricePlugOverlay);
