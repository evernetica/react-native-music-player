import React from 'react'
import { ActivityIndicator, Platform } from 'react-native';
import { StyledView } from '.';

const PendingView = ({size='large', color=(Platform.OS === 'android' && '#0000ff'), ...props}) => (
    <StyledView paddingBottom='32px' flex={1} justifyContent='center' alignItems='center'>
        <ActivityIndicator color={color} size={size} {...props}/>
    </StyledView>
);

export default PendingView