import React, { useState, useEffect } from 'react'
import { View, Image, Text } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { AsyncStorage } from 'react-native';
const hey = 'https://i1.wp.com/thechickhatchery.com/wp-content/uploads/2018/01/RI-White.jpg?fit=371%2C363&ssl=1'
const imagi = 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Bucephala-albeola-010.jpg'
const title = 'ducksDir'

const Test = () => {
    //state variables
    const [imguri, setImg] = useState(null)
    const [load, setEx] = useState(true)
    const [dlProgress, setP] = useState(null)
    const exten = imagi.slice((imagi.lastIndexOf(".") - 1 >>> 0) + 2)



    // functions 

    let downloadResumable;



    // starting the dl
    async function resumable() {
        //create resumable download
        downloadResumable = FileSystem.createDownloadResumable(
            imagi,
            `${FileSystem.documentDirectory + 'placeholdername234'}.${exten}`,
            {},
            (dlP) => {
                setP(dlP.totalBytesWritten / dlP.totalBytesExpectedToWrite)
            }
        );
        //dl start

        try {
            const { uri } = await downloadResumable.downloadAsync();
            console.log('download init ', dlProgress, uri);
            if (dlProgress === 1) {
                AsyncStorage.setItem('fs-module-page-pics', JSON.stringify({ uri: uri }));
                console.log("running on", uri, dlProgress)
            }
        } catch (e) {
            console.error(e);
        }
    };




    // pausing the dl
    async function unmountPause() {
        try {
            await downloadResumable.pauseAsync();
            console.log('Paused download operation, saving for future retrieval');
            // async storage key should be unique here.
            AsyncStorage.setItem('pausedDownloads', JSON.stringify(downloadResumable.savable()));
        } catch (e) {
            console.error(e);
        }
    };






    //continue after not complete dl during unmount
    async function conDl() {
        const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
        const downloadSnapshot = JSON.parse(downloadSnapshotJson);
        const downloadResumable = new FileSystem.DownloadResumable(
            downloadSnapshot.url,
            downloadSnapshot.fileUri,
            downloadSnapshot.options,
            callback,
            downloadSnapshot.resumeData
        );

        try {
            const { uri } = await downloadResumable.resumeAsync();
            AsyncStorage.setItem('fs-module-page-pics', JSON.stringify({ uri: uri }));
            console.log('resumed dl stored', uri);
        } catch (e) {
            console.error(e);
        }
    };






    //get the item 
    async function getPic() {
        await AsyncStorage.getItem('fs-module-page-pics', (err, result) => {
            const fish = JSON.parse(result)
            console.log(result, fish, 'hmm fishy,item from asyncstorage');
            if (fish !== null) {

                setImg(fish.uri)

            }
            else {
                setImg(imagi)
            }
            setEx(false)
        });
    }







    //LC hook
    useEffect(() => {
        resumable();
        getPic();

    }, []);



    // rendering part
    {
        if (load) {
            return (
                <View>

                    <Text>w84it none download</Text>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: hey }}
                    />

                </View>
            )
        }
    }


    return (
        <View >
            <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: imguri }}
            />
            <Text>here @ {imguri}</Text>
            <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: hey }}
            />
        </View>
    )


}

export default Test;