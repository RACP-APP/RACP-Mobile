import React, { Component, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Dimensions, Platform, AsyncStorage } from 'react-native'
import * as FileSystem from 'expo-file-system'
import VideoComp from './VideoComp'

let lol = "";
const CacheVid = () => {
    const [downloadProgress, setD] = useState();
    const [load, setL] = useState(false);
    useEffect(() => {
        // Create an scoped async function in the hook
        async function anyNameFunction() {
            const callback = downloadProgress => {
                const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
                setD(progress)
            };

            let downloadResumable = FileSystem.createDownloadResumable(
                'http://techslides.com/demos/sample-videos/small.mp4',
                FileSystem.documentDirectory + 'small22.mp4',
                {},
                callback
            );

            try {
                const { uri } = await downloadResumable.downloadAsync();
                lol = uri
                console.log('Finished downloading to 1 ', downloadProgress, uri, lol + "heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeey");
            } catch (e) {
                console.error(e);
            }

            try {
                await downloadResumable.pauseAsync();
                console.log('Paused download operation, saving for future retrieval');
                AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
            } catch (e) {
                console.error(e);
            }

            try {
                const { uri } = await downloadResumable.resumeAsync();
                lol = uri
                setL(true)
                console.log('Finished downloading to 2', uri);
            } catch (e) {
                console.error(e);
            }

            //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
            const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
            const downloadSnapshot = JSON.parse(downloadSnapshotJson);
            downloadResumable = new FileSystem.DownloadResumable(
                downloadSnapshot.url,
                downloadSnapshot.fileUri,
                downloadSnapshot.options,
                callback,
                downloadSnapshot.resumeData
            );

            try {
                const { uri } = await downloadResumable.resumeAsync();
                lol = uri
                console.log('Finished downloading to 3', uri);
            } catch (e) {
                console.error(e);
            }
        }
        // Execute the created function directly
        anyNameFunction();
    }, []);

    {

        if (load) {
            return (
                <View >
                    <VideoComp path={lol}></VideoComp>
                    <Text>its here{downloadProgress, lol}</Text>
                </View>
            );
        }
    }

    return (
        <View >
            <Text>w84it{lol, downloadProgress}</Text>
        </View>
    );
}
export default CacheVid;