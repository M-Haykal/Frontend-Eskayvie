"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const BASE_URL = "http://localhost:3008";
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryName: "",
  });
  const [selectedProduct, setSelectedProduct] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3008/products");
      setProducts(response.data.data);
      setSelectedProduct(response.data.data[0]?.id || ""); // Set default selected product
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3008/categorys");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle input change for new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3008/products", newProduct);
      fetchProducts();
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryName: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // Submit images for selected product
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("productId", selectedProduct);

    try {
      const res = await fetch("http://localhost:3008/images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        alert("Images uploaded successfully!");
        setImages([]);
      } else {
        alert(`Failed to upload images: ${data.error}`);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
      >
        Kembali
      </button>
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>

      {/* Form to create new product */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <select
            name="categoryName"
            value={newProduct.categoryName}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Create Product
        </button>
      </form>

      {/* Form to upload images for the selected product */}
      <form onSubmit={handleImageSubmit} className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Upload Images for Product
        </h2>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border rounded p-2 w-full"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Upload Images:</label>
          <p>Max 5 images</p>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      </form>

      {/* Display products in a table */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Description</th>
            <th className="border-b p-2">Price</th>
            <th className="border-b p-2">Stock</th>
            <th className="border-b p-2">Category</th>
            <th className="border-b p-2">Images</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border-b p-2">{product.name}</td>
              <td className="border-b p-2">{product.description}</td>
              <td className="border-b p-2">{product.price}</td>
              <td className="border-b p-2">{product.stock}</td>
              <td className="border-b p-2">{product.category.name}</td>
              <td className="grid grid-cols-5 gap-4">
                {product.images?.slice(0, 5).map((image, index) => (
                    <img
                      key={index}
                      src={
                        image?.url
                          ? `${BASE_URL}${image.url}`
                          : "/placeholder.jpg"
                      }
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
