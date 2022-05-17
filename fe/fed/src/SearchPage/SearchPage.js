import React from "react";
import "./SearchPage.css";

const SearchPage = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="//use.fontawesome.com/releases/v5.0.7/css/all.css"
      />
      <div className="elementor-text-editor elementor-clearfix">
        <form className="example" _lpchecked={1}>
          <input
            name="cx"
            type="hidden"
            defaultValue="partner-pub-xxxxyouridxxxx"
          />
          <input name="cof" type="hidden" defaultValue="FORID:11" />
          <input name="ie" type="hidden" defaultValue="ISO-8859-1" />
          <input name="q" type="text" placeholder="Search.." />
          <button type="submit">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
