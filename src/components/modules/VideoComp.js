import React from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';

//state work needed for full screen support

const VideoComp = ({ path }) => {
    return (
        <View>
            <VideoPlayer
                videoProps={{
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                        uri: path
                    },

                }}
                inFullscreen={false}

                width={400}
                height={400}
                videoBackground='transparent'
                switchToLandscape={true}
            />
        </View>
    );
};



export default VideoComp;
