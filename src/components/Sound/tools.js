import 'react-native-get-random-values';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs'
import { v4 as uuidv4 } from 'uuid';

import { musicDirectory } from '../../constants'

const hasAndroidStoragePermission = async () => {
    const permissions = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
    const hasWPermission = await PermissionsAndroid.check(permissions[0]);
    const hasRPermission = await PermissionsAndroid.check(permissions[1]);
    if (hasWPermission && hasRPermission) {
        return true;
    }
    const status = await PermissionsAndroid.requestMultiple(permissions);
    return status === 'granted';
}
export const createNewSound = async (title, originUrl) => {
    if (Platform.OS === 'android' && !(await hasAndroidStoragePermission())) {
        return ['Error', null]
    }
    try {
        const id = uuidv4()
        const existDirectory = await RNFS.exists(musicDirectory)
        if(!existDirectory){
            await RNFS.mkdir(musicDirectory)
        }
        const fileResult = await RNFS.readFile(originUrl, 'base64')
        let path = (musicDirectory + title.replace(/[ -]/g, '_').toLocaleLowerCase())
        const exist = await RNFS.exists(path)

        if (exist) {
            return ['File already added', null] // path - path to already exist file
        } else {
            await RNFS.writeFile(path, fileResult, 'base64')
            return [null, { title, url: path, id }]
        }
    } catch (err) {
        console.log('err:', err)
    }
    return ['Load file error', null]
}