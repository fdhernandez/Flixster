

//Elements from DOM
const btnElement = document.querySelector('#search');
const moreBtnElement = document.querySelector('#showMoreBtn');
const inputElement = document.querySelector('#inputValue');
const searchMovies = document.querySelector('#searchable-movies');
const moviesContainer = document.querySelector('#movieContainer');


function errorHandling(error) {
    console.log('Error:', error);
}

/* creating space for the movies to show*/
function createMovieCont(movies, title = ''){
    const movieEl = document.createElement('div');
    movieEl.setAttribute('class', 'movie');
   
    const movieTemplate = `         
        <h2> ${title} </h2>
        <div class="gallery"> 
            <section class= "section">  
                ${movies.map((movie) => {
                    return `
                        <img src= ${imageUrl + movie.poster_path}  alt= ${movie.original_title}
                            data-movie-id= ${movie.id} />   
                        <h3>${movie.original_title} ❤️ ${movie.vote_average} </h3> 
                                
                    `;
                    
                })}
            
            </section>
        
            <div class = "movieContent">
                <p id ="cClose">❌</p> 
                
            </div>
        </div>
    `;
    movieEl.innerHTML = movieTemplate;
    return movieEl; 
}



function renderSearch(data) {
    searchMovies.innerHTML= ''; //removing the past searched movies from display
    const movies = data.results;
    const mBlock = createMovieCont(movies); //get the value from movie/page
    searchMovies.appendChild(mBlock);
    console.log( 'Data: ', data);
}

function renderTheMovies(data) {
    const movies = data.results;
    const mBlock = createMovieCont(movies, this.title); //get the value from movie/page
    moviesContainer.appendChild(mBlock);
}

btnElement.onclick = function(event){
    event.preventDefault();
    const value = inputElement.value;
    search(value);

    inputElement.value = ''; // removing the previous value from search
    console.log('Value:', value);
    
}


function generateIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height= 315;
    iframe.allowFullscreen = true;
    return iframe;
}

function videoTemplate(data, movieContent) { //display for the trailer
    movieContent.innerHTML ='<p id="cClose">❌</p>';
    console.log('video:',data);
    const videos = data.results;
    const length = videos.length > 3 ? 3 : videos.length; //show  a max of 3 trailers
    const iframeCont = document.createElement('div');

    for(let i=0; i < length; i++) {
        const video = videos[i];
        const iframe = generateIframe(video); //return an iframe
        iframeCont.appendChild(iframe);
        movieContent.appendChild(iframeCont);
    }
}

/* opening up the movie content once clicked and closing it */
document.onclick = function (event) { //listening to the entire page
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img'){
        console.log('hello world');
        const movieId = target.dataset.movieId;
        console.log('movieid: ', movieId);

        const section = event.target.parentElement; //targeting section 
        const movieContent = section.nextElementSibling;  // targeting movie content
        movieContent.classList.add('movieContent-display');

        const path = `/movie/${movieId}/videos`; //new path to get the movie trailer
        const url = createUrl(path); 
        /*getting the movie trailer */
        fetch(url)
            .then((res) => res.json())
            .then((data) => videoTemplate(data, movieContent)) 
            .catch((error) => {
                console.log( 'Error: ', error);
       });

    }
    if (target.id === 'cClose') {
        const movieContent = target.parentElement;
        movieContent.classList.remove('movieContent-display');

    }
}

showMeMoreBtn.onclick = function(event) {
    page++;
    event.preventDefault();
    const path = '/movie/now_playing';
    const url = createUrl(path);

    const get = renderTheMovies.bind({title: 'Now Playing'})
    getMovieSelection(url, get, errorHandling);
    
}

mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
    document.documentElement.scrollTop =0;
}

getNowPlaying();

getNowPlayingRow();
getUpcoming();
