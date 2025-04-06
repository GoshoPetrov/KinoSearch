
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
}

function addToFavorites(imdbID) {
    const inFavorites = favorites.some(fav => fav.imdbID === imdbID);
    if (inFavorites) return;
    const movie = movieById[imdbID];
    favorites.push(movie);
    displayFavorites();
}

const movieById = {};

function displayMovieFavorite(movie) {
    return `
    <h2>${movie.Title}</h2>
    <button onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Type:</strong> ${movie.Type}</p>
    <p><strong>Writer:</strong> ${movie.Writer}</p>
    <img src="${movie.Poster}" alt="${movie.Title}" style="width: 200px; height: auto;">`
}

function displayMovieSearchResult(movie) {
    movieById[movie.imdbID] = movie;
    const inFavorites = favorites.some(fav => fav.imdbID === movie.imdbID);

    let addToFavoritesButton = `<button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>`;
    if (inFavorites) {
        addToFavoritesButton = `Already in Favorites`;
    }

    return `
    <h2>${movie.Title}</h2>
    ${addToFavoritesButton}
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Type:</strong> ${movie.Type}</p>
    <p><strong>Writer:</strong> ${movie.Writer}</p>
    <img src="${movie.Poster}" alt="${movie.Title}" style="width: 200px; height: auto;">`
}

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

// Promise


displayFavorites();
