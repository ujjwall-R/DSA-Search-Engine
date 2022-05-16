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

var search_result = tf_idf.rankDocumentsByQuery(
  "You have to pick first character of string from row 1, second character from row 2 and so on. The (N+1)th character of string is to be picked from row 1, that is, you can traverse the rows in a cyclic manner (row 1 comes after row N). If an occurrence of a character is picked from a row, you cannot pick the same occurrence again from that row.You have to print"
);
const slicedArray = search_result.slice(0, 1);

console.log(slicedArray);
console.log(fileNames[90]);
