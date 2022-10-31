import React, { CSSProperties } from 'react';
import { Color } from '../../../types/Color';
import clsx from 'clsx';
import styles from './typography.module.scss';

type TypographyProps = {
   children: JSX.Element;
   component?: React.ElementType;
   preset?:
      | 'headertextselected'
      | 'headertextblank'
      | 'currency'
      | 'cardtitle'
      | 'outofstock'
      | 'brand'
      | 'productname'
      | 'optionsgridtitle'
      | 'amountplug'
      | 'description';
   color?: Color;
   style?: CSSProperties;
   align?: 'left' | 'center' | 'right';
   className?: string;
};

class Typography extends React.Component<TypographyProps> {
   render() {
      const {
         children,
         color = 'black',
         component = 'p',
         preset = 'common1',
         style,
         align,
         className: classNameFromProps,
      } = this.props;
      const className = clsx(
         styles.root,
         styles[preset],
         styles[color],
         styles[align!],
         classNameFromProps
      );
      return React.createElement(component, { style, className }, children);
   }
}
export default Typography;
