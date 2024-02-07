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
//       {/* <Upload uploadImage={uploadImage} />
//       <Memes imageData={imageData} /> */}

//       <div>
//         <Upload uploadImage={uploadImage} />
//         {imageData.length > 0 ? (
//           <Memes imageData={imageData} />
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
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
  const [loading, setLoading] = useState(true); // Introduce loading state

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
    listAll(imageListRef)
      .then((response) => {
        const promises = response.items.map((item) =>
          getDownloadURL(item).then((url) => ({
            name: getImageName(item.name),
            url,
          }))
        );
        Promise.all(promises).then((data) => {
          setImageData(data);
          setLoading(false); // Set loading state to false when data fetching completes
        });
      })
      .catch((error) => {
        console.error("Error fetching image data:", error);
        setLoading(false); // Set loading state to false even if there's an error
      });
  }, []); // No dependencies to ensure it runs only once

  const getImageName = (fullName) => {
    return fullName.split(".")[0];
  };

  console.log(imageData);

  return (
    <div>
      <div>
        <Upload uploadImage={uploadImage} />
        {loading ? <p>Loading...</p> : <Memes imageData={imageData} />}
      </div>
    </div>
  );
};

export default MemeContainer;
