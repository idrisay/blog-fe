import Editor from "@/components/editor";
import Input from "@/components/Input";
import { validateBlog, stripHTML } from "@/utils/functions";
import React, { useState } from "react";
import { useAppContext } from '../utils/context';
import { useRouter } from 'next/router'
import { toast } from "react-toastify";

const NewBlog = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    tags: "",
    // body:'',
  });
  const [body, setBody] = useState("");
  const [error, setError] = useState({})
  const mycontext = useAppContext();
  const router = useRouter()

  const handleEditorChange = (val) => {
    setBody(val);
  };

  const handleChange = (e) => {
    if(e.target.value && Object.keys(error).length !== 0){
        if(error[e.target.id]){
            let _error = error
            _error[e.target.id] = ''
            setError(_error)
        }
    }
    // error[e.target.id] = 
    setNewBlog({ ...newBlog, [e.target.id]: e.target.value });
  };

  const handleNewBlog = () => {
    let result = validateBlog({...newBlog, body, author: mycontext?.user?.id })
    setError(result)
    if(Object.keys(result).length === 0){
        submitBlog()
    }
  }

  const submitBlog = () => {
    let author =  mycontext?.user?.id
    fetch(`${process.env.BACKEND_URL}blogs`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...newBlog, body, author }),
      } ).then((res) => {
        return res.json()
    }).then((json) => {
        router.push('/')
        toast(json?.message);
      }).catch((err) => {
        console.log({err})
      })
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1>New Blog</h1>
      <div className="flex flex-col max-w-lg rounded-md my-4 mx-auto">
        <label className="mt-4 mb-2" htmlFor="title">
          Title {' '}
          <span className="text-red-600">
          {error?.title}
          </span>
        </label>
        <Input
          value={newBlog?.title}
          required
          onChange={handleChange}
          type="text"
          id="title"
        />
        <label className="mt-4 mb-2" htmlFor="tags">
          Tags{' '}
          <span className="text-red-600">
          {error?.tags}
          </span>
        </label>
        <Input
          value={newBlog?.tags}
          required
          onChange={handleChange}
          id="tags"
        />
        <label className="mt-4" htmlFor="body">
          Body{' '}
          <span className="text-red-600">
          {error?.body}
          </span>
        </label>
      </div>
      <Editor
        placeholder={"Write something special..."}
        value={newBlog?.body}
        onChange={handleEditorChange}
      />
      <div className="flex justify-center fixed bottom-8 left-0 w-full">
        <button className="bg-red-100 shadow-md hover:bg-red-700 hover:text-white transition-all duration-300 min-w-[200px] p-2 rounded-md" onClick={handleNewBlog}>Submit</button>
      </div>
    </div>
  );
};

export default NewBlog;
