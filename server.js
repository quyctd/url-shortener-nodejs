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
app.get("/", (req, res) => {
  res.render("index")
})

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port 3000")
})
