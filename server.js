const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.get("/", (req, res) => {
  res.render("index")
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port 3000")
})
