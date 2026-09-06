'use client';

import React from 'react';
import './StarBorder.css';

export interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  contentClassName?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string | number;
  children?: React.ReactNode;
}

const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = 'div',
  className = '',
  contentClassName = '',
  color = '#A855F7',
  speed = '6s',
  thickness = 1.5,
  backgroundColor,
  textColor,
  borderColor,
  borderRadius,
  children,
  style,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        borderRadius: borderRadius !== undefined ? borderRadius : undefined,
        ...style,
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={`inner-content star-border-inner ${contentClassName}`}
        style={{
          ...(backgroundColor ? { background: backgroundColor } : {}),
          ...(textColor ? { color: textColor } : {}),
          ...(borderColor ? { borderColor } : {}),
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
