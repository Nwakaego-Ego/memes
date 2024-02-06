"use client";
import React, { useState } from "react";
import { Link } from "next/link";
import "./upload.css";

const Upload = ({ uploadImage }) => {
  const [imageUpload, setImageUpload] = useState(null);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => setImageUpload(event.target.files[0])}
      />
      <button onClick={() => uploadImage(imageUpload)}>Upload Image</button>
      <Link href="/">
        <button>Home page</button>
      </Link>
    </div>
  );
};

export default Upload;
