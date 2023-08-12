# Streamberry
A personal sort of Streaming WebApp using The Movie DB API.

# Intro

After **12 years as a customer of the Netflix streaming service**, I decided to take the risk and start my own streaming service. And there is the result of that: [Streamberryflix](https://mobilepadawan.github.io/Streamberry/).

I digged into [The MovieDB API](https://themoviedb.org/) and I found a !easy API to get movies and series content and with the half of way roaded I start to code my own project. The Result was named: **Streamberryflix** (😱 *as seen on streaming!*).

## CSS is a pain in the 🍑
I always suffered CSS or maybe I should say *"I always suffered the graphic design"*. Curiosly I became good in programming logic but the design stuff is not my s#it. Instead of that, I'd tried to do my best and you can appreciate the results of it: Streamberryflix.

This !streaming-service was inspired in the Netflix platform❤️ and, of course, in the season six of Black Mirror🖤.

## Talk to seriously

Of course it is a joke. I can't build my own streaming project, still taking advantage of the pirate market (I really do not like). I just coded to understand The Movie DB API and to practice CSS.

Most of the **Vanilla JS** code was built w/o not the best practices. I hope in the coming months I will rolling up again to improve it and structure it well.

I hope you like my project. It is not finished but you can profit of it to understand part of the 'Behind the scenes' of the most popular streaming platform.

# The Project
Take a tour about the minimal functions of this project I built in.

## Main Carrousel
I built a carrousel header using the `Math.random()` JavaScript method to iterate over the Catalog Object Array to select randomly 5 popular movies.

```javascript
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
```

I took the `backdrop_path` image, title and overview to build a sort of carrousel using `setInterval()` function over another array. Some ternary operator to reduce a little bit the coding logic.

```javascript
const showContentPromoted = ()=> {
    index === 5 ? index = 0 : ++index
    document.querySelector('div.promoting img').src = promotingContent[index].backdrop
    document.querySelector('div.promoting h3').textContent = promotingContent[index].title
    document.querySelector('div.promoting p').textContent = promotingContent[index].overview
}

setInterval(() => {
    showContentPromoted()
}, 20000)
```

Every 20 seconds I rotate the main content promotioning most popular movies.

## Movies catalog
I `fetch()` the Popular movie catalog of The MovieDB API. This API send you 20 movies per page.
You should use the base URI and a previous registration to get the token for querying the MovieDB API. Into the URL you are fetching, you can send some parameters like `language`, `page` and, of course, the `API_KEY`.

```javascript
const APIURL = `${URI}?api_key=${apiKey}&language=${language}&page=${page}`
fetch(APIURL)
.then(response => response.json())
.then(data => {
    catalog.length = 0
    catalog.push(...data.results)
})
```
The platform send you a `data.results`and you can save it in a local Array of objects. After you can iterate and build the movie cards.

To get the movie's detail you can save the data **fetched** of the main array and to list the characters of a movie, you should query another API URI.

In addition to this, you can take advantage of many other APIs to rich the content to show. I didn't digg deeply this API. But with one or two API URI's you can build an intereseting project similar to this: [Streamberryflix](https://mobilepadawan.github.io/Streamberry/).

Another credits to highlight is the movie icon, rescued of [FlatIcon](https://www.flaticon.com/).

## Web Browser Compatibility
I tested the project in **Chrome** and **Edge**. Of course in **Safari** but I don't have the last version of it with all the improvements in CSS and JS, and because of that the UI resultant is awful (yes, as Jane does! 😂).

I think I'll update my MacOS system in the coming months and I'll improve the CSS code for Safari compatibility.

I want to make another sprint of code over the Mobile First improvements to support effectively toe mobile and tablet ecosystems.

Thanks for reading me. Best regards and take a copy of this code to profit it!
