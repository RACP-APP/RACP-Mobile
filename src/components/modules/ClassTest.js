import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { AsyncStorage, AppState } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import VideoComp from './VideoComp'
const sync = 'ClassTest18'
const fils = 'pausedDow18'
const imagi3 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
const imagi4 = "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
const imagi2 = "https://www.videvo.net/videvo_files/converted/2017_04/preview/170216A_023_BoyatWindow4_1080p.mp439692.webm"
const imagi = 'https://i.imgur.com/Sa8o2cx.mp4'
const checks = '7543a4d3eafd92590af3812fe21e8a41'
export default class Ctest extends Component {
    state = {
        pathing: null,
        loading: true,
        failed: false,
        downloadProgress: null,
        appState: AppState.currentState,
        exten: imagi.slice((imagi.lastIndexOf(".") - 1 >>> 0) + 2)
    }
    // download progress callback for fs resumable.
    callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        this.setState({ downloadProgress: progress })
    };
    //create resumable download
    downloadResumable = FileSystem.createDownloadResumable(
        imagi,
        `${FileSystem.documentDirectory + sync}.${this.state.exten}`,
        { md5: true },
        this.callback
    );


    async resumable() {
        //dl start
        console.log("inside init dl")
        try {
            await this.downloadResumable.downloadAsync().then((output) => {
                AsyncStorage.setItem(sync, JSON.stringify({ uri: output.uri }));
                console.log('download resumable init ', output.md5, this.state.downloadProgress, output.uri);
                AsyncStorage.getItem(sync, (err, result) => {
                    const fish = JSON.parse(result)
                    this.setState({ pathing: fish.uri })
                    this.setState({ loading: false })
                });
            });

        } catch (e) {
            console.log("error in init");
        }

    };



    async unmountPause() {
        console.log('check prog', this.state.downloadProgress)
        if (this.state.downloadProgress !== 1 && this.state.downloadProgress !== null) {
            try {
                await this.downloadResumable.pauseAsync().then(() => {
                    AsyncStorage.setItem(fils, JSON.stringify(this.downloadResumable.savable()));
                });
                console.log('Paused download operation, saving for future retrieval, classy');
                // async storage key should be unique here.

            } catch (e) {
                console.log("unmountpause error");
            }
        } else {
            console.log("no need")
        }
    };


    async conDl() {

        const downloadSnapshotJson = await AsyncStorage.getItem(fils);
        const downloadSnapshot = JSON.parse(downloadSnapshotJson);
        const downloadResumable = new FileSystem.DownloadResumable(
            downloadSnapshot.url,
            downloadSnapshot.fileUri,
            downloadSnapshot.options,
            this.callback,
            downloadSnapshot.resumeData
        );

        this.downloadResumable = downloadResumable;
        console.log("damn this condl  ::", this.downloadResumable._resumeData)

        try {
            console.log("damn this condl inside  ::")
            await this.downloadResumable.resumeAsync().then(async (uri) => {
                console.log(uri.md5)

                if (uri.md5 !== checks) {
                    await this.stand(uri.uri, sync, fils);
                    this.resumable();
                } else {

                    AsyncStorage.setItem(sync, JSON.stringify({ uri: uri.uri }));
                    AsyncStorage.removeItem(fils)
                    AsyncStorage.getItem(sync, (err, result) => {
                        const fish = JSON.parse(result)
                        this.setState({ pathing: fish.uri })
                        this.setState({ loading: false })


                    });
                }
            });

        } catch (e) {
            console.log("error in condl");
        }
    };



    local() {
        AsyncStorage.getItem(sync, (err, result) => {
            const fish = JSON.parse(result)
            console.log('class local load', result);
            if (result !== null) {

                this.setState({ pathing: fish.uri })
                this.setState({ loading: false })

            }
            else {
                this.setState({ loading: true })
                this.resumable();
            }

        });

    }

    resu() {
        AsyncStorage.getItem(fils, (err, res) => {
            console.log('resu test up', res)
            if (res !== null) {
                this.conDl();
            } else {
                this.local();
            }
        });

    }

    async stand(link, mem, pmem) {
        await FileSystem.deleteAsync(link)
        await AsyncStorage.removeItem(mem)
        await AsyncStorage.removeItem(pmem)

        this.downloadResumable = FileSystem.createDownloadResumable(
            imagi,
            `${FileSystem.documentDirectory + sync}.${this.state.exten}`,
            { md5: true },
            this.callback
        );
    }


    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            //special case
            console.log('App has come to the foreground!', this.props, AppState.currentState);
            //this.stand();
            this.props.onBack();


        } else {
            console.log('App has come to the bottom!', AppState.currentState);
            this.setState({ appState: nextAppState });
            this.unmountPause();
        }
    };


    async componentDidMount() {

        AppState.addEventListener('change', this._handleAppStateChange);
        this.resu();

    }
    async componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        await this.unmountPause();

    }


    render() {

        {
            if (this.state.failed) {
                // if the image url has an issue
                return (
                    <View>
                        <Text>download is corrupted{this.state.downloadProgress}</Text>
                    </View>);
            }
        }

        {
            if (this.state.loading) {
                return (
                    <View>

                        <Text>load:true{this.state.downloadProgress}</Text>


                    </View>
                )
            }
        }


        return (
            <View >

                <Text>load:false {this.state.pathing}{this.state.downloadProgress}</Text>
                <VideoComp path={this.state.pathing}></VideoComp>

            </View>
        )

    }
}

