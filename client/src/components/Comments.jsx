import React, { useState, useEffect } from 'react'
import { Button, Tooltip, Dropdown, Accordion } from "flowbite-react";
import { BiDislike, BiLike, BiReply } from 'react-icons/bi';
import { FaEllipsisH } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import axios from "../axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {FollowModal} from "./Modal"

function Comments({ postId }) {
    const [loading, setLoading] = useState(false);
    const [replyModal, setReplyModal] = useState(false);
    const [repliesModal, setRepliesModal] = useState(false);
    const [commentModal, setCommentModal] = useState(true);
    const [addComment, setAddComment] = useState('');
    const [comments, setComments] = useState([]);
    const [refreshComment, setRefreshComment] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    // const [commentedUser, setCommentedUser] = useState({username: "", profilePicture: ""})
    const [commentedUser, setCommentedUser] = useState([])
    const repliesToggleModal = () => { setRepliesModal(!repliesModal) }; // for expand replies comments
    const replyToggleModal = () => { setReplyModal((prevState) => !prevState) }; // expand reply posted form
    const commentToggleModal = () => { setCommentModal(!commentModal) }; // expand reply posted 
    const currentUser = useSelector((state) => state.user.currentUser);

    // fetch commented users
    useEffect(() => {
        axios
            .get(`/post/commentedusers/${postId}`, { withCredentials: true })
            .then((res) => {
                setCommentedUser(res.data);
                // console.log("commented user",res.data);
                // commenterInfo(res.data.comments._id)
            })
            .catch((error) => console.log(error.message))
    }, [refreshComment])


    // get post comment with id
    useEffect(() => {
        axios
            .get(`/post/getpost/${postId}`, { withCredentials: true })
            .then((res) => {
                setComments(res.data.comments)
                // commenterInfo(res.data.comments._id)
                // console.log(res.data.comments)
            })
            .catch((error) => console.log(error.message))
    }, [refreshComment])


    // fetch commented user
    // const commenterInfo = (cId) =>{
    //     axios
    //     .get(`/auth/getme`, { withCredentials: true })
    //     .then((res) => {
    //         console.log("commented user", res.data)
    //     })
    //     .catch((error) => console.log(error.message))
    // }

    // handle change
    // const  handleChange = (event) => {
    //     setInputValue(event.target.value);
    // };


    // add new comment on post and fetch descending

    // const handleComment = (event) => {
    //     event.preventDefault();
    //     alert(`Name: ${addComment}`);
    //     console.log("add comment reach post: ", addComment)

    //     setLoading(true);

    //     useEffect(() => {
    //         axios
    //             .post(`/post/comment/${postId}`, addComment, { withCredentials: true })
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setLoading(true);

    //             })
    //             .catch((error) => {
    //                 console.log(error.message)
    //                 setLoading(true);
    //             })
    //     }, [])
    // }

    // react hook form on submit
    const onSubmit = (comment) => {
        // console.log(comment, postId);
        // setLoading(true)
        setRefreshComment(false)

        axios.post(`/post/comment/${postId}`, comment, { withCredentials: true })
            .then((res) => {
             setRefreshComment(true)
            })
            .catch((error) => {
                setRefreshComment(false)
                console.log(error.message);
                setLoading(false);

            });

        reset(); // rest all value stored on register react hook

    };

    // delete Comment

    const deleteComment = async (commentId) => {
        setRefreshComment(false)
        // postId comes from child
        try {
            const res = await axios.delete(`post/${postId}/comment/${commentId}`, { withCredentials: true })
            // console.log(res.data)
            setRefreshComment(true)

        } catch (error) {
            console.log(error.message)
            setRefreshComment(false)

        }
    }


    const addCommentUI = (
        <form className="mb-6 flex" onSubmit={handleSubmit(onSubmit)}  >
            {/* for commenter image */}
            <div className='w-12 flex justify-center pt-1'>
                <img className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    alt="author-image" />
            </div>
            {/* for user post and post buttons */}
                <div className='flex-1 px-2'>
                {currentUser?
                <textarea
                    rows="1"
                    className={` px-1 w-full text-sm bg-[#eee] dark:text-gray-400 text-gray-800 dark:bg-gray-800  border-0  resize-none border-b-[2px] border-gray-600 overflow-visible `}
                    placeholder="Add a comment..."
                    {...register("text", { required: true })}
                    required
                // value={addComment}
                // onChange={(e) => setAddComment(e.target.value)}
                />:
                <textarea
                    rows="1"
                    className={`px-1 w-full text-sm bg-[#eee] dark:text-gray-400 text-gray-800 dark:bg-gray-800  border-0  resize-none border-b-[2px] border-gray-600 overflow-visible`}
                    placeholder="Add a comment..."
                    required
                    disabled
                />
                }
                
                {currentUser &&
                <>
                {errors.text && <p className='text-sm text-red-600'>Comment is required</p>}
                <div className='flex justify-between items-center'>
                    <div className='py-1 px-2 sm:py-2 sm:px-3 rounded-full hover:bg-gray-200'>😊</div>
                     <div className='flex gap-8'>
                        <button className='py-1 px-2 sm:py-2 sm:px-4  border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600  rounded-full text-sm' type="button"
                            onClick={() => reset()}>Cancel</button>
                        <button className='py-1 px-2 sm:py-2 sm:px-4 border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm' type="submit">Comment</button>
                    </div>
                </div> </>}
            </div>
        </form>
    )

    return (
        // <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <section className="bg-[#eee] dark:bg-gray-800 py-1 antialiased sm:p-2 rounded-md">
            <div className="max-w-3xl mx-auto ">
                <div className="flex justify-between items-center mb-6 p-1">
                    <h2 className="text-lg lg:text-2xl font-bold dark:text-gray-400 text-gray-800">{comments?.length} Comments</h2>
                </div>
                {/* add comment template */}
                {addCommentUI}

                {/* for user first post */}
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <div className='flex mb-4'>
                            {/* for image */}
                            <div className='w-12 flex justify-center py-3'>
                                <img className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                                    // src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    src={commentedUser.profilePicture}
                                    alt="Comments image" />
                            </div>
                            {/* article */}
                            <article className="flex-1 px-2 py-1 text-base bg-[#eee] rounded-lg dark:bg-gray-800">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm dark:text-gray-400 text-gray-800 font-semibold">
                                            {commentedUser.username}</p>
                                        <p className="text-sm dark:text-gray-400 text-gray-800"><time dateTime="2022-02-08"
                                            title="February 8th, 2022">{new Date().toDateString().slice(3, 10)}</time></p>
                                    </div>

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
                                </footer>
                                {/* <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                instruments for the UX designers. The knowledge of the design tools are as important as the
                                creation of the design strategy.</p> */}
                                <p className="dark:text-gray-400 text-gray-800">{comment.text}</p>
                                <div className="flex items-center mt-2 space-x-4 text-xs">
                                    <button className='flex items-center'><BiLike /><span className='dark:text-gray-400 text-gray-800'>&nbsp;</span>
                                    </button>
                                    <button><BiDislike /></button>
                                    <button type="button"
                                        onClick={replyToggleModal}
                                        className="flex items-center  text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                        Reply
                                    </button>
                                </div>
                                {replyModal && addCommentUI}  {/* reply post forms*/}
                            </article>
                        </div>




                        {/* for replies post */}
                        {/* <Accordion className='border-none' collapseAll>
                            <Accordion.Panel >
                                <Accordion.Title color='transparent' className='text-blue-600 dark:text-blue-600 hover:bg-transparent w-32 flex  flex-row-reverse py-0 ml-6   text-sm focus:ring-0 -mt-2 mb-3'>1k replies</Accordion.Title>
                                <Accordion.Content color='transparent' className='dark:bg-transparent border-none py-0' >
                                    <div className=' ml-14 lg:ml-12' >
                                        <div className='flex mb-3 ml-6 lg:ml-12'>
                                            {/* for image */}
                                            {/* <div className='w-12 flex justify-center py-3'>
                                                <img className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                    alt="Comments image" />
                                            </div> */}
                                            {/* article */}
                                            {/* <article className="flex-1 p-3 text-base bg-[#eee] rounded-lg dark:bg-gray-800">
                                                <footer className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center">
                                                        <p className="inline-flex items-center mr-3 text-sm dark:text-gray-400 text-gray-800 font-semibold">
                                                            Jese Leos</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-12"
                                                            title="February 12th, 2022">Feb. 12, 2022</time></p>
                                                    </div> */}
                                                    {/* reply Comment settings */}
                                                    {/* <Dropdown label={<FaEllipsisH />} dismissOnClick={false} arrowIcon="" size="sm" color='transparent'>
                                                        <Dropdown.Item>Edit</Dropdown.Item>
                                                        <Dropdown.Item>Delete</Dropdown.Item>
                                                    </Dropdown>

                                                </footer>
                                                <p className="dark:text-gray-400 text-gray-800">Much appreciated! Glad you liked it ☺️. </p>
                                                <div className="flex items-center mt-4 space-x-4">
                                                    <button className='flex items-center'><BiLike /><span>&nbsp;1k</span>
                                                    </button>
                                                    <button><BiDislike /></button>
                                                    <button type="button"
                                                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                                        Reply
                                                    </button>
                                                </div>
                                            </article>
                                        </div>
                                    </div> */}
                                {/* </Accordion.Content>
                            </Accordion.Panel>
                        </Accordion > */} 
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Comments