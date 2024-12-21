import React from "react";
import { useForm } from "react-hook-form";

function AddCommentUI({onSubmit}) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
  return (
    <div >
      <form  className="mb-2 flex" onSubmit={handleSubmit(onSubmit)}>
        {/* for commenter image */}
        <div className="w-12 flex justify-center pt-1">
          <img
            className="h-10 w-10 rounded-full bg-gray-50 object-cover"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="author-image"
          />
        </div>
        {/* for user post and post buttons */}
        <div className="flex-1 px-2">
          <textarea
            rows="1"
            className={`px-1 w-full text-sm bg-[#eee] text-gray-900 dark:text-white dark:bg-gray-800  border-0 focus:ring-0 focus:border-b-gray-200  resize-none border-b-[2px] border-gray-600 overflow-visible`}
            placeholder="Add a comment..."
            required
            {...register("text", { required: true })}
            // value={addComment}
            // onChange={(e) => setAddComment(e.target.value)}
          />
          {errors.text && <p>Comment is required</p>}
          <div className="flex justify-between items-center ">
            <div className="py-2 px-3 rounded-full hover:bg-gray-200">😊</div>
            <div className="flex gap-8">
              <button
                className="py-2 px-4  border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600  rounded-full text-sm"
                type="button"
                onClick={() => reset()}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm"
                type="submit"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCommentUI;
