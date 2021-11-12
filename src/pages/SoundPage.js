import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux';
import TextTicker from 'react-native-text-ticker'

import { AudioItem } from '../components/Sound/AudioItem';
import { StyledButton, StyledFlatList, StyledText, StyledView } from '../components/common/SimpleComponents'
import CustomDropDown from '../components/common/CombinationComponents/DropDown';
import { createNewSound } from '../components/Sound/tools';
import { addAudio, clearAudioStore } from '../redux/actions/audioActions';
import { useSoundOrder } from '../hooks/order';

import AddIcon from '../assets/add.svg'
import ShuffleIcon from '../assets/shuffle.svg'
import SimpleOrderIcon from '../assets/simpleOrder.svg'
import LoopOneIcon from '../assets/loopOne.svg'
import LoopAllIcon from '../assets/loop.svg'
import RemoveIcon from '../assets/delete.svg'
import PrevIcon from '../assets/prev.svg'
import NextIcon from '../assets/next.svg'
import PlayIcon from '../assets/play.svg'
import { ORDER_LOOP_ALL, ORDER_LOOP_ONE, ORDER_MIX, ORDER_SIMPLE } from '../constants';

const screenWidth = Dimensions.get('screen').width;

const orderList = [
    { id: 1, title: ORDER_MIX, icon: ShuffleIcon },
    { id: 2, title: ORDER_LOOP_ALL, icon: LoopAllIcon },
    { id: 3, title: ORDER_LOOP_ONE, icon: LoopOneIcon },
]
const defaultOrder = { id: 99, title: ORDER_SIMPLE, icon: SimpleOrderIcon }

const SoundPage = () => {
    const dispatch = useDispatch()
    const [playingSoundId, setPlayingSoundId] = useState(null)
    const [soundOrder, setSoundOrder] = useState([ORDER_SIMPLE])
    const audioItems = useSelector(({ audio }) => audio.items)
    const { next, prev, afterCurrentPlay, isLooped, addPlayed } = useSoundOrder(audioItems, playingSoundId, soundOrder)

    const clearAudios = () => dispatch(clearAudioStore())

    const loadSingleFile = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.audio],
            })
            const [error, newSoundItem] = await createNewSound(res.name, res.uri)
            if (error) {
                // handle error
                console.log(error)
            }
            if (newSoundItem) {
                dispatch(addAudio(newSoundItem))
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('ladno')
            } else {
                throw err
            }
        }
    }
    const handleSelectOrder = (orderTitle) => {
        setSoundOrder(prev => {
            if (prev.includes(orderTitle)) {
                return prev.filter(el => el !== orderTitle)
            } else {
                if (
                    orderTitle === ORDER_LOOP_ALL
                    && prev?.includes(ORDER_LOOP_ONE)
                ) {
                    return [...prev.filter(el => el !== ORDER_LOOP_ONE), orderTitle]
                } else if (
                    orderTitle === ORDER_LOOP_ONE
                    && prev?.find(el => el === ORDER_LOOP_ALL)
                ) {
                    return [...prev.filter(el => el !== ORDER_LOOP_ALL), orderTitle]
                }
                return [...prev, orderTitle]
            }
        })
    }
    const handleNext = () => {
        setPlayingSoundId(next)
    }
    const handlePrev = () => {
        setPlayingSoundId(prev)
    }
    const handlePlayFirst = () => {
        setPlayingSoundId(audioItems[0].id)
    }
    const currentFinishPlaying = useCallback((soundId) => {
        addPlayed(soundId)
        setPlayingSoundId(afterCurrentPlay)
    }, [afterCurrentPlay])

    const currentPlayingAudio = audioItems.find(el => el.id === playingSoundId)
    const renderItem = ({ item }) => (
        <AudioItem
            audioInfo={item}
            currentPlaying={playingSoundId}
            setCurrentPlaying={setPlayingSoundId}
            onFinishPlaying={currentFinishPlaying}
            isLooped={isLooped}
            handleNext={handleNext}
            handlePrev={handlePrev}
        />
    )
    const areSoundLoaded = audioItems.length > 0
    return (
        <StyledView flex={1}>
            <StyledText
                fontSize='30px'
                fontWeight='bold'
                paddingHorizontal='20px'
                paddingBottom='15px'
                paddingTop='25px'
                textAlign='center'
                color='gold'
            >Music</StyledText>
            <StyledView>
                <StyledView
                    flexDirection='row'
                    justifyContent='space-between'
                    borderTop='1px #ccc'
                    borderBottom='1px #000'
                    paddingHorizontal='8px'
                    paddingVertical='8px'
                    aligmItems='center'
                >
                    <StyledButton
                        onPress={clearAudios}
                        flexDirection='row'
                        alignItems='center'
                        borderRadius='10px'
                        paddingHorizontal='10px'
                        paddingVertical='10px'
                        justifyContent='space-between'
                        border='1px solid #000'
                        marginRight='5px'
                    >
                        <StyledRemoveIcon fill='#f53d3d' width='30px' height='30px' />
                        <StyledText
                            fontSize='18px'
                            fontWeight='bold'
                            textAlign='center'
                            color='#AA5555'
                        >
                            Clear store
                        </StyledText>
                    </StyledButton>

                    <CustomDropDown
                        onSelect={handleSelectOrder}
                        data={orderList}
                        defaultValue={defaultOrder}
                        disabled={!areSoundLoaded}
                    />
                    <StyledButton
                        onPress={loadSingleFile}
                        flexDirection='row'
                        alignItems='center'
                        borderRadius='10px'
                        paddingHorizontal='10px'
                        marginLeft='5px'
                        paddingVertical='10px'
                        justifyContent='space-between'
                        border='1px solid #000'
                    >
                        <StyledAddIcon fill='#4fab4f' width='30px' height='30px' />
                        <StyledText
                            fontSize='18px'
                            fontWeight='bold'
                            textAlign='center'
                            color='#4D954D'
                        >Load file</StyledText>
                    </StyledButton>
                </StyledView>
                <StyledView
                    paddingVertical='10px'
                    paddingHorizontal='16px'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    borderBottom='1px #000'
                >

                    {areSoundLoaded
                        ? <StyledView flexDirection='row' flex={1} justifyContent='space-between' alignItems='center'>
                            <StyledButton onPress={handlePrev} marginRight='25px' disabled={!prev} opacity={!prev ? 0.4 : 1}>
                                <PrevIcon width={30} height={30} />
                            </StyledButton>
                            {currentPlayingAudio
                                ? <StyledView marginRight='25px' width={Math.round(screenWidth / 100 * 62) + 'px'}>
                                    <StyledTextTicker
                                        duration={4500}
                                        loop
                                        bounce
                                        repeatSpacer={20}
                                        marqueeDelay={1500}
                                        useNativeDriver={true}
                                    >
                                        {currentPlayingAudio.title}
                                    </StyledTextTicker>
                                </StyledView>
                                : <StyledButton onPress={handlePlayFirst} marginRight='25px'>
                                    <PlayIcon width={30} height={30} fill='#000' />
                                </StyledButton>
                            }

                            <StyledButton onPress={handleNext} disabled={!next} opacity={!next ? 0.4 : 1}>
                                <NextIcon width={30} height={30} />
                            </StyledButton>
                        </StyledView>
                        : <StyledText fontSize='18px' color='#000' fontWeight='bold'>Load some music...</StyledText>
                    }
                </StyledView>
            </StyledView>
            <StyledFlatList
                data={audioItems}
                renderItem={renderItem}
                keyExtractor={({ id }) => id}
                flex={1}
            />
        </StyledView>
    )
}
const StyledTextTicker = styled(TextTicker)`
    font-size: 20px;
    color: #000;
    font-weight: bold;
`
const StyledAddIcon = styled(AddIcon)`
    margin-right: 8px;
`
const StyledRemoveIcon = styled(RemoveIcon)`
    margin-right: 8px;
`
export default SoundPage