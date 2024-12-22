import React, { useState, useEffect } from "react";
// import image from "../images/blog1.png"
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "../axios";
import DashboardItems from "../components/DashboardItems";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteModal from "../components/DeleteModal";
import { useSelector } from "react-redux";
import DashboardSidebar from "../components/DashboardSidebar";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [postSize, setPostSize] = useState();
  const pSize = useSelector((state) => state.post.postSize);
  const location = useLocation();
  // const currentUser = useSelector((state) => state.user.currentUser);
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`/post/user/${username}`, { withCredentials: true })
      .then((res) => {
        setPosts(res.data.data);
        setPostSize(res.data.data.length);
        // console.log(res.data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, []);

  // useEffect(() => {},[location])

  const toggleModal = () => {
    // console.log(id);
    setModal(!modal);
  };

  return (
    <div className="bg-[#eee] dark:bg-gray-800 dark:text-gray-200 ">
      <div className="flex max-w-screen-xl mx-auto pt-8 pb-64 px-6 gap-2 flex-col md:flex-row ">
        <div>
          <DashboardSidebar />
        </div>
        <div className="flex-1">
          {modal && (
            <div className="flex justify-center h-auto ">
              <div className="absolute mt-8">
                {/* <DeleteModal toggleModal={toggleModal} postSize={postSize} /> */}
              </div>
            </div>
          )}
          {loading ? (
            <div className="flex justify-center items-center my-16">
              <ClipLoader speedMultiplier="0.5" size="40px" />
            </div>
          ) : (
            posts.map(({ _id, title, image }) => (
              <DashboardItems
                key={_id}
                id={_id}
                title={title}
                image={image}
                toggleModal={toggleModal}
                postSize={postSize}
                username={username}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
