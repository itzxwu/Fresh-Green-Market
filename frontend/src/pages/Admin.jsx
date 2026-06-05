import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: ""
  });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    await axios.post(
      "http://localhost:5000/api/products",
      form,
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );

    alert("Product Added");
    fetchProducts();
  };

  const deleteProduct = async (id) => {

const user = JSON.parse(localStorage.getItem("userInfo"));

await axios.delete(
  `http://localhost:5000/api/products/${id}`,
  {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }
);

alert("Product Deleted");

fetchProducts();

};

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      <div className="grid gap-2">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="stock" placeholder="Stock" onChange={handleChange} />
        <input name="image" placeholder="Image URL" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />

        <button
          onClick={addProduct}
          className="bg-green-600 text-white p-2"
        >
          Add Product
        </button>
      </div>

      <h2 className="text-xl mt-6">Products</h2>

      {products.map((p) => (
        <div key={p._id} className="border p-2 mt-2">

  <p>{p.name} - ₹{p.price}</p>

  <button
    onClick={() => deleteProduct(p._id)}
    className="bg-red-500 text-white px-2 py-1 mt-2"
  >
    Delete
  </button>

</div>
      ))}
    </div>
  );
}

export default Admin;