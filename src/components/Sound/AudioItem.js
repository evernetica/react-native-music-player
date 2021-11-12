import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';

import { StyledButton, StyledText, StyledView } from '../common/SimpleComponents';
import { StyledLottieView } from './styled'
import { removeAudioItem } from '../../redux/actions/audioActions';
import { useAudio } from '../../hooks/audio'

const soundGif = require('../../assets/sound.json')
import PlayIcon from '../../assets/play.svg'
import PauseIcon from '../../assets/pause.svg'
import RemoveIcon from '../../assets/delete.svg'

const gifColors = [
    { keypath: 'path1', color: '#F00000' },
    { keypath: 'path2', color: '#FF000F' },
    { keypath: 'path3', color: '#4f3df5' },
    { keypath: 'path4', color: '#f5e33d' },
    { keypath: 'path5', color: '#4fab4f' },
    { keypath: 'path6', color: '#00FF44' },
    { keypath: 'path7', color: '#4f3df5' },
]

export const AudioItem = ({ audioInfo, currentPlaying, setCurrentPlaying, onFinishPlaying, isLooped, handleNext, handlePrev}) => {
    const dispatch = useDispatch()
    const [progressWidth, setProgressWidth] = useState(0)
    const {
        onReset, onPlay, onPause,
        onLoad, onRewind, onChangedMusic,
        progress, isPlaying, isOpen, gifRef,
        isLoaded,
    } = useAudio(audioInfo, currentPlaying, setCurrentPlaying, onFinishPlaying, isLooped, handleNext, handlePrev )

    useEffect(() => {
        if (currentPlaying !== audioInfo.id && isPlaying) {
            onChangedMusic()
        }
    }, [currentPlaying, isPlaying, onChangedMusic])

    useEffect(() => {
        if (currentPlaying === audioInfo.id && !isPlaying) {
            if(isLoaded){
                onPlay()
            } else {
                onLoad()
            }
        }
    }, [currentPlaying, onPlay])

    const handlePress = ({ nativeEvent }) => {
        const { locationX } = nativeEvent
        const newAudioPos = progressWidth / locationX
        onRewind(newAudioPos)
    }
    const onLayoutProgress = ({ nativeEvent: { layout } }) => {
        setProgressWidth(layout.width)
    }
    const handleRemove = () => {
        dispatch(removeAudioItem(audioInfo.id, audioInfo.url))
    }
    const handlePressPlayButton = () => {
        if (isPlaying) {
            onPause()
        } else {
            onPlay()
        }
    }
    return (
        <StyledView
            position='relative'
            paddingHorizontal='20px'
            paddingBottom='10px'
            paddingTop='20px'
            borderBottom={isPlaying ? undefined : '1px rgb(210,210,210)'}
            alignSelf='stretch'
            backgroundColor={isPlaying ? 'lavender' : 'transparent'}
            border={isPlaying ? '1px solid #000' : '1px solid transparent'}
        >
            <StyledView
                flexDirection='row'
                alignItems={isOpen ? 'flex-start' : 'center'}
                justifyContent='space-between'
            >
                <StyledButton onPress={handleRemove} marginRight='15px' paddingVertical='4px' paddingHorizontal='4px'>
                    <RemoveIcon fill='#f53d3d' width={20} height={20} />
                </StyledButton>
                <StyledText
                    flex={1}
                    fontSize='14px'
                    fontWeight='bold'
                    textAlign='center'
                    maxWidth='80%'
                    paddingBottom='10px'
                    numberOfLines={1}
                    color={isPlaying ? '#000' : '#ccc'}
                >{audioInfo.title}</StyledText>
                {isOpen
                    ? <StyledLottieView ref={gifRef} source={soundGif} colorFilters={gifColors} />
                    : <StyledButton onPress={onLoad} marginRight='10px' >
                        <StyledText
                            fontSize='16px'
                            backgroundColor='rgba(220,220,220,1)'
                            borderRadius='4px'
                            borderWidth='1px'
                            borderColor='rgba(80,80,80,0.5)'
                            overflow='hidden'
                            paddingVertical='7px'
                            paddingHorizontal='7px'
                            color='#000'
                        >Play</StyledText>
                    </StyledButton>
                }
            </StyledView>
            {isOpen
                &&
                <>
                    <StyledView
                        flexDirection='row'
                        alignItems='center'
                        marginBottom='8px'
                    >
                    </StyledView>
                    <StyledView flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <StyledButton
                            width='25px'
                            height='25px'
                            backgroundColor='#000'
                            onPress={onReset}
                            borderRadius='2px'
                            alignSelf='flex-end'
                            marginRight='15px'
                        />
                        <TouchableWithoutFeedback onPress={handlePress}>
                            <StyledView flex={1} marginRight='20px' onLayout={onLayoutProgress} height='7px'>
                                <Progress.Bar progress={progress} height={7} width={null} />
                            </StyledView>
                        </TouchableWithoutFeedback>
                        <StyledButton
                            onPress={handlePressPlayButton}
                            alignItems='center' justifyContent='center'
                        >
                            {!isPlaying ? <PlayIcon width={30} height={30} fill='#000' /> : <PauseIcon width={30} height={30} fill='#000' />}
                        </StyledButton>
                    </StyledView>
                </>
            }
        </StyledView>
    );
}
