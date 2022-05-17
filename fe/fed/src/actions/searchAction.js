import axios from "axios";

const backUrl = "http://localhost:5000/search/text";

export const searchText = async (text) => {
  try {
    console.log(text);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(backUrl, { text: text }, config);
    if (!data) {
      throw new Error("No result found");
      return;
    }
    return data;
  } catch (error) {
    return error;
  }
};
