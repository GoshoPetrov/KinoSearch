
const API_KEY = "88870ad0";

const favorites = [{
    "Title": "Alien",
    "Year": "1979",
    "imdbID": "tt0078748",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2NhMDk2MmEtZDQzOC00MmY5LThhYzAtMDdjZGFjOGZjMjdjXkEyXkFqcGc@._V1_SX300.jpg"
  },{
    "Title": "Alien: Covenant",
    "Year": "2017",
    "imdbID": "tt2316204",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjhiYWQ4MTAtOGY1Zi00ZjcyLTk1ZDYtODI3ODRhNjE4MzZhXkEyXkFqcGc@._V1_SX300.jpg"
  }];


async function handleSearch() {

    const searchTerm = document.getElementById('searchTerm').value;

    // fetch(`http://www.omdbapi.com/?t=${searchTerm}&apikey=88870ad0`)
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    //     })
    //     .catch(error => {
    //         document.getElementById('output').textContent = 'Error: ' + error;
    //     });

    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
        const data = await response.json();
        document.getElementById('output').innerHTML = displaySearchResults(data);
    } catch (error) {
        document.getElementById('output').textContent = 'Error: ' + error;

    }

}

function displaySearchResults(movies) {
    const totalResults = movies.totalResults;

    let result = ``;
    let i = 0;
    for (const movie of movies.Search) {
        result += displayMovieSearchResult(movie);
    }
    
    return result;
}

function removeFromFavorites(imdbID) {
    const index = favorites.findIndex(movie => movie.imdbID === imdbID);
    if (index !== -1) {
        favorites.splice(index, 1);
    }
    displayFavorites();
    saveFavorites();
}

function addToFavorites(imdbID) {
    const inFavorites = favorites.some(fav => fav.imdbID === imdbID);
    if (inFavorites) return;
    const movie = movieById[imdbID];
    favorites.push(movie);
    displayFavorites();
    saveFavorites();
}

const movieById = {};

function displayMovieDetails(movie) {
    return `
    <h2>${movie.Title}</h2>
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Rated:</strong> ${movie.Rated}</p>
    <p><strong>Released:</strong> ${movie.Released}</p>
    <p><strong>Runtime:</strong> ${movie.Runtime}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Writer:</strong> ${movie.Writer}</p>
    <img src="http://img.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}" alt="${movie.Title}" style="width: 200px; height: auto;">`
}

function displayFavorites() {
    let result = ``;
    for (const movie of favorites) {
        result += displayMovieFavorite(movie);
    }
    document.getElementById('favorites').innerHTML = result;
}


function displayMovieFavorite(movie) {
    return `
    <div class="movie-card">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div class="movie-info">
            <div class="movie-title">${movie.Title}</div>
            <div class="movie-year">${movie.Year}</div>
            <button onclick="removeFromFavorites('${movie.imdbID}')">Remove</button>
        </div>
    </div>`;
}

function displayMovieSearchResult(movie) {
    movieById[movie.imdbID] = movie;
    const inFavorites = favorites.some(fav => fav.imdbID === movie.imdbID);
    const actionButton = inFavorites
        ? `<div class="already-fav">Already in Favorites</div>`
        : `<button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>`;

    return `
    <div class="movie-card">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div class="movie-info">
            <div class="movie-title">${movie.Title}</div>
            <div class="movie-year">${movie.Year}</div>
            ${actionButton}
        </div>
    </div>`;
}

function loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    favorites.splice(0, favorites.length); // Clear the current favorites array
    if (storedFavorites) {
        favorites.push(...JSON.parse(storedFavorites));
    }
}

function saveFavorites() {
    console.log('Saving favorites to localStorage:', favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Promise

loadFavorites();
displayFavorites();
