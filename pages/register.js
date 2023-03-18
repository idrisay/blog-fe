import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.BACKEND_URL;

const Registration = () => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [bgImage, setBgImage] = useState("");

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

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as calling an API to create a new account
    // let errors = validateInfo(info);
    setErrors(validateInfo(info));
    if (Object.keys(errors).length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        email: info.email,
        password: info.password,
        firstName: info.firstName,
        lastName: info.lastName,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${BACKEND_URL}auth/register`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem("access_token", result.token);
          toast(result?.message);
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white max-w-sm mx-auto border-2 p-4 rounded-md shadow-md hover:shadow-none"
      >
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-bold mb-2"
          >
            First Name:
          </label>
          <input
            id="firstName"
            type="text"
            value={info.firstName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-700 my-2">{errors?.firstName}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-bold mb-2"
          >
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            value={info.lastName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-700 my-2">{errors?.lastName}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={info.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-700 my-2">{errors?.email}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={info.password}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-700 my-2">{errors?.password}</p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-bold mb-2"
          >
            Confirm Password:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={info.confirmPassword}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-700 my-2">{errors?.confirmPassword}</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;

function validateInfo(info) {
  const { firstName, lastName, email, password, confirmPassword } = info;
  const errors = {};

  if (!firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
