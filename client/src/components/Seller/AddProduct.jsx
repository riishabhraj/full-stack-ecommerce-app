// src/components/Seller/AddProduct.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const { currentUser } = useSelector((state) => state.seller);
  const [files, setFiles] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
    category: "",
    stock: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Headphones",
    "Laptop",
    "Footwear",
    "Bottom",
    "Toys",
    "Books",
    "Camera",
    "Smartphones",
  ];

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + productData.images.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          console.log("Image URLs:", urls);
          setProductData((prevData) => ({
            ...prevData,
            images: prevData.images.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.error("Upload error:", err);
          setImageUploadError("Image upload failed (2 MB max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRemoveImage = (index) => {
    setProductData({
      ...productData,
      images: productData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productData.images.length < 1) {
        return setError("you must upload at least one image");
      }
      setLoading(true);
      setError(false);
      await axios.post("/api/product/create", {
        ...productData,
        user: currentUser._id,
      });
      setLoading(false);
      navigate(`/seller/dashboard/${currentUser._id}`);
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow-md">
      <h1 className="text-2xl font-bold mb-5">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {productData.images.length > 0 &&
            productData.images.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
