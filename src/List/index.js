import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feed: this.props.data
        };
        this.likeShows = this.likeShows.bind(this);
        this.like = this.like.bind(this);
        this.loadingIcon = this.loadingIcon.bind(this);
    }

    loadingIcon(isLiked) {
        return isLiked ? require('../img/likeada.png') : require('../img/like.png');
    }

    like() {
        let feed = this.state.feed;

        if (feed.isLiked === true) {
            this.setState({
                feed: {
                    ...feed,
                    isLiked: false,
                    like: feed.like - 1
                }
            });
        } else {
            this.setState({
                feed: {
                    ...feed,
                    isLiked: true,
                    like: feed.like + 1
                }
            });
        }
    }

    likeShows(like) {
        let feed = this.state.feed;

        if (feed.like <= 0) {
            return;
        }

        return (
            <Text style={styles.like}>
                {feed.like} {feed.like > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );

    }

    render() {
        return (
            <View style={styles.feedArea}>
                <View style={styles.profileView}>
                    <Image
                        source={{ uri: this.state.feed.profile }}
                        style={styles.profilePicture}
                    />
                    <Text style={styles.userName}>{this.state.feed.name}</Text>
                </View>

                <Image
                    resizeMode='cover'
                    style={styles.publicationPicture}
                    source={{ uri: this.state.feed.publication }}
                />

                <View style={styles.btnArea}>
                    <TouchableOpacity onPress={this.like}>
                        <Image
                            source={this.loadingIcon(this.state.feed.isLiked)}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.send}>
                        <Image
                            source={require('../img/send.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                {this.likeShows(this.state.feed.like)}


                <View style={styles.footerView}>
                    <Text style={styles.footerName}>
                        {this.state.feed.name}
                    </Text>
                    <Text style={styles.description}>
                        {this.state.feed.description}
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    feedArea: {

    },
    userName: {
        fontSize: 22,
        textAlign: 'left',
        color: '#000000',

    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    publicationPicture: {
        flex: 1,
        height: 400,
        alignItems: 'center',
    },
    profileView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 8,
    },
    btnArea: {
        flexDirection: 'row',
        padding: 5,
    },
    icon: {
        width: 33,
        height: 33,
    },
    send: {
        paddingLeft: 5,
    },
    footerView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    description: {
        paddingLeft: 5,
        fontSize: 15,
        color: '#000'
    },
    footerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        paddingLeft: 5,
    },
    like: {
        fontWeight: 'bold',
        marginLeft: 5,

    }

});

export default List;