import React, { useState, useEffect } from 'react'
import { Button, Tooltip, Dropdown, Accordion } from "flowbite-react";
import { BiDislike, BiLike, BiReply } from 'react-icons/bi';
import { FaEllipsisH } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import axios from "../../axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {FollowModal} from "../Modal"
import AddCommentUI from './AddCommentUI';

function OldVersionComment({ postId }) {
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


   

    return (
        // <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <section className="bg-[#eee] dark:bg-gray-800 py-1 antialiased sm:p-2 rounded-md">
            <div className="max-w-3xl mx-auto ">
                <div className="flex justify-between items-center mb-6 p-1">
                    <h2 className="text-lg lg:text-2xl font-bold dark:text-gray-400 text-gray-800">{comments?.length} Comments</h2>
                </div>
                {/* add comment template */}
                <AddCommentUI/>

                {/* for user first post */}
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <div className='flex mb-4 '>
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
                                <p className="dark:text-gray-400 text-gray-800 overflow-hidden lg:max-w-2xl sm:max-w-xs max-w-52">{comment.text}</p>
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
                                {replyModal && <AddCommentUI/>}  {/* reply post forms*/}
                            </article>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default OldVersionComment