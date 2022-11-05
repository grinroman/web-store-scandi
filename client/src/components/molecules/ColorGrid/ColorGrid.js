import React, { Component } from 'react';
import styles from './colorgrid.module.scss';
import clsx from 'clsx';
import Typography from '../../atoms/Typography/Typography';

class ColorGrid extends Component {
   shouldComponentUpdate(prevProps) {
      if (prevProps.selectedColorName !== this.props.selectedColorName) {
         return true;
      }
      return false;
   }

   componentDidMount() {
      if (!this.props.haveExistingColor) {
         this.props.setSelectedColorName(this.props.colorgrid.items[0].id);
      }
   }

   render() {
      const {
         selectedColorName,
         setSelectedColorName,
         colorgrid,
         haveExistingColor,
      } = this.props;
      return (
         <li className={styles.root}>
            <Typography preset="optionsgridtitle">{colorgrid.id}</Typography>
            <ul className={styles.root__colorgrid}>
               {colorgrid.items.map((el) => {
                  return (
                     <li
                        key={el.id}
                        className={clsx(
                           styles.root__colorgrid__item,
                           selectedColorName === el.id && styles['outline']
                        )}
                        style={{ backgroundColor: el.value }}
                        {...(!haveExistingColor && {
                           onClick: () => setSelectedColorName(el.id),
                        })}
                     ></li>
                  );
               })}
            </ul>
         </li>
      );
   }
}

export default ColorGrid;
