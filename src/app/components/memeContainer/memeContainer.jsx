// import React, { useState, useEffect } from "react";
// import { storage } from "../firebase/firebase";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import Upload from "../upload/page";
// import Memes from "../meme/page";

// const MemeContainer = () => {
//   const [imageData, setImageData] = useState([]);

//   console.log(imageData);

//   const imageListRef = ref(storage, "images/");

//   const uploadImage = (imageUpload) => {
//     if (imageUpload == null) return;
//     const imageRef = ref(storage, `images/${imageUpload.name}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageData((prev) => [
//           ...prev,
//           { name: getImageName(imageUpload.name), url },
//         ]);
//       });
//     });
//   };

//   useEffect(() => {
//     listAll(imageListRef).then((response) => {
//       response.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           setImageData((prev) => [
//             ...prev,
//             { name: getImageName(item.name), url },
//           ]);
//         });
//       });
//     });
//   }, []);

//   const getImageName = (fullName) => {
//     return fullName.split(".")[0];
//   };

//   console.log(imageData);

//   return (
//     <div>
//       <Upload uploadImage={uploadImage} />
//       <Memes imageData={imageData} />
//     </div>
//   );
// };

// export default MemeContainer;

"use client";
import React, { useState, useEffect } from "react";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Upload from "../upload/page";
import Memes from "../meme/page";

const MemeContainer = () => {
  const [imageData, setImageData] = useState([]);

  console.log(imageData);

  const imageListRef = ref(storage, "images/");

  const uploadImage = (imageUpload) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageData((prev) => [
          ...prev,
          { name: getImageName(imageUpload.name), url },
        ]);
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAll(imageListRef);
        const urls = await Promise.all(
          response.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { name: getImageName(item.name), url };
          })
        );
        setImageData(urls);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, []);

  const getImageName = (fullName) => {
    return fullName.split(".")[0];
  };

  console.log(imageData);

  return (
    <div>
      <Upload uploadImage={uploadImage} />
      {imageData.length > 0 ? (
        <Memes imageData={imageData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MemeContainer;
