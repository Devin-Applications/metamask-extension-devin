import React from 'react';
import classnames from 'classnames';

import { IconColor, Display } from '../design-system/design-system';

import { Box } from '../box';

import { IconSize } from './icon.types';

export const Icon = React.forwardRef(
  (
    {
      name,
      size = IconSize.Md,
      color = IconColor.inherit,
      className = '',
      style,
      ...props
    },
    ref,
  ) => (
    <Box
      className={classnames(className, 'mm-icon', `mm-icon--size-${size}`)}
      ref={ref}
      as="span"
      display={Display.InlineBlock}
      color={color}
      style={{
        /**
         * To reduce the possibility of injection attacks
         * the icon component uses mask-image instead of rendering
         * the svg directly.
         */
        maskImage: `url('/images/icons/${String(name)}.svg')`,
        WebkitMaskImage: `url('/images/icons/${String(name)}.svg')`,
        ...style,
      }}
      {...props}
    />
  ),
);
