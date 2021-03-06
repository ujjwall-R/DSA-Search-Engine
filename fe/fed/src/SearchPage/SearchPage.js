import React, { useState } from "react";
import { searchText } from "../actions/searchAction";
import "./SearchPage.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [text, settext] = useState("");
  const [searchResult, setsearchResult] = useState({
    questionsFound: [],
    urls: [],
    titles: [],
    contents: [],
  });
  const [loading, setloading] = useState("");

  const textChangeHandler = (event) => {
    settext(event.target.value);
    console.log(text);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setloading("Loading...");
    const mess = <>{loading}</>;
    const results = await searchText(text);
    if (results) {
      setsearchResult(results);
      setloading("");
      mess = <></>;
    }
    // console.log(results);
  };

  const listItems = searchResult.questionsFound.map((question, i) => (
    <li className="searches">
      <h2 className="result-link">
        <a href={searchResult.urls[i]}>{searchResult.titles[i]}</a>
      </h2>
      <p className="green-link">{searchResult.urls[i]}</p>
      <span className="down-arrow" />
      <p className="searchText">{searchResult.contents[i]}</p>
    </li>
  ));

  return (
    <div>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,300italic,400italic,700,700italic,100italic"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,300italic,400italic,600italic|Open+Sans+Condensed:300"
        rel="stylesheet"
        type="text/css"
      />
      {/* Website Title & Description */}
      <title>Acronym Lookup Tool</title>
      <meta name="description" content="The replacement to WorkFaster 3" />
      <link rel="icon" href="#0" type="image/gif" sizes="32x32" />
      {/* Mobile viewport optimized */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      {/* Internet Explorer Compatibility string */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      {/* CSS */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css"
      />
      <link rel="stylesheet" type="text/css" href="styles.css" />
      {/* JS */}
      {/*?php include ("counter.php"); ?*/}
      <header>
        <h1>ALGoGle</h1>
      </header>
      <div id="searcharea">
        <div className="center-form">
          <div id="checkboxes"></div>
          <form onSubmit={submitHandler}>
            <label htmlFor="search">
              <i className="fa fa-search" aria-hidden="true" />
            </label>
            <input
              id="search"
              name="search"
              type="search"
              list="searchHelper"
              placeholder="Type text or problem to search..."
              onChange={textChangeHandler}
            />
            <datalist id="searchHelper" />
            <button type="submit" className="button" id="searchButton">
              Search
            </button>
            <button type="reset" className="button clear" id="clearButton">
              Clear
            </button>
          </form>
          {loading}
          {listItems}
        </div>
      </div>
      {/* 
<div class="info-alert">
  <p class="info-alert-text">Thank you for the feedback, we have updated the list with over 280 new terms!</p>
</div>
*/}
      <div id="searchUpdate">{/*?php include('loader01.html'); ?*/}</div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="row-item one">
              <p>
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  About the developer
                </Link>
              </p>
            </div>
            <div className="row-item two">
              <div>
                {/* <img id="countMe" src="sdfavi.png" /> */}
                <p>Copyright ??? 2022 Ujjwal R.</p>
                {/*<?php
                    echo(''); ?> */}
              </div>
            </div>
            <div className="row-item three">
              <p>To suggest changes in corpus, please contact.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
