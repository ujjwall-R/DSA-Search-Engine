const keyword_extractor = require("keyword-extractor");

const sentence =
  "President obama Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency";

function countOccurencesStr(string, word) {
  return string.split(word).length - 1;
}
const countOccurrencesArr = (arr, val) => {
  return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
};

const tf_Calculator = (sentence, keyword) => {
  const total_freq = keyword_extractor.extract(sentence, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false,
  }).length;
  const freq_keyword = countOccurencesStr(
    sentence.toLowerCase(),
    keyword.toLowerCase()
  );
  return freq_keyword / total_freq;
};

console.log(tf_Calculator(sentence, "Obama"));
