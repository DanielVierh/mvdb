/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://project-template/./src/scss/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/script.js */ \"./src/js/script.js\");\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_script_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n\n\n\n\n//# sourceURL=webpack://project-template/./src/index.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (() => {

eval("\nlet ak = '4113i3dg734h747d5e463fgh8f55gh42';\nconst top20Wrapper = document.getElementById(\"top20Wrapper\");\nconst soonWrapper = document.getElementById(\"soonWrapper\");\nconst topSeries = document.getElementById(\"topSeries\");\nconst descrContainer = document.getElementById(\"descrContainer\");\nconst descr_title = document.getElementById(\"descr_title\");\nconst descr_Img = document.getElementById(\"descr_Img\");\nconst descr_descr = document.getElementById(\"descr_descr\");\nconst btn_close_descrCont = document.getElementById(\"btn_close_descrCont\");\nconst descr_rating = document.getElementById(\"rating\");\nconst descr_votes = document.getElementById(\"votes\");\nconst descr_release = document.getElementById(\"release\");\nconst descr_lng = document.getElementById(\"lng\");\nconst desc_genre = document.getElementById(\"desc_genre\");\n\nwindow.onload = init();\n\nwindow.showMovieDetails = showMovieDetails;\n\nlet movies = [];\nlet genres = [];\nconst image_BaseUrl = 'https://image.tmdb.org/t/p/w500/';\nconst request_upcomming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${ak}&language=de&page=1`\nconst request_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${ak}&language=de&page=1`\nconst request_genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${ak}&language=de`\nconst test_Link = `https://api.themoviedb.org/3/movie/upcoming?api_key=${ak}&language=de&page=1`\nconst discover = `https://api.themoviedb.org/3/discover/movie?api_key=${ak}&language=de&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=horror&with_watch_monetization_types=flatrate`\nconst series = `https://api.themoviedb.org/3/discover/tv?api_key=${ak}&language=de&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`\nconst latestSeries = `https://api.themoviedb.org/3/trending/tv/day?api_key=${ak}`\n\nfunction init() {\n    ak = dcrK(ak, 3);\n    setTimeout(() => {\n        getGenre();\n        fetchData(request_popular, top20Wrapper, 'movie');\n        fetchData(request_upcomming, soonWrapper, 'movie');\n        fetchData(latestSeries, topSeries, 'tv');\n    }, 200);\n}\n\n\n\nclass Movie {\n    constructor(id, title, descr, poster, voteAverage, voteCount, releaseDate, origlanguage, genreIds, movieId) {\n        this.id = id;\n        this.title = title;\n        this.descr = descr;\n        this.poster = poster;\n        this.voteAverage = voteAverage;\n        this.voteCount = voteCount;\n        this.releaseDate = releaseDate;\n        this.origlanguage = origlanguage;\n        this.genreIds = genreIds;\n        this.movieId = movieId;\n    }\n}\n\n// Fetch Function\nasync function fetchData(link, wrapperElem, type) {\n    const response = await fetch(link);\n    const jsonData = await response.json();\n\n    renderStuff(jsonData, wrapperElem, type)\n}\n\n\n\n\nasync function getGenre() {\n    const response = await fetch(request_genre);\n    const jsonData = await response.json();\n    genres = jsonData.genres\n}\n\n\n\nfunction renderStuff(data, wrapperElem, type) {\n    results = data.results;\n    for (let i = 0; i < results.length; i++) {\n        const uniqeId = randomId();\n        const imgLink = image_BaseUrl + results[i].poster_path\n        let title = ''\n        let startDate = ''\n\n        if (type === 'tv') {\n            title = results[i].name\n            startDate = results[i].first_air_date\n        } else {\n            title = results[i].title\n            startDate = results[i].release_date\n        }\n\n        // New Object\n        const mov = new Movie(\n            uniqeId,\n            title,\n            results[i].overview,\n            imgLink,\n            results[i].vote_average,\n            results[i].vote_count,\n            startDate,\n            results[i].original_language,\n            results[i].genre_ids,\n            results[i].id,\n        )\n\n        movies.push(mov);\n\n        // Karte\n        let card = document.createElement('div')\n        card.classList.add('movieCard');\n        card.setAttribute('id', uniqeId);\n        card.setAttribute(\"onclick\", \"showMovieDetails(id)\");\n\n        // Title\n        let titleTag = document.createElement('p')\n        titleTag.innerHTML = title;\n        //poster_path\n        let poster = document.createElement('img')\n        poster.src = imgLink\n        poster.classList.add('cardPoster')\n        //Genre\n\n        //vote_average\n        let voteLabel = document.createElement('div')\n        voteLabel.innerHTML = parseFloat(results[i].vote_average).toFixed(1);\n        voteLabel.classList.add('cardVoteLabel')\n        //original_language\n\n        card.appendChild(poster)\n        card.appendChild(titleTag)\n        card.appendChild(voteLabel)\n\n        wrapperElem.appendChild(card)\n\n    }\n}\n\n\n\n\nfunction showMovieDetails(id) {\n    descrContainer.classList.add('active');\n    for (let j = 0; j < movies.length; j++) {\n        if (id === movies[j].id) {\n            descr_title.innerHTML = movies[j].title;\n            descr_Img.src = movies[j].poster;\n            descr_descr.innerHTML = movies[j].descr;\n            descr_rating.innerHTML = `Bewertung: ${parseFloat(movies[j].voteAverage).toFixed(1)} `;\n            descr_votes.innerHTML = `Votes: ${movies[j].voteCount}  `;\n            const day = splitVal(movies[j].releaseDate, '-', 2);\n            const mnt = splitVal(movies[j].releaseDate, '-', 1);\n            const yer = splitVal(movies[j].releaseDate, '-', 0);\n            const formatted_Relese_Date = `${day}.${mnt}.${yer}`;\n            descr_release.innerHTML = `Startdatum: ${formatted_Relese_Date}`;\n            descr_lng.innerHTML = `Originale Sprache: ${movies[j].origlanguage}`;\n            let genRaw = movies[j].genreIds;\n\n            let genr = '';\n            for (let k = 0; k < genRaw.length; k++) {\n                genr = genr + transformGenre(genRaw[k]) + ' | '\n            }\n            desc_genre.innerHTML = genr;\n            break;\n        }\n    }\n}\n\nbtn_close_descrCont.addEventListener('click', () => {\n    descrContainer.classList.remove('active');\n})\n\nfunction randomId() {\n    const charArray = ['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'G', 'H', 'I'];\n    let id = '';\n\n    for (let i = 0; i < 19; i++) {\n        const randomNumber = parseInt(Math.random() * charArray.length);\n        id = id + charArray[randomNumber];\n    }\n\n    return id;\n\n}\n\nfunction dcrK(e,n){let t=\"\";for(const f of e){if(f.match(/[a-zA-Z]/)){const o=String.fromCharCode((f.toLowerCase().charCodeAt(0)-\"a\".charCodeAt(0)-n+26)%26+\"a\".charCodeAt(0));if(f===f.toUpperCase()){t+=o.toUpperCase()}else{t+=o}}else{t+=f}}return t}\n\nfunction splitVal(val, marker, pos) {\n    const elem = val.split(marker);\n    const retVal = elem[pos];\n    return retVal;\n}\n\nfunction transformGenre(id) {\n    let genreName = '';\n\n    for (let i = 0; i < genres.length; i++) {\n        if (id === genres[i].id) {\n            genreName = genres[i].name;\n            break;\n        }\n    }\n\n    return genreName;\n}\n\n\n\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;