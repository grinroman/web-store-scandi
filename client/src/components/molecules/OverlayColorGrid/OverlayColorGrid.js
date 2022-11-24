import { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import clsx from 'clsx';
import styles from './overlaycolorgrid.module.scss';
class OverlayColorGrid extends Component {
   render() {
      const { colorgrid, selectedAttribute } = this.props;

      return (
         <div className={styles.root}>
            <Typography preset="overlayproduct">{colorgrid.id}</Typography>
            <ul className={styles.root__colorgrid}>
               {colorgrid.items.map((el, index) => {
                  return (
                     <li
                        key={el.id}
                        className={clsx(
                           styles.root__colorgrid__item,
                           selectedAttribute === el.id && styles['outline']
                        )}
                        style={{ backgroundColor: el.value }}
                     ></li>
                  );
               })}
            </ul>
         </div>
      );
   }
}

export default OverlayColorGrid;
