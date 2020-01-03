import React, { Component } from 'react'
import { View, Image, ActivityIndicator, Dimensions, Platform, Text } from 'react-native'
import * as FileSystem from 'expo-file-system'
const ima = 'https://images.unsplash.com/photo-1442689859438-97407280183f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
class CachedImage extends Component {
    state = {
        loading: true,
        failed: false,
        imguri: '',
        width: 300,
        height: 300,
        fs: ''
    }
    async componentDidMount() {
        const extension = this.props.source.slice((this.props.source.lastIndexOf(".") - 1 >>> 0) + 2)
        if ((extension.toLowerCase() !== 'jpg') && (extension.toLowerCase() !== 'png') && (extension.toLowerCase() !== 'gif')) {
            this.setState({ loading: false, failed: true })
        }
        await FileSystem.downloadAsync(
            this.props.source,
            `${FileSystem.documentDirectory + this.props.title}.${extension}`
        )
            .then(({ uri }) => {
                this.setState({ fs: uri })
                console.log('Image finish');
                this.loadLocal(Platform.OS === 'ios' ? uri : this.props.source);
            })
            .catch(e => {
                console.log('Image loading error:', e);
                // if the online download fails, load the local version
                this.loadLocal(`${FileSystem.documentDirectory + this.props.title}.${extension}`);
            });
    }
    loadLocal(uri) {
        Image.getSize(uri, (width, height) => {
            // once we have the original image dimensions, set the state to the relative ones
            this.setState({ imguri: uri, loading: false, width: Dimensions.get('window').width, height: (height / width) * Dimensions.get('window').width });
        }, (e) => {
            // As always include an error fallback
            console.log('getSize error:', e);
            this.setState({ loading: false, failed: true })
        })
    }
    render() {
        const { style } = this.props
        {
            if (this.state.loading) {
                // while the image is being checked and downloading
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator
                            color='#42C2F3'
                            size='large'
                        />
                    </View>
                );
            }
        }
        {
            if (this.state.failed) {
                // if the image url has an issue
                return (<View></View>);
            }
        }
        // otherwise display the image
        return (
            <View>
                <Image
                    style={[{ width: this.state.width, height: this.state.height }, style]}
                    source={{ uri: this.state.imguri }}
                />
                <Text>{this.state.fs} mhmkmkmk</Text>
            </View>
        );
    }
}
export default CachedImage;