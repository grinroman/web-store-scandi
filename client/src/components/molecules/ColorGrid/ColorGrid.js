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
      this.props.setSelectedColorName(this.props.colorgrid.items[0].id);
   }

   render() {
      const { selectedColorName, setSelectedColorName, colorgrid } = this.props;
      return (
         <li className={styles.root}>
            <Typography preset="optionsgridtitle">{colorgrid.id}</Typography>
            <ul className={styles.root__colorgrid}>
               {colorgrid.items.map((el, index) => {
                  return (
                     <li
                        key={el.id}
                        className={clsx(
                           styles.root__colorgrid__item,
                           selectedColorName === el.id && styles['outline']
                        )}
                        style={{ backgroundColor: el.value }}
                        onClick={() => setSelectedColorName(el.id)}
                     ></li>
                  );
               })}
            </ul>
         </li>
      );
   }
}

export default ColorGrid;
