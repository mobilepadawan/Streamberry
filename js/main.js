import { apiKey, language, URISeriesCat, URIMoviesCat } from './apiconnect.js'
const catalog = []
const promotingContent = []
const container = document.querySelector('.container')
const searchBox = document.querySelector('.search-box')
let counter = 1
let index = 0

// SEARCH BOX CONTROL
const searcBox = document.querySelector('div.search-box')
const inputSearch = document.querySelector('input#inputSearch')

searchButton.addEventListener('click', ()=> {
    inputSearch.value = ''
    inputSearch.focus()
    setTimeout(() => searchBox.classList.replace('search-box-closed', 'search-box-active'), 200)
    window.innerWidth <= 580 && document.querySelector('.header-title').classList.add('hide')
})

inputSearch.addEventListener('blur', ()=> {
    searcBox.classList.replace('search-box-active', 'search-box-closed')
    setTimeout(() => window.innerWidth <= 580 && document.querySelector('.header-title').classList.remove('hide'), 500);
})

// MOVIES AND SERIES CATALOG
const getMovies = async (URI, page)=> {
    const APIURL = `${URI}&page=${page}`
    fetch(APIURL)
    .then(response => response.json())
    .then(data => {
        catalog.length = 0
        catalog.push(...data.results)
    })
    .then(()=> buildContentPromoted())
    .then(()=> showContentPromoted())
    .then(()=> loadMovies(catalog))
    .then(()=> counter++)
    .then(()=> {const divMore = document.querySelector('div#divMore')})
    .then(()=> divMore.addEventListener('click', ()=> {
        getMovies(URIMoviesCat, counter)
    }))
}
getMovies(URIMoviesCat, counter)
console.log('Valor de counter: ', counter)

const buildContentPromoted = ()=> {
    for (let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random() * 20)
        const ContentToAdd = {
            backdrop: `https://image.tmdb.org/t/p/w1280${catalog[randomNumber].backdrop_path}`,
            title: catalog[randomNumber].title,
            overview: catalog[randomNumber].overview
        }
        promotingContent.push(ContentToAdd)
    }
    console.table(promotingContent)
}

const loadMovies = (catalog)=> {
    document.querySelector('.loader-animation') && document.querySelector('.loader-animation').remove()
    document.querySelector('div#divMore')  &&  document.querySelector('div#divMore').remove()
    let contentToShow = ''
        if (catalog.length > 0) {
            catalog.forEach(content => contentToShow += returnContentCard(content) )
            container.innerHTML += contentToShow
            container.innerHTML += returnMoreContentCard()
        }
}

const returnMoreContentCard = ()=> {
    return `<div class="card-content" title="Cargar más..." id="divMore">
                <h3>+</h3>
            </div>`
}

const returnContentCard = (content)=> {
    const posterURL = `https://image.tmdb.org/t/p/w185/${content.poster_path}`
    return `<div class="card-movie">
                <div>
                    <img loading="lazy" class="card-movie-img" src="${posterURL}" 
                         title="${content.title}" id="${content.id}" alt="${content.original_title}" >
                </div>
                <div class="card-movie-title">
                    <p>${content.title}</p>
                </div>
            </div>`
}

const showContentPromoted = ()=> {
    index === 5 ? index = 0 : ++index
    document.querySelector('content-promoted, img').src = promotingContent[index].backdrop
    document.querySelector('content-promoted, img').alt = promotingContent[index].title
    document.querySelector('content-promoted, h2').textContent = promotingContent[index].title
    if (window.innerWidth <= '360') {
        document.querySelector('content-promoted, p').textContent = promotingContent[index].overview.toString().slice(0, 200).concat("...")
    } else {
        document.querySelector('content-promoted, p').textContent = promotingContent[index].overview.toString()
    }
}

setInterval(() => {
    showContentPromoted()
}, 20000)