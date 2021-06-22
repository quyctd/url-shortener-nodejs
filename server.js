const express = require("express")
const mongoose = require("mongoose")
const ShortUrl = require("./models/shortUrl")
const app = express()

mongoose.connect("mongodb://localhost:27017/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
  const urls = await ShortUrl.find()
  res.render("index", { shortUrls: urls })
})

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect("/")
})

app.get("/:shortUrl", async (req, res) => {
  const url = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (url) {
    url.clicks += 1
    url.save()
    res.redirect(url.full)
  } else {
    res.sendStatus(404)
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port 3000")
})
