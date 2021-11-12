import RNFS from 'react-native-fs'
import { musicDirectory } from '../../constants'

export const addAudio = (payload) => ({ type: 'ADD_AUDIO_ITEM', payload })
export const addAudioList = (payload) => ({ type: 'ADD_AUDIO_LIST', payload })
export const fetchAdios = (payload) => ({ type: 'FETCH_ADIOS', payload })
export const removeAudioItem = (id, path) => {
    clearStorageFile(path)
    return { type: 'REMOVE_AUDIO', payload: id }
}
export const clearAudioStore = (payload) => {
    clearStorageFile()
    return { type: 'CLEAR_AUDIO_STORE', payload }
}

const clearStorageFile = async (path) => {
    try {
        if (path) {
            await RNFS.unlink(path)
            console.log('Music', path, 'was deleted')
        } else {
            await RNFS.unlink(musicDirectory)
            console.log('Music directory successfully cleared ')
        }
    } catch (err) {
        console.log('deleting directory error:', err)
    }
}