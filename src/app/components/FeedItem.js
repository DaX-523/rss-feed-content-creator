"use client";
import React from "react";
import { useMyContext } from "../context/ContentContext";
import parseContent from "../utils/parseContent";
import cohere from "../utils/Cohere";
import { BlogPrompt, TweetPrompt } from "../utils/constants";

const FeedItem = ({ item }) => {
  const { state, dispatch } = useMyContext();

  // console.log(item, "item");
  const createBlog = async (prompt, content) => {
    console.log("cld");
    try {
      const data = await cohere.chat({
        model: "command",
        chatHistory: [
          {
            role: "USER",
            message: prompt,
          },
        ],
        message: content,
      });
      console.log("data", data);
      dispatch({ type: "SET_BLOG", payload: data?.text });
    } catch (error) {
      console.log(error);
    }
  };
  const createTweet = async (prompt, content) => {
    console.log("cld");
    try {
      const data = await cohere.chat({
        model: "command",
        chatHistory: [
          {
            role: "USER",
            message: prompt,
          },
        ],
        message: content,
      });
      console.log("data", data);
      dispatch({ type: "SET_TWEET", payload: data?.text });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col space-x-3 space-y-1 text-gray-600 transition-colors p-4 duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
      <div className="flex ">{item?.title}</div>
      <div className="p-3 space-x-3">
        <button
          onClick={() =>
            dispatch({
              type: "SET_DATA",
              payload: parseContent(item?.description),
            })
          }
          className="transition-colors p-2 duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-100 hover:text-gray-500 font-medium text-blue-600 background-transparent outline-none focus:outline-none"
        >
          expand..
        </button>
        <button
          onClick={() =>
            createBlog(BlogPrompt, item?.title + " " + item?.description)
          }
          className="transition-colors p-2 duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-100 hover:text-gray-500 font-medium text-blue-600 background-transparent outline-none focus:outline-none"
        >
          blog..
        </button>
        <button
          onClick={() =>
            createTweet(TweetPrompt, item?.title + " " + item?.description)
          }
          className="transition-colors p-2 duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-100 hover:text-gray-500 font-medium text-blue-600 background-transparent outline-none focus:outline-none"
        >
          tweet..
        </button>
      </div>
    </div>
  );
};

export default FeedItem;
