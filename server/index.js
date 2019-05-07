const express = require('express')
const fs = require('fs')
const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, 'latestFile.txt')
    }
  })
})

const app = express()

app.post('/api/process_text', upload.single('textfile'), (req, res) => {
  fs.readFile('uploads/latestFile.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Oops! something went wrong :/')
    }

    let originalText = data.toString()

    // convert string to array
    let contentsArray = originalText
      .replace(/\n|\r|\s{2,}/g, ' ')
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
      .trim()
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 0)

    // convert array to word Map
    // and keep track of most frequent words
    const wordMap = {}
    let topCount = 0
    let topWord = ''

    for (let word of contentsArray) {
      if (wordMap[word]) {
        wordMap[word]++
      } else {
        wordMap[word] = 1
      }
    }

    // create a helper array
    // consisting of objects, each word with the corresponding count
    const wordList = []

    for (let word in wordMap) {
      wordList.push({ word, count: wordMap[word] })
      if (wordMap[word] > topCount) {
        topCount = wordMap[word]
        topWord = word
      }
    }

    // create an array of words with the same (top) occurance / count
    const topWords = wordList.filter(word => word.count === topCount)

    // "foo-barify" the top words
    let fooBarText = originalText

    topWords.map(({ word }) => {
      fooBarText = fooBarText.replace(
        new RegExp('\\b' + word + '\\b', 'gi'),
        match => 'foo' + match + 'bar'
      )
    })

    res.send(fooBarText)
  })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
