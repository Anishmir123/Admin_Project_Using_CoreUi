// image cropper right code 

// import React, { useRef, useState } from "react";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";

// const FloatingLabels = () => {
//   const cropperRef = useRef(null);
//   const [croppedImage, setCroppedImage] = useState(null); // Store the cropped image

//   const cropImage = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       // Get the cropped image as a Blob
//       cropper.getCroppedCanvas().toBlob((blob) => {
//         if (blob) {
//           // Create a URL for the blob
//           const url = URL.createObjectURL(blob);
//           setCroppedImage(url); // Set the URL to display or download
//         }
//       }, "image/jpeg");
//     }
//   };

//   const downloadImage = () => {
//     if (croppedImage) {
//       const link = document.createElement("a");
//       link.href = croppedImage;
//       link.download = "cropped-image.jpg";
//       link.click();
//     }
//   };

//   return (
//     <div>
//       <Cropper
//         src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
//         style={{ height: 400, width: "45%" }}
//         initialAspectRatio={16 / 9}
//         guides={false}
//         ref={cropperRef}
//       />
//       <div style={{ marginTop: "10px" }}>
//         {/* Button to crop the image */}
//         <button onClick={cropImage} style={{ marginRight: "10px" }}>
//           Crop Image
//         </button>

//         {/* Button to download the cropped image */}
//         {croppedImage && (
//           <button onClick={downloadImage}>Download Cropped Image</button>
//         )}
//       </div>
//       {/* Display the cropped image */}
//       {croppedImage && (
//         <div style={{ marginTop: "8px" }}>
//           <h3>Cropped Image:</h3>
//           <img src={croppedImage} alt="Cropped" style={{ maxWidth: "100%" }} />
//         </div>
//       )}
//       <br/>
//     </div>
//   );
// };

// export default FloatingLabels;






/*------------------------------------------------------------------------------------------------*/



// import React, { useState } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// const FloatingLabels = () => {
//   const [src, setSrc] = useState(null); // Image source
//   const [crop, setCrop] = useState({
//     unit: '%',
//     x: 0,
//     y: 0,
//     width: 50,
//     height: 50,
//   }); // Crop dimensions
//   const [croppedImageUrl, setCroppedImageUrl] = useState(null); // Cropped image URL
//   const [imageFileName, setImageFileName] = useState(null); // Image file name

//   // Handle file input
//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setImageFileName(file.name); // Save the file name
//       const reader = new FileReader();
//       reader.onload = () => setSrc(reader.result); // Set image source
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle crop completion
//   const onCropComplete = (crop) => {
//     if (crop.width && crop.height) {
//       makeClientCrop(crop);
//     }
//   };

//   // Generate cropped image
//   const makeClientCrop = async (crop) => {
//     if (src && crop.width && crop.height) {
//       const croppedImage = await getCroppedImg(src, crop);
//       setCroppedImageUrl(croppedImage);
//     }
//   };

//   // Create cropped image
//   const getCroppedImg = (imageSrc, crop) => {
//     return new Promise((resolve) => {
//       const image = new Image();
//       image.src = imageSrc;
//       image.onload = () => {
//         const canvas = document.createElement('canvas');
//         const scaleX = image.naturalWidth / image.width;
//         const scaleY = image.naturalHeight / image.height;
//         canvas.width = crop.width;
//         canvas.height = crop.height;
//         const ctx = canvas.getContext('2d');

//         ctx.drawImage(
//           image,
//           crop.x * scaleX,
//           crop.y * scaleY,
//           crop.width * scaleX,
//           crop.height * scaleY,
//           0,
//           0,
//           crop.width,
//           crop.height
//         );

//         canvas.toBlob((blob) => {
//           if (blob) {
//             const croppedUrl = URL.createObjectURL(blob);
//             resolve(croppedUrl);
//           }
//         }, 'image/jpeg');
//       };
//     });
//   };

//   // Save the cropped image
//   const saveCroppedImage = () => {
//     if (croppedImageUrl) {
//       const link = document.createElement('a');
//       link.href = croppedImageUrl;
//       link.download = `cropped-${imageFileName || 'image'}`;
//       link.click();
//     }
//   };

//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <h2>Upload and Crop Image</h2>
//       <input type="file" accept="image/*" onChange={onSelectFile} />
//       {src && (
//         <div style={{ marginTop: '20px', maxWidth: '100%', margin: '0 auto' }}>
//           <ReactCrop
//             src={src}
//             crop={crop}
//             onChange={(newCrop) => setCrop(newCrop)}
//             onComplete={onCropComplete}
//             style={{
//               maxWidth: '100%',
//               height: 'auto',
//               border: '1px solid #ccc',
//             }}
//           />
//         </div>
//       )}
//       {croppedImageUrl && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Cropped Image:</h3>
//           <img
//             alt="Cropped"
//             src={croppedImageUrl}
//             style={{
//               maxWidth: '100%',
//               height: 'auto',
//               marginBottom: '10px',
//               border: '1px solid #ccc',
//             }}
//           />
//           <button onClick={saveCroppedImage} style={{ padding: '10px', cursor: 'pointer' }}>
//             Save Cropped Image
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FloatingLabels;

//-----------------------------------------------------------------------------------------------------//

// This is code worikng

import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const FloatingLabels = () => {
  const [src, setSrc] = useState(null); // Image source
  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 16 / 9 }); // Crop settings
  const [croppedImageUrl, setCroppedImageUrl] = useState(null); // Cropped image URL
  const imgRef = useRef(null);

  // Handle file upload
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Generate cropped image URL
  const getCroppedImg = (image, crop) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          resolve(croppedUrl);
        }
      }, "image/jpeg");
    });
  };

  // Handle crop completion

  const onCropComplete = async (crop) => {
    if (crop.width && crop.height) {
      const croppedImage = await getCroppedImg(imgRef.current, crop);
  
      // Convert cropped image to Base64
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result;
  
        // Send the Base64 image to your backend
        try {
          const studentData = {
            username: "student1", // Replace with actual username
            email: "student1@example.com", // Replace with actual email
            address: "123 Main St",
            city: "City",
            country: "Country",
            imageData: base64data,
          };
  
          const res = await fetch("http://localhost:3007/api/auth/uploadStudentImage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(studentData),
          });
  
          const result = await res.json();
          if (result.status === 1) {
            alert("Image uploaded and saved to the database successfully!");
          } else {
            alert("Image upload failed: " + result.msg);
            console.error("Error:", result.error);
          }
        } catch (error) {
          console.error("Error uploading image to the backend:", error);
          alert("Error uploading image to the server.");
        }
      };
    }
  };
  
  


  // Download cropped image
  const downloadCroppedImage = () => {
    if (croppedImageUrl) {
      const link = document.createElement("a");
      link.href = croppedImageUrl;
      link.download = "cropped-image.jpg";
      link.click();
    }
  };

  return (
    <div>
      <h2>Upload The Image :</h2>
      {/* File Input */}
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {/* Crop Section */}
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={onCropComplete}
        >
          <img ref={imgRef} alt="Crop preview" src={src} />
        </ReactCrop>
      )}
      {/* Cropped Image Preview */}
      {croppedImageUrl && (
        <div>
          <h3>Cropped Image:</h3>
          <img src={croppedImageUrl} alt="Cropped" />
          <br/>
          <br/>
          <button onClick={downloadCroppedImage}>Save Cropped Image</button>
          <br/>
          <br/>
        </div>
      )}
    </div>
  );
};

export default FloatingLabels;




