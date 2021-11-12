import React from 'react'
import { StyledView } from "."

const Separator = ({ color = '#000', size='1px', position = 'horizontal' }) => {
    let width = '100%', height = size
    if(position === 'vertical'){
        height = '100%'
        width = size
    }
    return (
        <StyledView
            backgroundColor={color}
            width={width}
            height={height}
        />
    )
}

export default Separator