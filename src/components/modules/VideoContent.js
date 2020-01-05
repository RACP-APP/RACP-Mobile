import React, { Component } from 'react'
import { View, Text, AsyncStorage, AppState } from 'react-native'
import * as FileSystem from 'expo-file-system'
import VideoComp from './VideoComp'



//notes: basic data handling until future updates

export default class VideoContent extends Component {
    state = {
        pathing: null,
        loading: true,
        downloadProgress: null,
        appState: AppState.currentState
    }

    //class props

    filename = this.props.contentData.link.replace(/^.*[\\\/]/, '');

    filePathkey = this.filename;

    resumeKey = this.filename + 'Res';

    checks = this.props.contentData.md5;

    callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        this.setState({ downloadProgress: progress })
    };

    //create resumable download
    downloadResumable = FileSystem.createDownloadResumable(
        this.props.link,
        FileSystem.documentDirectory + 'Videos' + this.filename,
        { md5: true },
        this.callback
    );


    async resumable() {
        //dl start
        try {
            await this.downloadResumable.downloadAsync().then((output) => {
                AsyncStorage.setItem(this.filePathkey, JSON.stringify({ uri: output.uri }));
                AsyncStorage.getItem(this.filePathkey, (err, result) => {
                    const item = JSON.parse(result)
                    this.setState({ pathing: item.uri })
                    this.setState({ loading: false })
                });
            });

        } catch (e) {
            //future code for ui could be here
            console.log("error in dl init");
        }

    };


    //mainly for pausing downloads after exiting or for changing screens
    async unmountPause() {
        if (this.state.downloadProgress !== 1 && this.state.downloadProgress !== null) {
            try {
                await this.downloadResumable.pauseAsync().then(() => {
                    AsyncStorage.setItem(this.resumeKey, JSON.stringify(this.downloadResumable.savable()));
                });

            } catch (e) {
                //later for ui
                console.log("unmountpause error");
            }
        }
    };

    // continue after exit or pause
    async conDl() {

        const downloadSnapshotJson = await AsyncStorage.getItem(resumeKey);
        const downloadSnapshot = JSON.parse(downloadSnapshotJson);
        const downloadResumable = new FileSystem.DownloadResumable(
            downloadSnapshot.url,
            downloadSnapshot.fileUri,
            downloadSnapshot.options,
            this.callback,
            downloadSnapshot.resumeData
        );

        this.downloadResumable = downloadResumable;

        try {
            await this.downloadResumable.resumeAsync().then(async (uri) => {
                if (uri.md5 !== this.checks) {
                    await this.reDown(uri.uri, this.filePathkey, this.resumeKey);
                    this.resumable();
                } else {

                    AsyncStorage.setItem(this.filePathkey, JSON.stringify({ uri: uri.uri }));
                    AsyncStorage.removeItem(this.resumeKey)
                    AsyncStorage.getItem(this.filePathkey, (err, result) => {
                        const item = JSON.parse(result)
                        this.setState({ pathing: item.uri })
                        this.setState({ loading: false })
                    });
                }
            });

        } catch (e) {
            //
            console.log("error in condl");
        }
    };


    //load localy if present
    local() {
        AsyncStorage.getItem(this.filePathkey, (err, result) => {
            const item = JSON.parse(result)
            if (result !== null) {

                this.setState({ pathing: item.uri })
                this.setState({ loading: false })

            }
            else {
                this.setState({ loading: true })
                this.resumable();
            }

        });

    }

    //check if there is local or not yet completed download
    resu() {
        AsyncStorage.getItem(this.resumeKey, (err, res) => {
            if (res !== null) {
                this.conDl();
            } else {
                this.local();
            }
        });

    }

    //operations to do for basic redownload
    async reDown(fileUri, fileM, pauseM) {
        await FileSystem.deleteAsync(fileUri)
        await AsyncStorage.removeItem(fileM)
        await AsyncStorage.removeItem(pauseM)

        this.downloadResumable = FileSystem.createDownloadResumable(
            this.props.link,
            FileSystem.documentDirectory + 'Videos' + this.filename,
            { md5: true },
            this.callback
        );
    }

    //check for app state, mainly to capture app exit
    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            this.props.onBack();
        } else {
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
                <VideoComp path={this.state.pathing}></VideoComp>
            </View>
        )

    }
}

