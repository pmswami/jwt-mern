import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    handleSuccess("User Logged Out!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://jwt-mern-swamfires-projects.vercel.app/products";
      const response = await fetch(url, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const result = await response.json();
      //   console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <div>
        {products &&
          products.map((item, i) => (
            <ul key={i}>
              <span>
                {item.name}: {item.price}
              </span>
            </ul>
          ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
}

export default Home;
