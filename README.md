# Streamberry
A personal Streaming like WebApp using The Movie DB API.

# Intro

After **12 years as a customer of the Netflix streaming service**, I decided to take the risk and start my own streaming service. And there is the result of that: [Streamberryflix](https://mobilepadawan.github.io/Streamberry/).

I digged into [The MovieDB API](https://themoviedb.org/) and I found a !easy API to get movies and series content and with the half of way roaded I start to code my own project: the Result: Streamberryflix.

## CSS is a pain
I always suffered CSS or I should say "I always suffered the graphic design". Curiosily I became good in programming logic but the design way is not my favourite. Instead of that, I'd tried to do my best and you can appreciate the results of it: Streamberryflix.

This !streaming-service was inspired in the Netflix platform and, of course, in the sixth season of Black Mirror.

## Talk to seriously

Of course it is a joke. I can't build my own streaming project, still taking advantage of the pirate market (I really do not like). I just coded to understand The Movie DB API and to practice CSS.

Most of the Vanilla JS code was built w/o not the good practices. I hope the next months I will rolling up again to improve it and structure it well.

I hope you like my project. It is not finished but you can profit of it to understand part of the 'Behind the scenes' of the most popular streaming platform.

# The Project
Take a tour about the minimal functions of this project I built in.

## Main Carrousel
I built a carrousel header using the `Math.random()` JavaScript method to iterate over the Catalog Object Array to select randomly 5 popular movies. I took the backdrop path image, title and overview to build a sort of carrousel using `setInterval()` function over another array.

## Movies catalog
I `fetch()` the Popular movie catalog of The MovieDB API. This API send you 20 movies per page.
You should use the base URI and a previous registration to get the token for querying the MovieDB API. Into the URL you are fetching, you can send some parameters like `language`, `page` and, of course, the ÀPI_KEY`.

```javascript
const APIURL = `${URI}?api_key=${apiKey}&language=${language}&page=${page}`
fetch(APIURL)
.then(response => response.json())
.then(data => {
    catalog.length = 0
    catalog.push(...data.results)
})
```
