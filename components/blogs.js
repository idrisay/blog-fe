import { callAPI } from "@/utils/api";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    callAPI("blogs");
  }, []);

  useEffect(() => {
    setLoading(true);
    // declare the data fetching function
    const fetchData = async () => {
      const data = await callAPI("blogs");
      setBlogs(data);
      setLoading(false);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!blogs) return <p>No profile data</p>;

  return (
    <div>
      <h2>Blogs</h2>
      {blogs?.map((blog) => (
        <div key={blog._id}>{blog.title}</div>
      ))}
    </div>
  );
};

export default Blogs;
