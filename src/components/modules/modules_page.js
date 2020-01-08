import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Contents from './Contents_page'
import Mp_fade from './mp_fade'

export default class Modules_Page extends Component {
    data = this.props.navigation.state.params.pages
    length = this.data.length


    state = {

        currentP: this.data[0],
        completed: false,
        L: false,
        N: false

    }

    cp = parseInt(this.state.currentP.number)



    async comp(v) {
        await AsyncStorage.getItem(v, (e, r) => {
            const res = JSON.parse(r)
            if (r !== null) {
                console.log("lolp")
                this.setState({ completed: res.check })
            } else {
                console.log(e, "?list?")
                //this.setState({ completed: false })
            }
        })
    }



    func = () => {


        //this.cp = parseInt(this.state.currentP.number)
        if (parseInt(this.state.currentP.number) > 1 && parseInt(this.state.currentP.number) === this.length) {
            this.setState({ L: true, N: false })
            //console.log("hey 1", this.cp)
        }
        else if (parseInt(this.state.currentP.number) < this.length && parseInt(this.state.currentP.number) === 1) {
            //this.setState({ L: true })
            //console.log("hey 2", this.cp)
            this.setState({ N: true, L: false })
        }
        else {
            //console.log("hey 3", this.cp, this.state.currentP.number)
            this.setState({ L: true, N: true })
        }
    }



    GoNextPage = () => {
        console.log("pressed go next", this.length)
        if (parseInt(this.state.currentP.number) <= this.length - 1 && this.state.completed) {
            this.setState({ currentP: this.data[parseInt(this.state.currentP.number)] }, () => {
                //this.cp = parseInt(this.state.currentP.number)
            })

            console.log("gonext !")
        }
    }

    GoLastPage = () => {
        const here = parseInt(this.state.currentP.number)
        const x = here - 2
        console.log("pressed go last", parseInt(this.state.currentP.number), here)

        if (parseInt(this.state.currentP.number) > 0) {
            this.setState({ currentP: this.data[x] }, () => {
                //this.cp = parseInt(this.state.currentP.number)
                console.log("pressed inside set", parseInt(this.state.currentP.number), here)
            })

            //console.log("laaaaaast", this.state.currentP.number, this.cp)
        }
    }

    async componentDidMount() {
        console.log("fired")
        //this.setit();
        await this.comp(this.state.currentP.id);
        this.func();


    }

    componentDidUpdate(prevProps, prevState) {
        console.log("it did run so?")
        if (this.state.currentP !== prevState.currentP) {
            // this.setState({})
            console.log("wtf")
            this.func()
        }
    }


    render() {
        return (

            <View style={styles.screen}>
                <Mp_fade key={parseInt(this.state.currentP.number) + 20} las={this.GoLastPage} nex={this.GoNextPage} L={this.state.L} N={this.state.N} />

                <Contents key={this.state.currentP.id} Pid={this.state.currentP.id} contentData={this.state.currentP.contentData} />



                <Text>{parseInt(this.state.currentP.number)}</Text>

            </View>

        );
    }
};




const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }

});


