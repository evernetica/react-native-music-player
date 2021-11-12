import { useEffect, useState } from 'react';

import { ORDER_LOOP_ALL, ORDER_LOOP_ONE, ORDER_MIX } from '../constants'

export const useSoundOrder = (soundList, playingId, orderList) => {
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [isLooped, setLooped] = useState(null)
    const [afterCurrentPlay, setAfterCurrentPlay] = useState(null)
    const [played, setPlayed] = useState([])

    const currentIndex = soundList.findIndex(el => el.id === playingId)
    useEffect(() => {
        if (currentIndex !== -1) {
            if (orderList.includes(ORDER_MIX)) {
                let randomId = getRandom(soundList.length, currentIndex)
                setNext(soundList[randomId].id)
                setPrev(soundList[randomId].id)
            } else {
                let nextIndex = getNextLoop(soundList.length, currentIndex)
                let prevIndex = getPrevLoop(soundList.length, currentIndex)
                setNext(soundList[nextIndex].id)
                setPrev(soundList[prevIndex].id)
                if (played.length > 0) {
                    setPlayed([])
                }
            }
            if (orderList.includes(ORDER_LOOP_ONE)) {
                setLooped(true)
            } else {
                setLooped(false)
            }
            if (orderList.includes(ORDER_LOOP_ONE)) {
                setAfterCurrentPlay(soundList[currentIndex].id)
            } else if (orderList.includes(ORDER_MIX)) {
                if (orderList.includes(ORDER_LOOP_ALL)) {
                    let randomId = getRandom(soundList.length, currentIndex)
                    setAfterCurrentPlay(soundList[randomId].id)
                    if (played.length > 0) {
                        setPlayed([])
                    }
                } else {
                    const unPlayedSoundItems = soundList.filter(el => !played.includes(el.id))
                    if (unPlayedSoundItems.length > 0) {
                        let randomId = getRandom(unPlayedSoundItems.length, null)
                        setAfterCurrentPlay(unPlayedSoundItems[randomId].id)
                    } else {
                        setAfterCurrentPlay(null)
                    }
                }
            } else if (orderList.includes(ORDER_LOOP_ALL)) {
                let nextIndex = getNextLoop(soundList.length, currentIndex)
                setAfterCurrentPlay(soundList[nextIndex].id)
            } else {
                let nextIndex = getNextLoop(soundList.length, currentIndex)
                setAfterCurrentPlay(nextIndex > 0 ? soundList[nextIndex].id : null)
            }
        }
    }, [currentIndex, orderList, played.length])

    const getNextLoop = (length, current) => {
        return length - 1 > current ? current + 1 : 0
    }
    const getPrevLoop = (length, current) => {
        return current > 0 ? current - 1 : length - 1
    }
    const getRandom = (max, exclude) => {
        let randomId
        do {
            randomId = Math.floor(Math.random() * max)
        } while (randomId === exclude)
        return randomId
    }
    const addPlayed = (soundId) => {
        setPlayed(prev => [...prev, soundId])
    }
    return { next, prev, afterCurrentPlay, addPlayed, isLooped }
}