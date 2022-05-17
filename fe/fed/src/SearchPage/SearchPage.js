import React, { useState } from "react";
import { searchText } from "../actions/searchAction";
import "./SearchPage.css";
import Logo from "./logo.png";

const SearchPage = () => {
  const [text, settext] = useState("");
  const [searchResult, setsearchResult] = useState({
    questionsFound: [],
    urls: [],
    titles: [],
    contents: [],
  });

  const textChangeHandler = (event) => {
    settext(event.target.value);
    console.log(text);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const results = await searchText(text);
    if (results) setsearchResult(results);
    console.log(results);
  };

  const listItems = searchResult.questionsFound.map((question, i) => (
    <li>
      <h2 className="result-link">
        <a href={searchResult.urls[i]}>{searchResult.titles[i]}</a>
      </h2>
      <p className="green-link">{searchResult.urls[i]}</p>
      <span className="down-arrow" />
      <p>{searchResult.contents[i]}</p>
    </li>
  ));

  return (
    <div>
      <header>
        <div>
          {/* <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" /> */}
          <img className="logoKgp" src={Logo} />

          <div className="search-box">
            <form onSubmit={submitHandler}>
              <input
                type="search"
                name="search"
                onChange={textChangeHandler}
                className="search-prompt"
              />
            </form>
          </div>
          <div className="nav-right">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMG6DsqfFZ-Mlo3ULMOs6CqBqBuSLUT5_OZv82wlZVs_LnHFGgZg"
              alt="Googleapps"
              height="16px"
              width="16px"
            />
            <a href="index.html">
              <button>Sign in</button>
            </a>
          </div>
        </div>
        <hr />
      </header>
      <main>
        <ul>
          {/* <li>
            <h2 className="result-link">
              <a href="Google.com">Google Homepage</a>
            </h2>
            <p className="green-link">
              https://proto-dylan.github.io/google-homepage/
            </p>
            <span className="down-arrow" />
            <p>
              March 20, 2019, having never done any web developement work
              before, Dylan Maloney set out on a great adventure of learning and
              enrichment. From analog to the digital realm he...
            </p>
          </li> */}
          {listItems}
        </ul>
      </main>
    </div>
  );
};

export default SearchPage;
