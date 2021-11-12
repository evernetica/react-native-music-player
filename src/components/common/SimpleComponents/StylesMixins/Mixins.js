import { css } from 'styled-components'

export const flexMixin = css`
    ${({ flex }) => flex !== undefined ? `flex: ${flex};` : ''}
    ${({ justifyContent }) => justifyContent !== undefined ? `justify-content: ${justifyContent};` : ''}
    ${({ alignItems }) => alignItems !== undefined ? `align-items: ${alignItems};` : ''}
    ${({ flexDirection }) => flexDirection !== undefined ? `flex-direction: ${flexDirection};` : ''}
    ${({ flexGrow }) => flexGrow !== undefined ? `flex-grow: ${flexGrow};` : ''}
    ${({ flexShrink }) => flexShrink !== undefined ? `flex-shrink: ${flexShrink};` : ''}
    ${({ flexBasis }) => flexBasis !== undefined ? `flex-basis ${flexBasis};` : ''}
    ${({ alignSelf }) => alignSelf !== undefined ? `align-self ${alignSelf};` : ''}
`
export const paddingMixin = css`
    ${({ padding }) => padding !== undefined ? `padding: ${padding};` : ''}
    ${({ paddingTop }) => paddingTop !== undefined ? `padding-top: ${paddingTop};` : ''}
    ${({ paddingRight }) => paddingRight !== undefined ? `padding-right: ${paddingRight};` : ''}
    ${({ paddingBottom }) => paddingBottom !== undefined ? `padding-bottom: ${paddingBottom};` : ''}
    ${({ paddingLeft }) => paddingLeft !== undefined ? `padding-left: ${paddingLeft};` : ''}
    ${({ paddingVertical }) => paddingVertical !== undefined ? `padding-vertical: ${paddingVertical};` : ''}
    ${({ paddingHorizontal }) => paddingHorizontal !== undefined ? `padding-horizontal: ${paddingHorizontal};` : ''}
`
export const marginMixin = css`
    ${({ margin }) => margin !== undefined ? `margin: ${margin};` : ''}
    ${({ marginTop }) => marginTop !== undefined ? `margin-top: ${marginTop};` : ''}
    ${({ marginRight }) => marginRight !== undefined ? `margin-right: ${marginRight};` : ''}
    ${({ marginBottom }) => marginBottom !== undefined ? `margin-bottom: ${marginBottom};` : ''}
    ${({ marginLeft }) => marginLeft !== undefined ? `margin-left: ${marginLeft};` : ''}
    ${({ marginVertical }) => marginVertical !== undefined ? `margin-vertical: ${marginVertical};` : ''}
    ${({ marginHorizontal }) => marginHorizontal !== undefined ? `margin-horizontal: ${marginHorizontal};` : ''}
`
export const borderMixin = css`
    ${({ borderRadius }) => borderRadius !== undefined ? `border-radius: ${borderRadius};` : ''}
    ${({ border }) => border !== undefined ? `border: ${border};` : ''}
    ${({ borderBottom }) => borderBottom !== undefined ? `border-bottom-width: ${borderBottom.split(' ')[0]};
                                                        border-bottom-color: ${borderBottom.split(' ')[1]};` : ''}
    ${({ borderTop }) => borderTop !== undefined ? `border-top-width: ${borderTop.split(' ')[0]};
                                                        border-top-color: ${borderTop.split(' ')[1]};` : ''}
    ${({ borderRight }) => borderRight !== undefined ? `border-right-width: ${borderRight.split(' ')[0]};
                                                        border-right-color: ${borderRight.split(' ')[1]};` : ''}
    ${({ borderWidth }) => borderWidth !== undefined ? `border-width: ${borderWidth};` : ''}
    ${({ borderColor }) => borderColor !== undefined ? `border-color: ${borderColor};` : ''}
`
export const sizesMixin = css`
    ${({ width }) => width !== undefined ? `width: ${width};` : ''}
    ${({ maxWidth }) => maxWidth !== undefined ? `max-width: ${maxWidth};` : ''}
    ${({ height }) => height !== undefined ? `height: ${height};` : ''}
`
export const shadowMixin = css`
    ${({ elevation }) => elevation !== undefined ? `elevation: ${elevation};` : ''}
    ${({ shadowColor }) => shadowColor !== undefined ? `shadow-color: ${shadowColor};` : ''}
    ${({ shadow }) => shadow !== undefined ? `shadow: ${shadow};` : ''}
    ${({ shadowOffset }) => typeof shadowOffset === 'object' ? `shadow-offset: ${shadowOffset['width']} ${shadowOffset['height']};` : ''}
    ${({ shadowOpacity }) => shadowOpacity !== undefined ? `shadow-opacity: ${shadowOpacity};` : ''}
    ${({ shadowRadius }) => shadowRadius !== undefined ? `shadow-radius: ${shadowRadius};` : ''}
`
export const textMixin = css`
    ${({ textTransform }) => textTransform !== undefined ? `textTransform: ${textTransform};` : ''}
`
export const positionMixin = css`
    ${({ position }) => position !== undefined ? `position: ${position};` : ''}
    ${({ left }) => left !== undefined ? `left: ${left};` : ''}
    ${({ right }) => right !== undefined ? `right: ${right};` : ''}
    ${({ top }) => top !== undefined ? `top: ${top};` : ''}
    ${({ bottom }) => bottom !== undefined ? `bottom: ${bottom};` : ''}
`