import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './header.module.scss';
import { graphql } from '@apollo/client/react/hoc';
import Logo from '../../atoms/Logo/Logo';
import CardIcon from '../../atoms/CardIcon/CardIcon';
import clsx from 'clsx';
import Dropdown from '../Dropdown/Dropdown';
import SmallSpinner from '../../atoms/SmallSpinner/SmallSpinner';
import { getCategoriesTitles } from '../../../graphql/queries.js';
import { changeProductCategory } from '../../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
   changeCategoryAndRedirect = (elName) => {
      this.props.changeProductCategory(elName);
   };

   render() {
      const { data, setModalIsActive, selectedCategory } = this.props;

     

      const { loading, categories, currencies } = data;

      console.log('new render!!!');

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
                           <Link to={`/${el.name}`}>
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
                           </Link>
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
   return { selectedCategory: state.currentCategory };
};
const mapDispatchToProps = (dispatch) => {
   return {
      changeProductCategory: (symbol) =>
         dispatch(changeProductCategory(symbol)),
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(graphql(getCategoriesTitles)(Header));
