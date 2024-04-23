
let ak = '4113i3dg734h747d5e463fgh8f55gh42';
const top20Wrapper = document.getElementById("top20Wrapper");
const soonWrapper = document.getElementById("soonWrapper");
const topSeries = document.getElementById("topSeries");
const descrContainer = document.getElementById("descrContainer");
const descr_title = document.getElementById("descr_title");
const descr_Img = document.getElementById("descr_Img");
const descr_descr = document.getElementById("descr_descr");
const btn_close_descrCont = document.getElementById("btn_close_descrCont");
const descr_rating = document.getElementById("rating");
const descr_votes = document.getElementById("votes");
const descr_release = document.getElementById("release");
const descr_lng = document.getElementById("lng");
const desc_genre = document.getElementById("desc_genre");

window.onload = init();

window.showMovieDetails = showMovieDetails;

let movies = [];
let genres = [];
const image_BaseUrl = 'https://image.tmdb.org/t/p/w500/';
const request_upcomming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${ak}&language=de&page=1`
const request_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${ak}&language=de&page=1`
const request_genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${ak}&language=de`
const test_Link = `https://api.themoviedb.org/3/movie/upcoming?api_key=${ak}&language=de&page=1`
const discover = `https://api.themoviedb.org/3/discover/movie?api_key=${ak}&language=de&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=horror&with_watch_monetization_types=flatrate`
const series = `https://api.themoviedb.org/3/discover/tv?api_key=${ak}&language=de&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
const latestSeries = `https://api.themoviedb.org/3/trending/tv/day?api_key=${ak}`

function init() {
    ak = dcrK(ak, 3);
    setTimeout(() => {
        getGenre();
        fetchData(request_popular, top20Wrapper, 'movie');
        fetchData(request_upcomming, soonWrapper, 'movie');
        fetchData(latestSeries, topSeries, 'tv');
    }, 200);
}



class Movie {
    constructor(id, title, descr, poster, voteAverage, voteCount, releaseDate, origlanguage, genreIds, movieId) {
        this.id = id;
        this.title = title;
        this.descr = descr;
        this.poster = poster;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
        this.releaseDate = releaseDate;
        this.origlanguage = origlanguage;
        this.genreIds = genreIds;
        this.movieId = movieId;
    }
}

// Fetch Function
async function fetchData(link, wrapperElem, type) {
    const response = await fetch(link);
    const jsonData = await response.json();

    renderStuff(jsonData, wrapperElem, type)
}




async function getGenre() {
    const response = await fetch(request_genre);
    const jsonData = await response.json();
    genres = jsonData.genres
}



function renderStuff(data, wrapperElem, type) {
    results = data.results;
    for (let i = 0; i < results.length; i++) {
        const uniqeId = randomId();
        const imgLink = image_BaseUrl + results[i].poster_path
        let title = ''
        let startDate = ''

        if (type === 'tv') {
            title = results[i].name
            startDate = results[i].first_air_date
        } else {
            title = results[i].title
            startDate = results[i].release_date
        }

        // New Object
        const mov = new Movie(
            uniqeId,
            title,
            results[i].overview,
            imgLink,
            results[i].vote_average,
            results[i].vote_count,
            startDate,
            results[i].original_language,
            results[i].genre_ids,
            results[i].id,
        )

        movies.push(mov);

        // Karte
        let card = document.createElement('div')
        card.classList.add('movieCard');
        card.setAttribute('id', uniqeId);
        card.setAttribute("onclick", "showMovieDetails(id)");

        // Title
        let titleTag = document.createElement('p')
        titleTag.innerHTML = title;
        //poster_path
        let poster = document.createElement('img')
        poster.src = imgLink
        poster.classList.add('cardPoster')
        //Genre

        //vote_average
        let voteLabel = document.createElement('div')
        voteLabel.innerHTML = parseFloat(results[i].vote_average).toFixed(1);
        voteLabel.classList.add('cardVoteLabel')
        //original_language

        card.appendChild(poster)
        card.appendChild(titleTag)
        card.appendChild(voteLabel)

        wrapperElem.appendChild(card)

    }
}




function showMovieDetails(id) {
    descrContainer.classList.add('active');
    for (let j = 0; j < movies.length; j++) {
        if (id === movies[j].id) {
            descr_title.innerHTML = movies[j].title;
            descr_Img.src = movies[j].poster;
            descr_descr.innerHTML = movies[j].descr;
            descr_rating.innerHTML = `Bewertung: ${parseFloat(movies[j].voteAverage).toFixed(1)} `;
            descr_votes.innerHTML = `Votes: ${movies[j].voteCount}  `;
            const day = splitVal(movies[j].releaseDate, '-', 2);
            const mnt = splitVal(movies[j].releaseDate, '-', 1);
            const yer = splitVal(movies[j].releaseDate, '-', 0);
            const formatted_Relese_Date = `${day}.${mnt}.${yer}`;
            descr_release.innerHTML = `Startdatum: ${formatted_Relese_Date}`;
            descr_lng.innerHTML = `Originale Sprache: ${movies[j].origlanguage}`;
            let genRaw = movies[j].genreIds;

            let genr = '';
            for (let k = 0; k < genRaw.length; k++) {
                genr = genr + transformGenre(genRaw[k]) + ' | '
            }
            desc_genre.innerHTML = genr;
            break;
        }
    }
}

btn_close_descrCont.addEventListener('click', () => {
    descrContainer.classList.remove('active');
})

function randomId() {
    const charArray = ['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'G', 'H', 'I'];
    let id = '';

    for (let i = 0; i < 19; i++) {
        const randomNumber = parseInt(Math.random() * charArray.length);
        id = id + charArray[randomNumber];
    }

    return id;

}

function dcrK(e,n){let t="";for(const f of e){if(f.match(/[a-zA-Z]/)){const o=String.fromCharCode((f.toLowerCase().charCodeAt(0)-"a".charCodeAt(0)-n+26)%26+"a".charCodeAt(0));if(f===f.toUpperCase()){t+=o.toUpperCase()}else{t+=o}}else{t+=f}}return t}

function splitVal(val, marker, pos) {
    const elem = val.split(marker);
    const retVal = elem[pos];
    return retVal;
}

function transformGenre(id) {
    let genreName = '';

    for (let i = 0; i < genres.length; i++) {
        if (id === genres[i].id) {
            genreName = genres[i].name;
            break;
        }
    }

    return genreName;
}


