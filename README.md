# Music player
Music app includes using [redux-persist](https://github.com/rt2zz/redux-persist) (to save info of already loaded musics), [styled-components](https://styled-components.com/) and [custom hooks](https://reactjs.org/docs/hooks-custom.html)

Common features of this app :
- To load your music from a device to the app
- To remove loaded music from app (not from device)
- To listen to already loaded music in different orders
- To go to next/previous music using control panel while dives is locked

## Installation

Use the package manager [npm](https://docs.npmjs.com/about-npm) or [yarn](https://yarnpkg.com/) to install node modules.

```bash
npm install / yarn
```

Then use [CocoaPods](https://cocoapods.org/) to install needed pods
```bash
cd ios/
pod install
```

## Running
To run it you must have working metro server to start it:
```bash
npm start / npm run start
```
__Highly recommended to run app using [Xcode](https://apps.apple.com/ua/app/xcode/id497799835?mt=12) (for ios) or [Android Studio](https://developer.android.com/studio) (for android)__
> on android make sure that your app connected to metro server if no you may try `adb reverse tcp:8081 tcp:8081`


## Summary
- Almost all components used `styled-component` are in `src/components/common` folder.
- Custom hooks are in `src/hooks` folder.
- Redux-needed things are in `src/redux` folder.

## License
[MIT](https://choosealicense.com/licenses/mit/)