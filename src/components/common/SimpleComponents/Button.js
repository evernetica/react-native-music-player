import styled from 'styled-components/native'
import { flexMixin, paddingMixin, sizesMixin, borderMixin, marginMixin, shadowMixin, positionMixin } from './StylesMixins/Mixins'

const StyledTouchableOpacity= styled.TouchableOpacity`
    ${flexMixin}
    ${borderMixin}
    ${paddingMixin}
    ${marginMixin}
    ${sizesMixin}
    ${shadowMixin}
    ${positionMixin}
    ${(({color}) => color !== undefined ? `color: ${color};`: '')}
    ${(({textAlign}) => textAlign !== undefined ? `text-align: ${textAlign};`: '')}
    ${(({backgroundColor}) => backgroundColor !== undefined ? `background-color: ${backgroundColor};`: '')}
    ${(({border}) => border !== undefined ? `border: ${border};`: '')}
    ${(({borderRadius}) => borderRadius !== undefined ? `border-radius: ${borderRadius};`: '')}
    ${(({transform}) => transform !== undefined ? `transform: ${transform};`: '')}
`

export default StyledTouchableOpacity