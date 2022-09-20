/*------------------------------------------------------------------------------------------------------------------------------------------
 * DivisionBox.tsx
 * WRITER : 최정근
 * DATE : 2022-08-01
 * DISCRIPTION : Division box
 * TYPE : Component
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

interface IcompType {
  compType: 'DEFAULT' | 'SPAN'; // 종류 구분용
}

interface IEat {
  rowSpan?: number;
  colSpan?: number;
}

// ========== Template Variation ==========
interface ITemplateA {
  template?: {
    row: React.CSSProperties['gridTemplate'];
    col: React.CSSProperties['gridTemplate'];
  };
}
interface ITemplateB {
  template?: React.CSSProperties['gridTemplate'];
  direction?: 'VERTICAL' | 'HORIZON';
}

interface ITemplateCombine {
  template?:
    | {
        row: React.CSSProperties['gridTemplate'];
        col: React.CSSProperties['gridTemplate'];
      }
    | React.CSSProperties['gridTemplate'];
  direction?: 'VERTICAL' | 'HORIZON';
}
// ========================================

interface DivisionBoxProps {
  gap?: React.CSSProperties['gap'];
  rowGap?: React.CSSProperties['rowGap'];
  columnGap?: React.CSSProperties['columnGap'];
  verticalAlign?: React.CSSProperties['alignItems'];
  horizonAlign?: React.CSSProperties['justifyContent'];
  repeat?: boolean;
  auto?: boolean;
  inner?: {
    defaultEat?: IEat;
    align?: boolean;
  };
  'data-layout'?: string;
  'data-page'?: string;
  'data-container'?: string;
  'data-component'?: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  reference?: React.LegacyRef<HTMLDivElement>;
  children?: React.ReactNode;
}

function DivisionBox(props: DivisionBoxProps & IEat & IcompType & ITemplateCombine) {
  /* ――――――――――――――― Variable ――――――――――――――― */
  /* ===== Props ===== */
  const {
    repeat = false,
    template = '',
    direction = typeof template === 'string' ? 'HORIZON' : undefined,
    gap,
    rowGap,
    columnGap,
    verticalAlign,
    horizonAlign,
    auto = false,
    inner,
    colSpan,
    rowSpan,
    'data-layout': dataLayout,
    'data-page': dataPage,
    'data-container': dataContainer,
    'data-component': dataComponent,
    className,
    style,
    onClick,
    reference,
    children,
  } = props;

  const innerAlign = inner?.align ?? true;

  /* ===== State ===== */
  /* ===== Const ===== */
  const dataAttr = {
    ...(!!dataLayout && { 'data-layout': dataLayout }),
    ...(!!dataPage && { 'data-page': dataPage }),
    ...(!!dataContainer && { 'data-container': dataContainer }),
    ...(!!dataComponent && { 'data-component': dataComponent }),
  };

  const rowTemplate: {
    gridTemplateRows?: React.CSSProperties['gridTemplateRows'];
    gridAutoRows?: React.CSSProperties['gridAutoRows'];
  } = (() => {
    const temp = typeof template === 'string' ? repeatTemplate(template) : repeatTemplate(template.row ?? '');
    return auto
      ? {
          gridAutoRows: temp,
        }
      : {
          gridTemplateRows: temp,
        };
  })();

  const colTemplate: {
    gridTemplateColumns?: React.CSSProperties['gridTemplateColumns'];
    gridAutoColumns?: React.CSSProperties['gridAutoColumns'];
  } = (() => {
    const temp = typeof template === 'string' ? repeatTemplate(template) : repeatTemplate(template.col ?? '');
    return auto
      ? {
          gridAutoColumns: temp,
        }
      : {
          gridTemplateColumns: temp,
        };
  })();

  /* ====== API ====== */

  const styleProperties: React.CSSProperties = {
    ...(direction === undefined && { ...rowTemplate, ...colTemplate }),
    ...(direction === 'VERTICAL' && rowTemplate),
    ...(direction === 'HORIZON' && colTemplate),
    ...(!!gap && { gap }),
    ...(!!rowGap && { rowGap }),
    ...(!!columnGap && { columnGap }),
    ...(!!verticalAlign && { alignItems: verticalAlign }),
    ...(!!horizonAlign && { justifyContent: horizonAlign }),
    ...(!!rowSpan && { gridRow: `span ${rowSpan}` }),
    ...(!!colSpan && { gridColumn: `span ${colSpan}` }),
  };

  /* ―――――――――――――――― Method ―――――――――――――――― */
  function applyInnerOption() {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const newStyle: React.CSSProperties = {
          ...(inner?.defaultEat?.rowSpan !== undefined && { gridRow: `span ${inner.defaultEat.rowSpan}` }),
          ...(inner?.defaultEat?.colSpan !== undefined && { gridColumn: `span ${inner.defaultEat.colSpan}` }),
        };

        return React.cloneElement(child, {
          ...child.props,
          style: { ...newStyle, ...child.props.style },
        });
      }
      return child;
    });
  }

  function repeatTemplate(t: string) {
    if (!Array.isArray(children)) return t;
    const quotient = children.length / t.split(' ').length;
    const remainder = children.length % t.split(' ').length;
    return repeat ? `repeat(${Math.floor(quotient)}, ${t}) ${remainder !== 0 ? `repeat(${remainder}, auto)` : ''}` : t;
  }

  /* ―――――――――――――― Use Effect ―――――――――――――― */

  /* ―――――――――――――――― Return ―――――――――――――――― */
  return (
    <div
      data-special="divisionBox"
      className={classNames(
        className,
        innerAlign && !!verticalAlign && 'inner-vertical-align',
        innerAlign && !!horizonAlign && 'inner-horizon-align',
      )}
      onClick={onClick}
      ref={reference}
      {...dataAttr}
      style={{ ...styleProperties, ...style }}
    >
      {applyInnerOption()}
    </div>
  );
}

/* ―――――――――――――――― Export ―――――――――――――――― */
function ExportComponent(props: DivisionBoxProps & ITemplateA): JSX.Element;
function ExportComponent(props: DivisionBoxProps & ITemplateB): JSX.Element;
function ExportComponent(props: DivisionBoxProps & ITemplateCombine) {
  return <DivisionBox compType="DEFAULT" {...props} />;
}

namespace ExportComponent {
  interface SpanProps extends DivisionBoxProps, IEat {}
  export function Span(props: SpanProps) {
    return <DivisionBox compType="SPAN" {...props} />;
  }
}

export default ExportComponent;
