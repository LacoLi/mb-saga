/*------------------------------------------------------------------------------------------------------------------------------------------
 * Icon.tsx
 * WRITER : 최정근
 * DATE : 2022-02-16
 * DISCRIPTION : 
 * TYPE : Component
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface IconProps {
  type: 'solid' | 'regular' | 'light' | 'thin' | 'duotone';
  name: string;
  rotate?: '90' | '180' | '270';
  color?: string;
  className?: HTMLAttributes<HTMLElement>['className'];
  onClick?: React.MouseEventHandler<HTMLElement>;
}

function Icon(props: IconProps) {
  const { type, rotate, name, color, className = '', onClick = (e: React.MouseEvent) => {} } = props;
  return <i className={classNames(`fa-${type}`, `fa-${name}`, `fa-rotate-${rotate}`, className)} data-module="icon" onClick={onClick} />;
}

namespace Icon {}

export default Icon;
