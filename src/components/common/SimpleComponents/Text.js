import styled from 'styled-components/native'
import { borderMixin, flexMixin, marginMixin, paddingMixin, positionMixin, sizesMixin, textMixin } from './StylesMixins/Mixins'

const Text = styled.Text`
    ${marginMixin}
    ${sizesMixin}
    ${textMixin}
    ${positionMixin}
    ${paddingMixin}
    ${borderMixin}
    ${flexMixin}
    ${(({ color }) => color !== undefined ? `color: ${color};` : '')}
    ${(({ fontSize }) => fontSize !== undefined ? `font-size: ${fontSize};` : '')}
    ${(({ fontWeight }) => fontWeight !== undefined ? `font-weight: ${fontWeight};` : '')}
    ${(({ textAlign }) => textAlign !== undefined ? `text-align: ${textAlign};` : '')}
    ${(({ alignSelf }) => alignSelf !== undefined ? `align-self: ${alignSelf};` : '')}
    ${(({ justifySelf }) => justifySelf !== undefined ? `justify-self: ${justifySelf};` : '')}
    ${(({ textTransform }) => textTransform !== undefined ? `text-transform: ${textTransform};` : '')}
    ${(({ overflow }) => overflow !== undefined ? `overflow: ${overflow};` : '')}
    ${(({ lineHeight }) => lineHeight !== undefined ? `line-height: ${lineHeight};` : '')}
`
export default Text