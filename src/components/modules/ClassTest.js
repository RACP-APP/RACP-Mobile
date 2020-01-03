import React, { Component } from 'react'
import { View, Image, Text, Button } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { AsyncStorage, AppState } from 'react-native';
import VideoComp from './VideoComp'
const sync = 'fs-module-page-Ctest22'
const fils = 'pausedDownloads22'
const imagi = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
const imagi3 = "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
const imagi2 = "https://www.videvo.net/videvo_files/converted/2017_04/preview/170216A_023_BoyatWindow4_1080p.mp439692.webm"

export default class Ctest extends Component {
    state = {
        pathing: null,
        loading: true,
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
        `${FileSystem.documentDirectory + 'ClassTest22'}.${this.state.exten}`,
        {},
        this.callback
    );

    async resumable() {
        //dl start
        console.log("inside init dl")
        try {
            await this.downloadResumable.downloadAsync().then((output) => {
                AsyncStorage.setItem(sync, JSON.stringify({ uri: output.uri }));
                console.log('download resumable init ', this.downloadResumable, this.state.downloadProgress, output.uri);
                AsyncStorage.getItem(sync, (err, result) => {
                    const fish = JSON.parse(result)
                    this.setState({ pathing: fish.uri })
                    this.setState({ loading: false })
                });
            });

        } catch (e) {
            console.log(e);
        }

    };



    async unmountPause() {
        console.log('check prog', this.state.downloadProgress)
        if (this.state.downloadProgress !== 1 && this.state.downloadProgress !== null) {
            try {
                await this.downloadResumable.pauseAsync();
                console.log('Paused download operation, saving for future retrieval, classy');
                // async storage key should be unique here.
                AsyncStorage.setItem(fils, JSON.stringify(this.downloadResumable.savable()));
            } catch (e) {
                console.log(e);
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
        console.log("damn this condl  ::")

        try {
            console.log("damn this condl inside  ::")
            await this.downloadResumable.resumeAsync().then((uri) => {
                AsyncStorage.setItem(sync, JSON.stringify({ uri: uri.uri }));

                AsyncStorage.getItem(sync, (err, result) => {
                    const fish = JSON.parse(result)
                    this.setState({ pathing: fish.uri })
                    this.setState({ loading: false })
                });


            });

        } catch (e) {
            console.log(e);
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




    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            console.log('App has come to the foreground!', AppState.currentState);
            this.resu();

        } else {
            console.log('App has come to the bottom!', AppState.currentState);
            this.setState({ appState: nextAppState });
            this.unmountPause();
        }
    };


    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.resu();
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.unmountPause();

    }


    render() {
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
