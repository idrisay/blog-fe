import React, { useState, useEffect } from "react";
import{validateLogin} from '../utils/functions.js'
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [errors, setErrors] = useState({})

  useEffect(() => {
    async function fetchBgImage() {
      const response = await fetch(
        // "https://source.unsplash.com/random/1600x900"
        "https://source.unsplash.com/random/1600x900/?nature"
      );
      setBgImage(response.url);
    }
    fetchBgImage();
  }, []);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    // Add your login logic here
    setErrors(validateLogin({email, password}))
     if (Object.keys(errors).length === 0){
        // Login post here
        console.log('Login fn')
        fetch(`${process.env.BACKEND_URL}auth/login`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({email,password }),
        } ).then((res) => {
          return res.json()
        }).then((json) => {
          console.log({json})
          toast(json?.message);
        }).catch((err) => {
          console.log({err})
        })
     }
  }

  console.log(errors)
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <div className="max-w-md w-full bg-white rounded-md shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="border-gray-400 border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border-gray-400 border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
