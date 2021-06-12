//API KEY
const API_KEY= 'f68ee6d315bfa8af35632d7d3617b528';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=f68ee6d315bfa8af35632d7d3617b528';
const imageUrl = 'https://image.tmdb.org/t/p/w500';
var page= 1;

const showMeMoreBtn = document.getElementById('showMoreBtn');

function createUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=f68ee6d315bfa8af35632d7d3617b528&page=${page}`;
    return url;
}

function getMovieSelection (url, Done, Error) {
    fetch(url)
       .then((res) => res.json())
       .then(Done)
       .catch(Error);
}

function search(value) {
    const path = '/search/movie';
    const url = createUrl(path) + '&query=' + value; 

    getMovieSelection(url, renderSearch, errorHandling);
}

function getNowPlaying() {
    const path = '/movie/now_playing';
    const url = createUrl(path);

    const get = renderTheMovies.bind({title: 'Now Playing'})
    getMovieSelection(url, get, errorHandling);
    
    showMeMoreBtn.classList.remove('hidden');
}

function getTopRated() {
    const path = '/movie/top_rated';
    const url = createUrl(path);

    const get = renderTheMovies.bind({title: 'Now Playing'})
    getMovieSelection(url, get, errorHandling);
    showMeMoreBtn.classList.remove('hidden');
}


    
