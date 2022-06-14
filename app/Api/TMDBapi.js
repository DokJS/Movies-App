
const API_TOKEN = "9cfe9ab646fb12072c3c1ca898244676";
// Used to generate request's url in relation of film's name supplied as input 
const formatFilmName = filmName => {
    return filmName.split(" ").length > 1 ? filmName.split(" ").join('+')
        : filmName
}
export const createUrl = (filmName,page) => {
    const formatedFilmName = formatFilmName(filmName)
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&query=${formatedFilmName}&language=fr&page=${page}`
}
