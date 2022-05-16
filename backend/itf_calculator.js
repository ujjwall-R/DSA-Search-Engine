const fs = require("fs");
const keyword_extractor = require("keyword-extractor");
const { type } = require("os");
const { normalize } = require("path");
var path = require("path");
var process = require("process");

function countOccurencesStr(string, word) {
  return string.split(word).length - 1;
}

const ProblemDirectory = "../DataSet/Problems/";

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
  const totalKeys = keyword_extractor
    .extract(strAll.toLowerCase(), {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    })
    .sort();
  // console.log(totalKeys);

  let itfValuesOfAllKeywords = [];
  let tfmatrix = [];
  for (let j = 0; j < totalNoOfDoc; j++) {
    tfmatrix[j] = [];
  }
  for (let j = 0; j < totalNoOfDoc; j++) {
    for (let i = 0; i < totalKeys.length; i++) {
      tfmatrix[j][i] = 0;
    }
  }
  // console.log(tfmatrix);
  for (let i = 0; i < totalKeys.length; i++) {
    itfValuesOfAllKeywords[i] = 0;
  }

  for (let row = 0; row < totalNoOfDoc; row++) {
    const curr_keyWordArray = keyword_extractor
      .extract(data[row].value.toLowerCase(), {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      })
      .sort();
    const temp = curr_keyWordArray.length;
    let count = 0;
    for (let col = 0; col < totalKeys.length; col++) {
      const keyW = totalKeys[col];
      if (curr_keyWordArray.includes(keyW)) itfValuesOfAllKeywords[col]++;
      tfmatrix[row][col] = countOccurencesStr(
        data[row].value.toLowerCase(),
        keyW.toLowerCase()
      );
      tfmatrix[row][col] /= temp;
    }
  }
  for (let i = 0; i < totalKeys.length; i++) {
    itfValuesOfAllKeywords[i] = totalNoOfDoc / itfValuesOfAllKeywords[i];
  }
  // console.log(itfValuesOfAllKeywords); //ITF matrix
  // console.log(tfmatrix); //tf matrix

  let similarityMatrix = [];
  for (let j = 0; j < totalNoOfDoc; j++) {
    similarityMatrix[j] = [];
  }
  for (let j = 0; j < totalNoOfDoc; j++) {
    for (let i = 0; i < totalKeys.length; i++) {
      similarityMatrix[j][i] = tfmatrix[j][i] * itfValuesOfAllKeywords[i];
    }
  }
  console.log(similarityMatrix); //similarity matrix

  const sim = { similarityArray: similarityMatrix };
  console.log(sim);
  const data2 = JSON.stringify(sim);
  fs.writeFile("similarityMatrix.json", data2, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
});

//no. of columns=length of keywordArrayOfAll
//no. of rows= no. of documents=totalNoOfDoc
