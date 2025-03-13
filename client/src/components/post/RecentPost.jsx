function RecentPost({ id, title, image, date, author }) {
  return (
    <div>
      <div
        key={id}
        className="mb-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:opacity-90 hover:border-green-400"
      >
        <a href={`/posts/${id}`}>
          <img
            className=" w-full h-[150px] border-b-[1px] object-fill rounded-lg"
            src={image}
            alt="post-image"
          />
        </a>
        <div className="px-2 text-xs flex justify-between">
          <span>{new Date(date).toDateString()}</span>
          <span> {author}</span>
        </div>
        <div className="pl-2 py-2 rounded-b-lg hover:underline">
          <a href={`/posts/${id}`}>{title}</a>
        </div>
      </div>
    </div>
  );
}

export default RecentPost;
