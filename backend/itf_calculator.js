const fs = require("fs");
const keyword_extractor = require("keyword-extractor");
const { type } = require("os");
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
// console.log(keywordArrayOfAll);

//making of ITF matrix
const readFiles2 = async () => {
  try {
    const fileNames = await fs.readdirSync(ProblemDirectory);
    // console.log(fileNames);
    const promises = fileNames.map((fileName) =>
      fs.readFileSync(path.join(ProblemDirectory, fileName), "utf-8")
    );

    const contents = await Promise.allSettled(promises);
    // console.log(contents);
    return contents; //array of objects
    // contents.forEach((content) => console.log(content));
  } catch (err) {
    console.log(err);
  }
};

readFiles2().then((data) => {
  let strAll = "";
  data.forEach((d) => {
    strAll += d.value;
  });
  const totalKeys = keyword_extractor.extract(strAll.toLowerCase(), {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });
  // console.log(totalKeys);

  let itfValuesOfAllKeywords = [];
  for (let i = 0; i < totalKeys.length; i++) {
    itfValuesOfAllKeywords[i] = 0;
  }
  for (let row = 0; row < totalNoOfDoc; row++) {
    const curr_keyWordArray = keyword_extractor.extract(
      data[row].value.toLowerCase(),
      {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      }
    );
    let count = 0;
    for (let col = 0; col < totalKeys.length; col++) {
      const keyW = totalKeys[col];
      if (curr_keyWordArray.includes(keyW)) itfValuesOfAllKeywords[col]++;
    }
  }
  for (let i = 0; i < totalKeys.length; i++) {
    itfValuesOfAllKeywords[i] = totalNoOfDoc / itfValuesOfAllKeywords[i];
  }
  console.log(itfValuesOfAllKeywords); //ITF matrix
});

//no. of columns=length of keywordArrayOfAll
//no. of rows= no. of documents=totalNoOfDoc
