import React, { Component } from 'react';
import Typography from '../../atoms/Typography/Typography';
import styles from './sizegrid.module.scss';
export default class SizeGrid extends Component {
   render() {
      const { sizegrid } = this.props;
      console.log(sizegrid);
      return (
         <div className={styles.root}>
            <Typography preset="sizegrid"></Typography>
            {/* {sizegrid.map((el) => (
               <p>{el.value}</p>
            ))} */}
         </div>
      );
   }
}
