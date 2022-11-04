import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './header.module.scss';
import { graphql } from '@apollo/client/react/hoc';
import Logo from '../../atoms/Logo/Logo';
import CardIcon from '../../atoms/CardIcon/CardIcon';
import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';
import { Navigate } from 'react-router-dom';
import { getCategoriesTitles } from '../../../graphql/queries.js';
import { connect } from 'react-redux';
import { callRedirectToPLP, callRedirectToCard } from '../../../actions';

class Header extends Component {
   state = { redirectToProductPage: false };

   changeCategoryAndRedirect = (elName) => {
      this.props.setRedirectToCard(false);
      this.props.callRedirectToPLP(true);
      this.props.setSelectedCategory(elName);
   };

   render() {
      const { data, selectedCategory, setModalIsActive } = this.props;

      const { loading, categories, currencies } = data;
      return (
         <header className={styles.root}>
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
               <CardIcon setModalIsActive={setModalIsActive} />
            </div>
         </header>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      redurectToPLP: state.redurectToPLP,
      redirectToCard: state.redirectToCard,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      callRedirectToPLP: (redirect) => dispatch(callRedirectToPLP(redirect)),
      callRedirectToCard: (redirect) => dispatch(callRedirectToCard(redirect)),
   };
};

export default graphql(getCategoriesTitles)(
   connect(mapStateToProps, mapDispatchToProps)(Header)
);
