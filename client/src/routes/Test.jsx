import React, { useState } from "react";
import axios from "axios";

// const Test = () => {
//   const [images, setImages] = useState([]);
//   const handleImage = (e) => {
//     const files = Array.from(e.target.files);
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImages((pre) => [...pre, reader.result]);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleSubmit = async (e) => {
//     console.log(images);
//     e.preventDefault();
//     let formData = new FormData();
//     images.forEach((pic) => {
//       formData.append("images", pic);
//     });
//     formData.append("name", "apple 13 pro");
//     formData.append("brand", "apple");
//     formData.append("category", "64ec48a81b5dbfef9cac3003");
//     formData.append("discountPrice", 1);
//     formData.append("discount", 1);
//     formData.append("description", "poli aann");
//     formData.append("price", 12354);
//     formData.append("stock", 2);
//     try {
//       const response = await axios(
//         `http://localhost:2040/api/products/add`,
//         { method: "POST", data: formData },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response.status);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleImage} />
//         <button type="submit">submit</button>
//       </form>
//     </div>
//   );
// };

// export default Test;

const Test = () => {
  const [image, setImage] = useState("");
  const handleImage = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", "Bikes");
    formData.append("image", image);
    try {
      const response = await axios(
        `http://localhost:2040/api/products/category/`,
        { method: "POST", data: formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple={true} onChange={handleImage} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Test;
