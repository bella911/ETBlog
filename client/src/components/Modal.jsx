import { useState, useEffect } from "react";
import { Button, Modal, Textarea, TextInput } from "flowbite-react";
import { HiBell, HiOutlineExclamationCircle } from "react-icons/hi";
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
      <div onClick={() => setOpenModal(false)}>
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
      </div>
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

//  delete post modal from mypost
export function DeletePostModal({postId}) {
  const navigate = useNavigate();
  const id = useSelector((state) => state.post.selectedPost);
  const pSize = useSelector((state) => state.post.postSize);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    // console.log(id);
    setModal(!modal);
  };


// function refreshPage(){ 
//   window.location.reload(); 
// }
const handleDeletePost = async () => {
  axios
    .delete(`/post/${postId}`, {withCredentials: true})
    .then(() => {
      toggleModal();
      window.location.reload(); 
    })
    .catch((error) => {
      toggleModal();
      console.log(error);
    });
};

  return (
      <>
      <Button size="xs" color="transparent"  onClick={() => setModal(true)} >Delete post</Button>
      {modal &&
      // <div className="backdrop-blur-sm flex items-center justify-center w-full">
      <div className=" fixed top-20 left-0 w-full h-full flex justify-center items-center z-50">
        <div className=" mb-20  px-6  max-w-[500px] mr-[80%] text-center border-2 rounded-lg pb-8 py-1 lg:px-10 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="text-end lg:-mr-10 mb-3 ">
            <button
              className="px-3 py-1  hover:bg-red-500 rounded-sm"
              onClick={() => setModal(false)}
            >
              X
            </button>
          </div>
          <div className="text-base mb-5 mt-6">
            Are you sure you want to delete this post?
          </div>
          <div className="flex gap-14 justify-center">
            <button className="bg-red-500 dark:bg-red-700 py-2 px-4 rounded-md hover:opacity-80" onClick={() => 
              {
                handleDeletePost();
                --postSize;
                }}>
              Yes
            </button>
            <button
              className="bg-green-400 dark:bg-green-600 py-2 px-4 rounded-md hover:opacity-80"
              onClick={() => setModal(false)}
            >
              No
            </button>
          </div>
        </div>
       </div>
      }
      </>
  )
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
            <form className="flex w-full" onSubmit={handleSearch} >
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
      <div onClick={() => setOpenModal(false)} className="hidden">
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
      </div>
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
// message for un authenticate user to sign in to see notification
export function NotificationModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
    <Button className="border-0 p-0 focus:ring-0" color="transparent" size="xs" onClick={() => setOpenModal(true)} as="div">
    <HiBell className="w-6 h-6 dark:text-gray-700 text-gray-600 hover:opacity-80" />
      {/* <span className="text-sm">&nbsp; {commentLength}</span> */}
    </Button>
    <div onClick={() => setOpenModal(false)}>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center text-gray-600 dark:text-gray-300">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-400" />
            <p>Sign in to see your notification.
            </p>
            <div className="flex justify-center gap-4 pt-3">
              <Button className="bg-green-400 dark:bg-green-400" onClick={() => setOpenModal(false)}>
                <Link to={`/login`} className=""> {"Sign in"}</Link>
              </Button>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
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
        .get(`/comment/getPostComments/${postId}`, { withCredentials: true })
        .then((res) => {
          setCommentLength(res.data.length);
          // console.log(res.data.length)
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
                alt="default-user-avatar"
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


// commentModal
export function CommentModal({ postId }) {
  const [openModal, setOpenModal] = useState(false);
  const [commentLength, setCommentLength] = useState("");

  // count total comment length
  // useEffect(() => {
  //   axios
  //     .get(`/comment/getcomments`)
  //     .then((res) => {
  //       //  filters Comments By PostId
  //       const filterComments = res.data.comments.filter((post) => post.postId === postId)
  //       setCommentLength(filterComments.length);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }, []);
  useEffect(() => {
    axios
        .get(`/comment/getPostComments/${postId}`, { withCredentials: true })
        .then((res) => {
          setCommentLength(res.data.length);
          // console.log(res.data.length)
        })
        .catch((error) => {
            console.log(error.message);
        });
}, []);


  return (
    <>
      <Button className="border-0 p-0 focus:ring-0" color="transparent" size="xs" onClick={() => setOpenModal(true)} as="div">
        <FaRegComment className="text-xl" />
        <span className="text-sm">&nbsp; {commentLength}</span>
      </Button>
      <div onClick={() => setOpenModal(false)}>
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center text-gray-600 dark:text-gray-300">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-400" />
              <h3 className="mb-5 text-lg font-normal ">
                Want to comment to this post?
              </h3>
              <p>Sign in to comment to this post.
              </p>
              <div className="flex justify-center gap-4 pt-3">
                <Button className="bg-green-400 dark:bg-green-400" onClick={() => setOpenModal(false)}>
                  <Link to={`/login`} className=""> {"Sign in"}</Link>
                </Button>

              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}



// donate modal
// comment modal on user page
// export function Donate() {
//   // console.log(postId)
//   const [openModal, setOpenModal] = useState(false);
//   const { register, reset, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();

  
//     // react hook form on submit
//     const onSubmit = (donate) => {
  
//       console.log(donate)
//       axios.post(`/donate/pay`, donate)
//         .then((res) => {
//           console.log(res.data.checkout_url)
//           console.log(res.data.tx_ref)
          
//           // navigate is added exist link then add checkout_url but window is clear history and renew by new
//           window.location.replace(res.data.checkout_url); 
//         //   navigate(`/${res.data.checkout_url}`, {replace: true})
//           setOpenModal(false);
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
  
//     };
  


  
//   return (
//     <>
//       {/* <Button className="border-0 p-0 focus:ring-0" color="transparent" size="xs" onClick={() => setOpenModal(true)} as="div">
//         donate
//       </Button> */}
//       <button className='bg-yellow-400 text-black md:px-4 md:py-1 px-2 py-[2px] md:rounded-full rounded-lg hover:opacity-80'onClick={() => setOpenModal(true)}>donate</button>

//       {/* <Modal show={openModal} sizes="md" onClose={() => setOpenModal(false)} popup style={{ height: "100vh", paddingTop: "64px" }} content="h-full"> */}
//       <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>

//         {/* <Modal.Header className=" bg-[#eee] dark:bg-gray-800"><button type="submit" onClick={handleSubmit(onSubmit)} className="text-sm py-2 px-3 bg-green-500 rounded-full">Reply</button></Modal.Header> */}
//         <Modal.Header className=" bg-[#eee] dark:bg-gray-800"></Modal.Header>
//         <Modal.Body className="p-0">
         
          

//           <form className="max-w-sm mx-auto my-6  px-2" onClick={handleSubmit(onSubmit)} >
//             <h1 className="text-center text-2xl mb-8">Buy Me a Coffee</h1>
//             <div className="mb-2">
//               <label for="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
//               <input type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter amount " required 
//                 {...register("amount", { required: true, minLength: 3, maxLength:5, 
//                   validate: (value) =>
//                   value.trim() !== '' || 'amount cannot contain only spaces',
//                 })}
//               />
//                {errors.amount && errors.amount.type === "required" &&  <p className="text-red-500 text-sm mb-2"> amount required</p>}
//                {errors.amount && errors.amount.type === "minLength" && <p className="text-red-500 text-sm mb-2">amount must be at least 3 characters long</p> }
//                {errors.amount && errors.amount.type === "maxLength" && <p className="text-red-500 text-sm mb-2">amount not be more than 5 characters long</p> }
//                {errors.amount && errors.amount.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.first_name.message}</p> }
    
//             </div>
//             <div className="mb-2">
//               <label htmlFor="from" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
//               <input type="text" id="from" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="eg:- abel ge"
//                 {...register("first_name", { required: true, minLength: 3, maxLength:30, 
//                   validate: (value) =>
//                   value.trim() !== '' || 'first_name cannot contain only spaces',
//                 })}
//               />
//                {errors.first_name && errors.first_name.type === "required" &&  <p className="text-red-500 text-sm mb-2"> first_name required</p>}
//                {errors.first_name && errors.first_name.type === "minLength" && <p className="text-red-500 text-sm mb-2">first_name must be at least 3 characters long</p> }
//                {errors.first_name && errors.first_name.type === "maxLength" && <p className="text-red-500 text-sm mb-2">first_name not be more than 5 characters long</p> }
//                {errors.first_name && errors.first_name.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.first_name.message}</p> }
    
//             </div>
//             <div className="mb-2">
//               <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No.</label>
//               <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="eg:- 09123456789"
//                 {...register("phone_number", { required: true, minLength: 9, 
//                   validate: (value) =>
//                   value.trim() !== '' || 'phone_number cannot contain only spaces',
//                 })}
//               />
//                {errors.phone_number && errors.phone_number.type === "required" &&  <p className="text-red-500 text-sm mb-2"> phone_number required</p>}
//                {errors.phone_number && errors.phone_number.type === "minLength" && <p className="text-red-500 text-sm mb-2">phone_number must be at least 3 characters long</p> }
//                {/* {errors.phone_number && errors.phone_number.type === "maxLength" && <p className="text-red-500 text-sm mb-2">phone_number not be more than 30 characters long</p> } */}
//                {errors.phone_number && errors.phone_number.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.phone_number.message}</p> }
    
//             </div>
//             <div className="mb-5">
//             <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Messages (optional)
//             </label>

//             <Textarea
//                       rows="3"
//                       placeholder="Post your thought"
//                       className=" focus:ring-0 outline-none "
//                       // {...register("description", { required: false })}
//                     />
//             </div>

//             <button type="submit" className="block text-black dark:text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-xl w-full  px-5 py-2.5 text-center ">donate</button>
//           </form>

//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

