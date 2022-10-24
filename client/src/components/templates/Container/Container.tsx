import clsx from 'clsx';
import React, { Component, CSSProperties } from 'react';
import styles from './container.module.scss';
type ContainerProps = {
   children: JSX.Element;
   display?: 'outer' | 'inner';
   component?: React.ElementType;
   className?: string;
   style?: CSSProperties;
};

export default class Container extends Component<ContainerProps> {
   state = {};

   render() {
      const {
         children,
         style,
         display = 'outer',
         component = 'div',
         className: classNameFromProps,
      } = this.props;

      const className = clsx(styles.root, styles[display], classNameFromProps);

      return React.createElement(component, { style, className }, children);
   }
}
