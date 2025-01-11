import React from 'react'

// edit and delete dropdown result
export function commentDropdown() {
  return (
    <div>
      {/* main Comment settings */}
      <Dropdown label={<FaEllipsisH />} dismissOnClick={false} arrowIcon="" className='text-red-900 ' color='transparent' size="xs" >
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item as={"div"}>
          <button onClick={() => {
            // console.log("this is comment id", comment._id, "\nthis is post id", postId)
            deleteComment(comment._id)
          }}>
            Delete</button></Dropdown.Item>
      </Dropdown>
    </div>
  )
}


export function manipulatePostDd() {
  return (
    <div>modifiedPost</div>
  )
}

