import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'

const VideoComp = () => {
    return (
        <VideoPlayer
            videoProps={{
                shouldPlay: true,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: require('../../../assets/game.webm'),
            }}
            inFullscreen={true}
        />
    );
};

const styles = StyleSheet.create({
    screen: {
        width: 300,
        height: 300
    }

});


export default VideoComp;