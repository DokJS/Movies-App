import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

// Used for reduce the overview's char number 
const reduceOverview = (text) => {
    return `${text.slice(0,150)}...`
}

// Used for generates image's uri
const concatUri = (lastPart) => {
    return `https://image.tmdb.org/t/p/w500${lastPart}`
}

const FilmItem = (props) => {
    const { movie } = props
    const {title,overview,release_date:date,vote_average:vote,poster_path:path} = movie
    
    return (
        <View style={styles.movie_container}>
            <Image style={styles.movie_img}
                source={{uri:concatUri(path)}} />
            <View style={styles.movie_content}>
                <View style={[styles.movie_top]}>
                    <Text style={styles.movie_title}>{title}</Text>
                    <Text style={styles.movie_vote}>{vote}</Text>
                </View>
                <View style={styles.movie_description}>
                    <Text numberOflines={4} style={{color:'gray',fontSize:14,fontStyle:'italic'}}>
                        {reduceOverview(overview)}
                    </Text>
                </View>
                <View><Text style={{textAlign:'right'}}>Sorti le {date}</Text></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    movie_container: {
        height: 190,
        marginBottom: 10,
        paddingTop: 10,
        paddingRight: 6,
        paddingBottom: 10,
        paddingLeft:6,
        display: 'flex',
        flexDirection: 'row',
        flex:1
    },
    movie_img: {
        flex: 1,
    },
      movie_content: {
        flex: 2,
        marginLeft:8
    },
    movie_top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between'
      },
        movie_title: {
            fontWeight: 'bold',
            fontSize: 16,
            maxWidth:200
    },
    movie_vote: {
        fontWeight: 'bold',
        fontSize:18
    },
    movie_description: {
        marginTop: 2,
    }
})

export default FilmItem;