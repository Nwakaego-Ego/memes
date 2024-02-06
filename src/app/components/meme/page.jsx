"use client";
import React, { useState } from "react";
import "./meme.css";

const Memes = ({ imageData }) => {
  const [searchMeme, setSearchMeme] = useState("");
  console.log(imageData);

  // const filteredMeme = imageData.filter((meme) => {
  //   return meme.name.toLowerCase().includes(searchMeme.toLowerCase());
  // });

  const filteredMeme = imageData
    ? imageData.filter((meme) => {
        return meme.name.toLowerCase().includes(searchMeme.toLowerCase());
      })
    : [];

  return (
    <div className="bg-blue-500 min-h-screen text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 mt-10 flex justify-center">
          <input
            type="text"
            placeholder="search meme..."
            className="bg-blue-700 text-white px-4 py-2 rounded-l focus:outline-none"
            onChange={(e) => setSearchMeme(e.target.value)}
          />
          {/* <button className="bg-blue-700 px-4 py-2 rounded-r">Search</button> */}
        </div>

        <div className="grid-container">
          {/* {filteredMeme.length > 0 ? (
            filteredMeme.map((meme, index) => (
              <div key={index} className="grid-item">
                <img src={meme.url} alt={meme.name} />
                {meme.name}
              </div>
            ))
          ) : (
            <div className="error-message flex flex-col items-center justify-center text-center text-4xl font-bold text-red-500 p-8 bg-gray-200 rounded-md shadow-md ml-[350px]">
              <span className="mb-4">Oops! No meme found</span>
              <div className="w-16 h-1 bg-red-500 rounded-full"></div>
              <span className="mt-4 text-sm text-gray-600">
                Please try again later
              </span>
            </div>
          )} */}

          {filteredMeme.map((meme, index) => (
            <div key={index} className="grid-item">
              <img src={meme.url} alt={meme.name} />
              {meme.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memes;
