import React,{useState,useEffect} from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import FilmItem from './FilmItems';
import { createUrl } from '../Api/TMDBapi';


const Search = () => {
    const [movie, setMovie] = useState([])
    const [input, setInput] = useState('')
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [totalPage,setTotalPage] = useState(0)

    // Used for remove double item in response
    const removeDoubleMovie = arr =>{
        return arr.reduce( (acc,current)=>{
            return acc.includes(current) ? acc 
            : [...acc,current]
        },[])
    }

   
  
    // Used for triggers the API call when search button is pressed
    const searchMovie = async () => {
        if (input.length > 0) {
            setIsDataLoading(true)
            const requestUrl = createUrl(input,page)
            try {
                const response = await fetch(requestUrl)
                const data = await response.json()
                setIsDataLoading(false)
                // Used for store Data into state
                setMovie(data.results)
                // and assign values to page & totalPage
                setPage(data.page)
                setTotalPage(data.total_pages)
            } catch (error) {
                console.log(error)
            }
        }
    }



    // Used for triggers the API call when Enter key is pressed
    const handleSubmit = async ({ nativeEvent }) => {
        if (nativeEvent.text !== "") {
            try {
                await searchMovie()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const loadMoreMovie = ()=>{
        if(page < totalPage){
            setPage( (page) => page + 1)
        }
    }
    // Used for load other movies when scroll limit is reached
    useEffect(()=>{
        if(page > 1){
            const newRequestUrl = createUrl(input,page)
            fetch(newRequestUrl)
            .then( response => response.json())
            .then( data=>{
                const newResult = [...movie,...data.results]
                // Used for remove double item newResult
                setMovie(removeDoubleMovie(newResult))
            })
            .catch(error=>{
                console.log(error)
            })
        }
    },[page])
    console.log(movie)

    // Used for reset states values before new research
    useEffect(()=>{
        if( input.length === 0 && totalPage!== 0){
             setPage(1)
            setTotalPage(0)
            setMovie([])
        }
    },[input])
 
    
    
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
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <FilmItem movie={item} />}
                       onEndReachedThreshold={4}
                       onEndReached={loadMoreMovie}
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