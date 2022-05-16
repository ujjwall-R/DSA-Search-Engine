const express = require("express");

const router = new express.Router();

TfIdf = require("tf-idf-search");
tf_idf = new TfIdf();
const fs = require("fs");
const ProblemDirectory = "../DataSet/Problems/";
let fileNames = fs.readdirSync(ProblemDirectory);
fileNames.map((file, i) => {
  fileNames[i] = `./${ProblemDirectory}${file}`;
});
//initialize corpus from an array of file paths, returns the current state of the corpus
var corpus = tf_idf.createCorpusFromPathArray(fileNames);
// console.log(corpus);
//@description:testing
router.get("/hi", async (req, res) => {
  try {
    res.send("Route working.");
  } catch (error) {
    res.status(400).send();
  }
});

//@description:search a text
//public
//
router.get("/search/text", async (req, res) => {
  try {
    const text = req.body.text;
    let search_result = await tf_idf.rankDocumentsByQuery(text);
    search_result = search_result.slice(0, 5);

    let questionsFound = [];
    search_result.forEach((element, i) => {
      questionsFound[i] = fileNames[element.index];
    });
    res.send(questionsFound);
  } catch (error) {}
});

module.exports = router;
