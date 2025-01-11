import { useState, useEffect } from "react";
import { Button, Modal, Textarea, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePost, postLength } from "../redux/crudSlice";
import axios from "../axios"
import { AiOutlineSearch } from "react-icons/ai";
import avatar from "../images/avatar.png"
import { FaRegComment } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';



export function FollowModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button gradientDuoTone="greenToBlue" outline size="sm" color="transparent" onClick={() => setOpenModal(true)} >Follow</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center text-gray-600 dark:text-gray-300">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-400" />
            <h3 className="mb-5 text-lg font-normal ">
              Want to follow to this Author?
            </h3>
            <p>Sign in to follow to this Author.
            </p>
            <div className="flex justify-center gap-4 pt-3">
              <Button className="bg-green-400 dark:bg-green-400" onClick={() => setOpenModal(false)}>
                <Link to={`/login`} className=""> {"Sign in"}</Link>
              </Button>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


// delete modal for dashboard
export function DeleteModal({ postId }) {
  const [openModal, setOpenModal] = useState(false);
  // const dispatch = useDispatch();

  const handleDeletePost = async () => {
    axios
      .delete(`/post/${postId}`, { withCredentials: true })
      .then(() => {
        // toggleModal();
        // navigate(`/dashboard/${currentUser.username}`);
        window.location.reload();
      })
      .catch((error) => {
        toggleModal();
        console.log(error);
      });
  };

  return (
    <>
      <Button color="failure" onClick={() => setOpenModal(true)} size="xs">Delete</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center text-gray-600 dark:text-gray-300">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {
                // console.log(postId);
                setOpenModal(false);
                handleDeletePost();
              }} >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


// search modal for dashboard
export function SearchModal() {
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    if (query.length < 3) {
      return setError("Enter at least 3 character");
    }
    const urlP = new URLSearchParams(location.search);
    urlP.set("query", query);
    const searchQuery = urlP.toString();
    navigate(`/search?${searchQuery}`);

    setQuery("");// clear set query after enter value
    setOpenModal(false); // hide modal after search
  };

  return (
    <>
      <Button className="rounded-full  border-none focus:ring-0" color="transparent" size="xs" onClick={() => setOpenModal(true)}><AiOutlineSearch className="text-2xl dark:text-gray-400" /></Button>
      <Modal show={openModal} sizes="md" onClose={() => setOpenModal(false)} popup style={{ height: "100vh", paddingTop: "64px" }} content="h-full">
        <Modal.Header />
        <Modal.Body >
          <div className="text-center text-gray-600 dark:text-gray-300">
            <form className="flex w-full" onSubmit={handleSearch}>
              <TextInput
                type="text"
                placeholder="Search..."
                rightIcon={AiOutlineSearch}
                className=" focus:ring-0 outline-none flex-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                type="submit"
                color="transparent"
                className="rounded-l-none -ml-12 border-l dark:border-gray-600 focus:ring-0"
              >
                <FaSearch className="dark:text-gray-300" />
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


// // sign in for like
export function LikeModal({ likesLength }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button className="border-0 p-0 focus:ring-0" color="transparent" size="xs" onClick={() => setOpenModal(true)} as="div">
        <FaRegHeart className="text-xl" />
        <span className="text-sm">&nbsp; {likesLength}</span>
      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center text-gray-600 dark:text-gray-300">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-400" />
            <h3 className="mb-5 text-lg font-normal ">
              Want to like this post?
            </h3>
            <p>Sign in to like this post.
            </p>
            <div className="flex justify-center gap-4 pt-3">
              <Button className="bg-green-400 dark:bg-green-400" onClick={() => setOpenModal(false)}>
                <Link to={`/login`} className=""> {"Sign in"}</Link>
              </Button>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


// message for un authenticate user to sign in to use following feature
export function FollowingModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <span className={`font-medium text-base`} onClick={() => setOpenModal(true)}> Following </span>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center text-gray-600 dark:text-gray-300">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-green-500">
              Want to use to this feature?
            </h3>
            <p>Sign in to use to this feature.
            </p>
            <div className="flex justify-center gap-4 pt-3">
              <Button gradientDuoTone="greenToBlue" outline onClick={() => setOpenModal(false)}>
                <Link to={`/login`} className=""> {"Sign in"}</Link>
              </Button>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}



// comment modal on user page
export function ReplyCommentOnUserPage({ postId, author }) {
  // console.log(postId)
  const [openModal, setOpenModal] = useState(false);
  const [commentLength, setCommentLength] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  // count total comment length
  useEffect(() => {
    axios
      .get(`/comment/getcomments`)
      .then((res) => {
        //  filters Comments By PostId
        const filterComments = res.data.comments.filter((post) => post.postId === postId)
        setCommentLength(filterComments.length);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  
  // react hook form on submit
  const onSubmit = (comment) => {

    // axios.post(`/post/comment/${postId}`, comment, { withCredentials: true })
    comment.postId = postId;
    comment.userId = currentUser._id;
    // console.log(comment)
    axios.post(`/comment/create`, comment , { withCredentials: true })
      .then((res) => {
        setOpenModal(false);
        navigate(`/posts/${postId}`)

      })
      .catch((error) => {
        console.log(error.message);
      });

  };


  
  return (
    <>
      <Button className="border-0 p-0 focus:ring-0" color="transparent" size="xs" onClick={() => setOpenModal(true)} as="div">
        <FaRegComment className="text-xl" />
        <span className="text-sm">&nbsp; {commentLength}</span>
      </Button>
      <Modal show={openModal} sizes="md" onClose={() => setOpenModal(false)} popup style={{ height: "100vh", paddingTop: "64px" }} content="h-full">
        <Modal.Header className=" bg-[#eee] dark:bg-gray-800"><button type="submit" onClick={handleSubmit(onSubmit)} className="text-sm py-2 px-3 bg-green-500 rounded-full">Reply</button></Modal.Header>
        <Modal.Body className="p-0">
          <article
            className="flex font-medium text-gray-800 dark:text-gray-200 px-4 pt-2 pb-6 rounded dark:border-gray-700 bg-[#eee] dark:bg-gray-800"
          >
            <div className="flex pt-9">
              <img
                src={avatar}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
              />
            </div>
            <div className=" h-full w-full object-cover object-center lg:h-full lg:w-full   md:max-w-none sm:max-w-none  overflow-hidden">
              <div className="p-2">
                <div className="group relative">
                  <p className="pb-2">Replying to <span className="text-green-500">@{author}</span></p>
                  <form>
                    <Textarea
                      rows="5"
                      placeholder="Post your reply"
                      className=" focus:ring-0 outline-none "
                      {...register("content", { required: true })}
                    />
                  </form>

                </div>
              </div>

            </div>
          </article>
        </Modal.Body>
      </Modal>
    </>
  );
}