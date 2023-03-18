import React from 'react'

const blogcard = ({blog}) => {
  return (
    <div className='rounded-md border-[1px] m-1 p-4'>
        <h3 className='font-bold'>{blog.title}</h3>
        <p>{blog.tags}</p>
        <div
      dangerouslySetInnerHTML={{__html: blog.body}}
    />
    </div>
  )
}

export default blogcard