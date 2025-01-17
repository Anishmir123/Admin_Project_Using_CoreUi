// import React, { useState } from 'react';
// import Select from 'react-select';

// import { DatePicker,TimePicker } from 'antd'; 
// import moment from 'moment';
// // const {RangePicker}  = DatePicker;
// import { ChromePicker } from 'react-color';
// import { Editor } from 'primereact/editor';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Import PrimeReact theme
// import 'primereact/resources/primereact.min.css';  // Import PrimeReact styles
// import 'primeicons/primeicons.css';  // Import PrimeIcons styles

// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
// import Password from 'antd/es/input/Password';
// // import { TimePicker } from 'rsuite';



// const Form = () => {

// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const[address, setAddress]=useState('');
// const [address2,setAddress2]=useState(' ')
// const [city, setCity]=useState('')

//   const [dates, setDates] = useState([]);
//   const [color, setColor] = useState('#fff');
//   const [price, setPrice] = useState(500);
//   const [time, setTime] = useState(null);
//   const [editorContent, setEditorContent] = useState("");
//   console.log(dates)
//   const [description, setDescription] = useState('');
//   const [text, setText] = useState(''); 
//   // Options for the searchable dropdown
//   const countryOptions = [
//     { value: 'India', label: 'India' },
//     { value: 'Nepal', label: 'Nepal' },
//     { value: 'Bhutan', label: 'Bhutan' },
//     { value: 'Uk', label: 'Uk' },
//     { value: 'United States', label: 'United States' },
//     { value: 'Canada', label: 'Canada' },
//     { value: 'Australia', label: 'Australia' },
//     { value: 'Germany', label: 'Germany' },
//     { value: 'United Kingdom', label: 'United Kingdom' },
//     { value: 'France', label: 'France' },
//     { value: 'Japan', label: 'Japan' },
//     // Add more countries as needed
//   ];
//   const handleTimeChange = (value) => {
//     setTime(value);
//   };
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const handleCountryChange = (selectedOption) => {
//     setSelectedCountry(selectedOption);
//   };

//   const [selectedOption, setSelectedOption] = useState(null);
//   const handleChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleEditorChange = (value) => {
//     setEditorContent(value);
//   };
//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       borderColor: 'gray', // Color for the border of the select box
//       '&:hover': {
//         borderColor: 'blue', // Color when hover over the select box
//       },
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected
//         ? 'lightblue' // Selected option background
//         : state.isFocused
//         ? 'lightgray' // Hovered option background
//         : 'white', // Normal background color
//       color: state.isSelected ? 'black' : 'blue', // Text color
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: '#f0f0f0', // Background color of the dropdown menu
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       color: 'blue', // Color of the selected value
//     }),
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       username: document.getElementById("username").value,
//       email: document.getElementById("email").value,
//       password: document.getElementById("password").value,
//       address: document.getElementById("address").value,
//       city: document.getElementById("city").value,
//       country: document.getElementById("country").value,
//       gender: document.querySelector('input[name="gender"]:checked')?.value,
//       hobbies: [
//         document.getElementById("hobby1").checked ? "Reading" : "",
//         document.getElementById("hobby2").checked ? "Traveling" : "",
//         document.getElementById("hobby3").checked ? "Gaming" : "",
//       ].filter(Boolean),
//       color: color,
//       price: price,
//       time: time?.format("h:mm a"),
//       description: description,
//       text: text,
//     };

//     try {
//       const response = await fetch('http://localhost:3001/register',
//          {

//       });

//       const result = await response.json();
//       if (response.ok) {
//         console.log("Form submitted successfully:", result);
//       } else {
//         console.error("Form submission failed:", result.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };


//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4 text-center">Fill The Application</h2>
//       <br />
//       <form onSubmit={handleFormSubmit}>
//         {/* Email and Password Section */}
//         <div className="row mb-3">
//           <div className="col">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email'/>
//           </div>
//           <div className="col">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password}
//             onChange={(e) => setPassword(e.target.value)} />
//           </div>
//         </div>

//         {/* Address Section */}
//         <div className="mb-3">
//           <label htmlFor="address" className="form-label">Current Address</label>
//           <input type="text" className="form-control" id="address" placeholder="Apartment, Building No, or floor" value={address} 
//            onChange={(e) => setAddress(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="address2" className="form-label">Original Address</label>
//           <input type="text" className="form-control" id="address2" placeholder="Apartment, Building No, or floor"
//           value={address2}
//           onChange={(e) => setAddress2(e.target.value)}  />
//         </div>

//         {/* City, Country, State, and Zip Section */}
//         <div className="row mb-3">
//           <div className="col">
//             <label htmlFor="city" className="form-label">City</label>
//             <input type="text" className="form-control" id="city" 
//              value={city}
//              onChange={(e) => setCity(e.target.value)}/>
//           </div>
//           <div className="col">
//             <label htmlFor="country" className="form-label">Country</label>
//             <input type="text" className="form-control" id="country" placeholder="Enter your country" 
//             value={selectedCountry}
//             onChange={(e) => setSelectedCountry(e.target.value)}
//             />
//           </div>
//           <div className="col">
//             <label htmlFor="state" className="form-label">State</label>
//             <select id="state" className="form-select">
//               <option>Choose...</option>
//               <option>West Bengal</option>
//               <option>Odisha</option>
//               <option>Bihar</option>
//               <option>Nagaland</option>
//               <option>Assam</option>
//               <option>Andhra Pradesh</option>
//               <option>Arunachal Pradesh</option>
//               <option>Chandigarh</option>

//             </select>
//           </div>
//           <div className="col">
//             <label htmlFor="zip" className="form-label">Zip</label>
//             <input type="text" className="form-control" id="zip" />
//           </div>
//         </div>

//         {/* File Upload */}
//         <div className="mb-3">
//           <label htmlFor="fileUpload" className="form-label">Upload Document</label>
//           <input type="file" className="form-control" id="fileUpload" />
//         </div>

//         <br />

//         {/* Searchable Dropdown for Country */}
//         <Select
//           options={countryOptions}
//           value={selectedOption}
//           onChange={handleChange}
//           placeholder="Search"
//           isSearchable={true}
//           styles={customStyles} 
//           isMulti={true}
//         />
//         <br />

//         {/* Gender and Hobbies Section */}
//         <div className="row">

//            {/* Gender Section on Right */}
//         <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label d-block">Gender</label>
//               <div className="form-check">
//                 <input type="radio" className="form-check-input" name="gender" id="male" value="male" />
//                 <label className="form-check-label" htmlFor="male">Male</label>
//               </div>
//               <div className="form-check">
//                 <input type="radio" className="form-check-input" name="gender" id="female" value="female" />
//                 <label className="form-check-label" htmlFor="female">Female</label>
//               </div>
//               <div className="form-check">
//                 <input type="radio" className="form-check-input" name="gender" id="other" value="other" />
//                 <label className="form-check-label" htmlFor="other">Other</label>
//               </div>
//             </div>
//           </div>
//           {/* Hobbies Section on Left */}
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label d-block">Hobbies</label>
//               <div className="form-check">
//                 <input type="checkbox" className="form-check-input" id="hobby1" value="reading" />
//                 <label className="form-check-label" htmlFor="hobby1">Reading</label>
//               </div>
//               <div className="form-check">
//                 <input type="checkbox" className="form-check-input" id="hobby2" value="traveling" />
//                 <label className="form-check-label" htmlFor="hobby2">Traveling</label>
//               </div>
//               <div className="form-check">
//                 <input type="checkbox" className="form-check-input" id="hobby3" value="gaming" />
//                 <label className="form-check-label" htmlFor="hobby3">Gaming</label>
//               </div>
//             </div>
//           </div>

//         </div>
//         <br/>
//  {/* <DateRangePicker format="MM/dd/yyyy" >*/}

//         {/* select  color set
//         <div className="row mb-3">
//           <div className="col-12">
//             <h5>Select Color</h5>
//             <div className="p-3 border" >
//               <ChromePicker
//                 color={color}
//                 onChangeComplete={(color) => setColor(color.hex)} // Update color state
//                 style={{ width: '100%',height: '200px'  }} // Ensure the picker uses full width
//               />
//             </div>
//           </div>
//         </div>

// <br/> */}

// {/* price range slider */}

// {/* <div>
//           <h5>Select Price Range</h5>
//           <input
//             type="range"
//             className="form-control-range"
//             min="0"
//             max="1000"
//             step="10"
//             value={price}
//             onChange={(e) => setPrice(parseInt(e.target.value))}
//           />
//           <div>Selected Price: ₹{price}</div>
//         </div>
// <br/> */}

// {/* time picker */}

// <div className="mb-3">
//           <label className="form-label">Select Time</label>
//           <br/>
//           <TimePicker
//             use12Hours
//             format="h:mm a"
//             value={time}
//             onChange={handleTimeChange}
//             className="w-30"
//           />

//         </div>


//       <br/>
//          {/* textarea */}
//          <div className="mb-3">
//           <label htmlFor="Write About" className="form-label">Write Something</label>
//           <textarea
//             id="description"
//             className="form-control"
//             rows="4"
//             placeholder="Something Write here..."
//             value={description}
//             onChange={handleDescriptionChange}
//           ></textarea>
//           {/* {description && (
//             <div className="mt-2 text-muted">
//               You entered: {description}
//             </div>
//           )} */}
//         </div>

//         {/* text editor */}
//         {/* <div className="mb-3">
//           <label className="form-label"> Text Editor</label>
//           <ReactQuill
//             value={editorContent}
//             onChange={handleEditorChange}
//             theme="snow" 
//             placeholder="Write text content here..."

//           />
//         </div> */}

//        {/* text editor part 2 */}
//        <label className="form-label"> Write Text :</label>
//        <div className="card">

//             <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '200px' }} />
//         </div>
// <br/>
//         {/* Submit Button */}
//         <button type="submit" className="btn btn-primary" >Submit</button>

//       </form>


//       <br />
//     </div>
//   );
// };

// export default Form;

import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { TimePicker } from 'antd';
import { Editor } from 'primereact/editor';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from 'axios';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState(500);
  const [time, setTime] = useState(null);
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [imageName, setImageName] = useState('');
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,  // Add height to avoid undefined issues
    aspect: 16 / 9,
    x: 0,  // Ensure x is defined
    y: 0,  // Ensure y is defined
  });
  const [originalImageName, setOriginalImageName] = useState(''); // New state for original image name

  const imgRef = useRef(null);
  const token = localStorage.getItem('authToken');

  const countryOptions = [
    { value: 'India', label: 'India' },
    { value: 'Nepal', label: 'Nepal' },
    { value: 'Bhutan', label: 'Bhutan' },
    { value: 'UK', label: 'UK' },
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Japan', label: 'Japan' },
  ];

  const onSelectFile = (e) => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.readAsDataURL(file);
    setOriginalImageName(file.name);  // Store original file name here
  }
};

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

  const onCropComplete = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedUrl = await getCroppedImg(imgRef.current, crop);
      setImageName(croppedUrl);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: 'gray',
      '&:hover': {
        borderColor: 'blue',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'lightblue' : state.isFocused ? 'lightgray' : 'white',
      color: state.isSelected ? 'black' : 'blue',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#f0f0f0',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'blue',
    }),
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Get the cropped image URL
    const croppedImage = imageName;  // This is where the cropped image URL is stored
    const fileInput = document.getElementById('imageUpload');
    const timeIn24HourFormat = time ? time.format('HH:mm') : '';
    
    const formData = new FormData();
    formData.append('username', document.getElementById('username')?.value || '');
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('address2', address2);
    formData.append('city', city);
    formData.append('country', selectedCountry?.value || '');
    formData.append('gender', document.querySelector('input[name="gender"]:checked')?.value || '');
    formData.append(
      'hobbies',
      JSON.stringify([
        document.getElementById('hobby1')?.checked && 'Reading',
        document.getElementById('hobby2')?.checked && 'Traveling',
        document.getElementById('hobby3')?.checked && 'Gaming',
      ].filter(Boolean))
    );
    formData.append('price', price);
    formData.append('time', timeIn24HourFormat);
    formData.append('description', description);
    formData.append('text', text);
  
    // Use the cropped image instead of the original uploaded image
    if (croppedImage) {
      // Convert the cropped image URL to a Blob before appending
      const imageBlob = await fetch(croppedImage).then(res => res.blob());
      // Use the original file name for the cropped image
      formData.append('image', imageBlob, originalImageName);  // Use original image name here
    }
    
    try {
      const response = await axios.post(
        'http://127.0.0.1:3007/api/auth/studentCreateForm',
        formData,
      
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      console.log('Success:', response.data);
  
      let formDataArray = JSON.parse(localStorage.getItem('formData')) || [];
      formDataArray.push(response.data);
      localStorage.setItem('formData', JSON.stringify(formDataArray));
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Student Form</h2>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        {/* Email & Password Section */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="col">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Current Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Apartment, Building No, or floor"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address2" className="form-label">Original Address</label>
          <input
            type="text"
            className="form-control"
            id="address2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Apartment, Building No, or floor"
          />
        </div>

        {/* City & Country Section */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="country" className="form-label">Country</label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={(option) => setSelectedCountry(option)}
              placeholder="Search"
              isSearchable
              styles={customStyles}
            />
          </div>
        </div>

        {/* Gender & Hobbies Section */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label d-block">Gender</label>
            <div className="form-check">
              <input type="radio" className="form-check-input" name="gender" id="male" value="male" />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check">
              <input type="radio" className="form-check-input" name="gender" id="female" value="female" />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
            <div className="form-check">
              <input type="radio" className="form-check-input" name="gender" id="other" value="other" />
              <label className="form-check-label" htmlFor="other">Other</label>
            </div>
          </div>

          <div className="col">
            <label className="form-label d-block">Hobbies</label>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="hobby1" />
              <label className="form-check-label" htmlFor="hobby1">Reading</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="hobby2" />
              <label className="form-check-label" htmlFor="hobby2">Traveling</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="hobby3" />
              <label className="form-check-label" htmlFor="hobby3">Gaming</label>
            </div>
          </div>
        </div>

        {/* Description & Rich Text Editor */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Write Something</label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something here..."
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Write Text</label>
          <Editor
            value={text}
            onTextChange={(e) => setText(e.htmlValue)}
            style={{ height: '200px' }}
          />
        </div>

        {/* Time Picker */}
        <div className="mb-3">
          <label className="form-label">Select Time</label>
          <br />
          <TimePicker
            use12Hours
            format="h:mm a"
            value={time}
            onChange={(value) => setTime(value)}
          />
        </div>

        {/* File Upload Section */}
        <div>
          <h2>Upload The Image :</h2>
          <input type="file" accept="image/*" onChange={onSelectFile} id="imageUpload" />
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
          {imageName && (
            <div>
              <h3>Cropped Image:</h3>
              <img src={imageName} alt="Cropped" />
            </div>
          )}
        </div>

        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br/>
    </div>
  );
};

export default Form;





// line no -719 to 723

      {/* Crop Section */}
      {/* {src && (
        <ReactCrop
          src={src}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={onCropComplete}
        >
          <img ref={imgRef} alt="Crop preview" src={src} />
        </ReactCrop>
      )} */}
      
      {/* Cropped Image Preview */}
      {/* {croppedImageUrl && (
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
    </div> */}

//  line no 562-572
// // Download cropped image
  // const downloadCroppedImage = () => {
  //   if (croppedImageUrl) {
  //     const link = document.createElement("a");
  //     link.href = croppedImageUrl;
  //     link.download = "cropped-image.jpg";
  //     link.click();
  //   }
  // };
  

  // line no 712-730
         {/* Image uploader and cropper */}
     
        {/* <div> */}
      {/* <h2>Upload The Image :</h2> */}
      {/* File Input */}
      {/* <input type="file"  accept="image/*" onChange={onSelectFile} /> */}

    {/* {src && (
          <ReactCrop src={src} crop={crop} onChange={setCrop} onComplete={onCropComplete}>
            <img ref={imgRef} alt="Crop preview" src={src} />
          </ReactCrop>
        )} */}

        {/* {croppedImageUrl && (
          <div>
            <img src={croppedImageUrl} alt="Cropped" />
          </div>
        )} */}
{/* </div> */}

// line no 553-560

  // const onCropComplete = async (crop) => {
  //   if (crop.width && crop.height) {
  //     const croppedImageFile = await getCroppedImg(imgRef.current, crop);
  //     setCroppedImageName(croppedImageFile.name); // Optional, save name
  //     setCroppedImageUrl(URL.createObjectURL(croppedImageFile));
  //   }
  // };
  
  // line no - 499-550
  // Image Set
  // const [src, setSrc] = useState(null); // Image source
  // const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 16 / 9 }); // Crop settings
  // const [croppedImageUrl, setCroppedImageUrl] = useState(null); // Cropped image URL
  // const [croppedImageName, setCroppedImageName] = useState('');

  // const imgRef = useRef(null);
  // const onSelectFile = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = () => setSrc(reader.result);
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  // const getCroppedImg = (image, crop) => {
  //   return new Promise((resolve, reject) => {
  //     const canvas = document.createElement("canvas");
  //     const scaleX = image.naturalWidth / image.width;
  //     const scaleY = image.naturalHeight / image.height;
  //     canvas.width = crop.width;
  //     canvas.height = crop.height;
  //     const ctx = canvas.getContext("2d");
  
  //     ctx.drawImage(
  //       image,
  //       crop.x * scaleX,
  //       crop.y * scaleY,
  //       crop.width * scaleX,
  //       crop.height * scaleY,
  //       0,
  //       0,
  //       crop.width,
  //       crop.height
  //     );
  
  //     canvas.toBlob(
  //       (blob) => {
  //         if (blob) {
  //           const file = new File([blob], "cropped-image.jpg", {
  //             type: "image/jpeg",
  //           });
  //           resolve(file);
  //         } else {
  //           reject("Error creating blob");
  //         }
  //       },
  //       "image/jpeg",
  //       1
  //     );
  //   });
  // };
  
