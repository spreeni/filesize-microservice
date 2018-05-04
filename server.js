const express = require('express')
const app = express()
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({storage: storage, limits: {fileSize: 30000000}})

app.use(express.static('public'))

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.post("/filesize", upload.single('fileToUpload'), (req, res) => {
  //var fileInput = req.file
  //fileInput.buffer.data = "For time reasons the data isn't logged."
  var fileInput = {fieldname: req.file.fieldname,"originalname": req.file.originalname,"encoding": req.file.encoding,"mimetype":req.file.mimetype,"buffer":{"type":req.file.buffer.type,"data":"For time reasons the data isn't logged."},"size":req.file.size}
  console.log('body: ' + JSON.stringify(req.body))
  console.log('file: ' + JSON.stringify(fileInput))
  res.send({size: req.file.size})
})

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

