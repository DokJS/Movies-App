import React,{useState} from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import FilmItem from './FilmItems';
import { createUrl } from '../Api/TMDBapi';


const Search = () => {
    const [movie, setMovie] = useState([])
    const [input, setInput] = useState('')
    const [isDataLoading, setIsDataLoading] = useState(false)

    
  

    const searchMovie = async () => {
        
        if (input.length > 0) {
            setIsDataLoading(true)
            const requestUrl = createUrl(input,currentPage)
            try {
                const response = await fetch(requestUrl)
                const data = await response.json()
                setIsDataLoading(false)
                // Used for store Data into state
                setMovie(data.results)
                setTotalPage(data.total_pages)
            } catch (error) {
                console.log(error)
            }
        }
    }

    
    const handleSubmit = async ({ nativeEvent }) => {
        if (nativeEvent.text !== "") {
            try {
                await searchMovie()
            } catch (error) {
                console.log(error)
            }
        }
    }

    
    
    return (
        <View style={styles.main_container}>
            <TextInput placeholder='Entrer le titre du film' style={styles.text_input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={handleSubmit}
                value={input} />
            <Button title='Rechercher' onPress={searchMovie} />
            {
                isDataLoading ? <View style={styles.loading_container}>
                    <ActivityIndicator size={'large'} color={'blue'} />
                </View>
                    : <FlatList
                        data={movie}
                        keyExtractor={(item) => (item.id+item.title).toString()}
                        renderItem={({ item }) => <FilmItem movie={item} />}
                        onEndReachedThreshold={2}
                        onEndReached={()=>{}}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop:50
    },
    text_input: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft:5
    },
    loading_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 100,
        right: 0,
        left:0
    }
})

export default Search;