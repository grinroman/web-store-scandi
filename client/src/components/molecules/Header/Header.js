import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './header.module.scss';
import { graphql } from '@apollo/client/react/hoc';
import Logo from '../../atoms/Logo/Logo';
import CartIcon from '../../atoms/CartIcon/CartIcon';
import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';
import { Navigate } from 'react-router-dom';
import { getCategoriesTitles } from '../../../graphql/queries.js';
import { connect } from 'react-redux';
import { callRedirectToPLP } from '../../../actions';
const mapStateToProps = (state) => {
   return {
      redurectToPLP: state.redurectToPLP,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      callRedirectToPLP: (redirect) => dispatch(callRedirectToPLP(redirect)),
   };
};

class Header extends Component {
   state = { redirectToProductPage: false };

   changeCategoryAndRedirect = (elName) => {
      this.props.setSelectedCategory(elName);
      this.props.callRedirectToPLP(true);
   };

   render() {
      const { data, selectedCategory, redirectToProductPage } = this.props;

      const { loading, categories, currencies } = data;
      return (
         <header className={styles.root}>
            {redirectToProductPage && <Navigate to="/" replace={false} />}
            {loading ? (
               <SmallSpinner />
            ) : (
               <ul className={styles.root__categories}>
                  {categories.map((el, index) => {
                     return (
                        <li
                           className={clsx(
                              styles.root__categories__inselected,
                              selectedCategory === el.name && styles['selected']
                           )}
                           key={index}
                           onClick={() =>
                              this.changeCategoryAndRedirect(el.name)
                           }
                        >
                           <Typography
                              component="button"
                              preset={
                                 selectedCategory === el.name
                                    ? 'headertextselected'
                                    : 'headertextblank'
                              }
                              color={
                                 selectedCategory !== el.name
                                    ? 'paragraph'
                                    : 'salad'
                              }
                              className={styles.root__categories__button}
                           >
                              {el.name}
                           </Typography>
                        </li>
                     );
                  })}
               </ul>
            )}
            <Logo />
            <div className={styles.root__options}>
               {loading ? (
                  <SmallSpinner />
               ) : (
                  <Dropdown currencies={currencies} />
               )}
               <CartIcon />
            </div>
         </header>
      );
   }
}

export default graphql(getCategoriesTitles)(
   connect(mapStateToProps, mapDispatchToProps)(Header)
);
