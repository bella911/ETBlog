import React, { useEffect, useState } from "react";
import MobSizePostItem from "../../components/post/MobSizePostItem";


function MobSizePosts({ posts }) {
  return (
    <div className="py-3">
        {posts.map(
          ({ _id, title, description, createdAt, image, author, user, comments, views, likes }) => (
            <article
               key={_id}
              className="flex font-medium text-gray-800 dark:text-gray-200 sm:px-4  py-2   bg-[#eee] dark:bg-gray-800"
            >
            <MobSizePostItem
              key={_id}
              id={_id}
              title={title}
              description={description}
              createdAt={createdAt}
              author={author}
              image={image}
              userId={user}
              comments = {comments}
              views = {views}
              likes = {likes}
            />
          </article>
          )
        )}
    </div>
  );
}

export default MobSizePosts;
