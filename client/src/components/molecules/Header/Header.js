import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './header.module.scss';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import Logo from '../../atoms/Logo/Logo';
import CartIcon from '../../atoms/CartIcon/CartIcon';
import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';

import { getCategoriesTitles } from '../../../graphql/queries.js';

class Header extends Component {
   render() {
      const { data, selectedCategory, setSelectedCategory } = this.props;
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
                           onClick={() => {
                              setSelectedCategory(el.name);
                           }}
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

export default graphql(getCategoriesTitles)(Header);
