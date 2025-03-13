import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, FollowModal } from "../Modal";
import {Button} from "flowbite-react"
function DashboardItems({ id, title, image, toggleModal, postSize, username }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <div className="flex justify-between items-center border-[1px] p-2 mb-2 flex-col sm:flex-row gap-y-4 rounded-md dark:border-gray-700">
        <div className="flex gap-2 flex-1">
          <img src={image} className="w-6 h-6 inline-block" alt={`${username} - image`} />
          <span className="inline-block">{title}</span>
        </div>
        <div className="flex justify-end gap-3 max-w-96 ">
          <Button   gradientDuoTone="greenToBlue" outline size="xs">
                <Link to={`/posts/${id}`}> View </Link>
              </Button>
          {currentUser.username === username && (
            <>
              <Button  gradientDuoTone="greenToBlue" outline size="xs">
                <Link to={`/posts/editpost/${id}`}> Edit </Link>
              </Button>
              <DeleteModal postId={id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardItems;
