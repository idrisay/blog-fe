import { callAPI } from '@/utils/api'
import React, {useEffect, useState} from 'react'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
      callAPI('blogs')
    }, [])


    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
          const data = await   callAPI('blogs');
          setBlogs(data)
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }, [])
    
  return (
    <div>
        <h2>Blogs</h2>
        {
            blogs?.map((blog) => (
                <div key={blog._id}>
                    {blog.title}
                </div>
            ) )
        }
    </div>
  )
}

export default Blogs