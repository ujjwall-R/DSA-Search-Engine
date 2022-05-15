const fs = require("fs");
const keyword_extractor = require("keyword-extractor");
const { normalize } = require("path");
var path = require("path");
var process = require("process");

const ProblemDirectory = "../DataSet/Problems/";

// Loop through all the files in the temp directory and store every problem statement in a all.txt file
function readFiles(dirname) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      // onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, "utf-8", function (err, content) {
        if (err) {
          // onError(err);
          return;
        }
        fs.appendFile("all.txt", content, function (err) {
          if (err) throw err;
        });
      });
    });
  });
}

const totalNoOfDoc = fs.readdirSync(ProblemDirectory).length;

const sentence = fs.readFileSync("./all.txt", "utf-8").toLowerCase();

const keywordArrayOfAll = keyword_extractor
  .extract(sentence, {
    //total keywords array
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  })
  .sort();
console.log(keywordArrayOfAll);

//making of ITF matrix
//no. of columns=length of keywordArrayOfAll
//no. of rows= no. of documents=totalNoOfDoc
let matrix = [];
// for (let row = 0; row < totalNoOfDoc; row++) {}
async function readFiles2(dirname, keyword) {
  let count = 0;
  await fs.readdir(dirname, async function (err, filenames) {
    await filenames.forEach(async function (filename) {
      await fs.readFile(
        dirname + filename,
        "utf-8",
        async function (err, content) {
          if (await content.toLowerCase().includes(keyword.toLowerCase())) {
            count++;
          }
        }
      );
    });
  });
  console.log(count);
  return count;
}

// const getCountOfKeyword = async (keyword) => {
//   let countPromise = readFiles2(ProblemDirectory, keyword);
//   let count = await countPromise;
//   console.log(count);
// };
readFiles2(ProblemDirectory, "determine").then((data) => {
  console.log(data);
});
