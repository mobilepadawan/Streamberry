import { apiKey, language, URI, URISeriesCat, URIMoviesCat } from './js/tmdbapi.js'
const catalog = []
const categories = []
const promotingContent = []
const container = document.querySelector('.container')
const containerCat = document.querySelector('.genres')
const pages = document.querySelectorAll('div.genres span')
const searchButton = document.querySelector('#searchButton')
const inputSearch = document.querySelector('input[type=search]')
let index = 0

searchButton.addEventListener('click', ()=> {
    document.querySelector('div.search-box').classList.add('search-box-active')
    setTimeout(()=> inputSearch.focus(), 1000)
})

inputSearch.addEventListener('blur', ()=> {
    document.querySelector('div.search-box').classList.remove('search-box-active')
})

const getCategories = async ()=> {
    const APIURL = `${URIMoviesCat}`
    fetch(APIURL)
    .then(response => response.json())
    .then(data => categories.push(...data.genres))
    .then(()=> loadCategories(catalog))
}

const loadCategories = ()=> {
    let contentToShow = ''
    if (categories.length > 0) {
        categories.forEach(cate => contentToShow += `<span id="${cate.id}">${cate.name}</span>`)
        containerCat.innerHTML = contentToShow
    }
}

const buildContentPromoted = ()=> {
    for (let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random() * 20)
        console.log(randomNumber)
        console.log(`https://image.tmdb.org/t/p/w1280${catalog[randomNumber].backdrop_path}`)
        const ContentToAdd = {
            backdrop: `https://image.tmdb.org/t/p/w1280${catalog[randomNumber].backdrop_path}`,
            title: catalog[randomNumber].title,
            overview: catalog[randomNumber].overview
        }
        promotingContent.push(ContentToAdd)
    }
    console.table(promotingContent)
}

setInterval(() => {
    showContentPromoted()
}, 20000);

const showContentPromoted = ()=> {
    if (index === 5) {
        index = 0
    } else {
        ++index
    }
    document.querySelector('div.promoting img').src = promotingContent[index].backdrop
    document.querySelector('div.promoting h3').textContent = promotingContent[index].title
    document.querySelector('div.promoting p').textContent = promotingContent[index].overview
}

const getMovies = async (page)=> {
    const APIURL = `${URI}?api_key=${apiKey}&language=${language}&page=${page}`
    fetch(APIURL)
    .then(response => response.json())
    .then(data => {
        catalog.length = 0
        catalog.push(...data.results)
    })
    .then(()=> loadMovies(catalog))
    .then(()=> setClickInCovers())
    .then(()=> buildContentPromoted())
    .then(()=> showContentPromoted())
}
getMovies(1)

const setClickInCovers = ()=> {    
    const allCovers = document.querySelectorAll('img.card-movie-img')
   if (allCovers.length > 0) {
        allCovers.forEach(cover => {
            cover.addEventListener('click', ()=> {
                showMovieDetails(cover.id)
            })
        })
    }
}

const getActors = async (movieId)=> {
    const casting = []
    let reparto = ''
    const APIURL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    return fetch(APIURL)
    .then(response => response.json())
    .then(data => {
        casting.push(...data.cast)
        for (let actor of casting)
            reparto += `<p>${actor.name} como ${actor.character}</p>`
    })
    .then(()=> reparto)
}

const getVideos = async (movieId)=> {
    let videoSelected = ''
    const APIURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    return fetch(APIURL)
    .then(response => response.json())
    .then(data => {
        console.table(data.results)
        const videoSelected = data.results.find(video => video.name.includes('Official' || 'Oficial'))
        if (videoSelected) {
            return videoSelected
        }
    })
    .then(()=> `https://www.youtube.com/watch/${videoSelected}`)
}

const returnStars = (number)=> {
    let starsToReturn = ''
    for (let i = 1; i <= parseInt(number); i++) {
        starsToReturn += '⭐️'
    }
    return starsToReturn
}

const showMovieDetails = async (movieId)=> {
    // getVideos(movieId)
    const movieSelected = catalog.find((catalog)=> catalog.id === parseInt(movieId))
    if (movieSelected) {
        document.querySelector('img#movieBackdrop').src = `https://image.tmdb.org/t/p/w1280${movieSelected.backdrop_path}`
        document.querySelector('h2#titleDetail').textContent = movieSelected.title
        document.querySelector('h2.close-btn').addEventListener('click', ()=> {
            movieDialog.close()
            document.querySelector('img#movieBackdrop').src = ""
            document.querySelector('h2#titleDetail').textContent = ""
            document.querySelector('p#sinopsisDetail').textContent = `N / A`
            document.querySelector('span#showStars').textContent = ""
            document.querySelector('p#reparto').textContent = ''
            document.body.style.overflow = ''
        })
        document.querySelector('p#sinopsisDetail').textContent = movieSelected.overview || `N / A`
        document.querySelector('span#showStars').textContent = returnStars(movieSelected.vote_average)
        document.querySelector('span#showStars').title = `${movieSelected.vote_average} / 10`
        document.querySelector('p#reparto').innerHTML =  await getActors(movieId)
        const movieDialog = document.querySelector('dialog')
        setTimeout(() => {
            movieDialog.showModal()
            movieDialog.scrollTo({ top: 0})
            document.body.style.overflow = 'hidden'
            const detalleTitulo = document.querySelector('h2#titleDetail')
            const catalogoCerrar = document.querySelector('h2.close-btn')
            const imagenCatalogo = document.querySelector('img#movieBackdrop')
            movieDialog.addEventListener('scroll', () => {
                if (detalleTitulo.clientHeight >= 90 && (detalleTitulo.scrollTop - movieDialog.scrollTop <= -140)) {
                    detalleTitulo.classList.add('dialog-hidden')
                    catalogoCerrar.classList.add('dialog-hidden')
            } else if (detalleTitulo.clientHeight <= 90 && (detalleTitulo.scrollTop - movieDialog.scrollTop <= -200)){
                    detalleTitulo.classList.add('dialog-hidden')
                    catalogoCerrar.classList.add('dialog-hidden')
                } else {
                    detalleTitulo.classList.remove('dialog-hidden')
                    catalogoCerrar.classList.remove('dialog-hidden')
                }
            })
        }, 200)
    }
}

if (pages.length > 0) {
    pages.forEach(page => {
        page.addEventListener('click', ()=> getMovies(page.textContent))
    })
}

const loadMovies = (catalog)=> {
    let contentToShow = ''
        if (catalog.length > 0) {
            catalog.forEach(content => contentToShow += returnContentCard(content) )
            container.innerHTML = contentToShow
        }
}

const loadMainCover = ()=> {
    return `<div class="header">
                <h1 class="logo">STREAMBERRYFLIX</h1>
            </div>`
}

const returnContentCard = (content)=> {
    const posterURL = `https://image.tmdb.org/t/p/w185/${content.poster_path}`
    return `<div class="card-movie">
                <div>
                    <img loading="lazy" class="card-movie-img" src="${posterURL}" title="${content.title}" id="${content.id}">
                </div>
                <div class="card-movie-title">
                    <p>${content.title}</p>
                </div>
            </div>`
}