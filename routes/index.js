import { Router } from 'express'
import { Quote } from '../models/quote.js'


const router = Router()


router.get('/', function (req, res) {
  let imgPath = `/images/bg/${Math.floor(Math.random() * 7 + 1)}.jpeg`
  let weatherData
  let weatherURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API}&q=auto:ip`
  fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      weatherData = data
    })
    .then(() => {
      Quote.find({})
        .then(quotes => {
          const quote = quotes[Math.floor(Math.random() * quotes.length)]
          res.render('index', { title: 'Home Page', quote, weatherData, imgPath })
        })
    })
})

export {
  router
}
