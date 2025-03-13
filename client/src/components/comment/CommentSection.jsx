import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { useForm } from "react-hook-form";
import axios from "../../axios";

import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ postId }) {
    const { register, reset, formState: { errors } } = useForm();
    const [customErrors, setCustomErrors] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // console.log(comment)
        e.preventDefault();

        setCustomErrors({}); // Clear previous errors

        if (comment.trim().length == 0) return setCustomErrors({ emptyComment: "Title cannot contain only spaces" })

        if (comment.length > 200) {
            return;
        }

        axios
            .post("/comment/create", { content: comment, postId, userId: currentUser._id }, { withCredentials: true })
            .then((res) => {
                setComment('');
                setCommentError(null);
                setComments([res.data, ...comments]);
            })
            .catch((error) => {
                setCommentError(error.message);
            });
    }

    useEffect(() => {
        axios
            .get(`/comment/getPostComments/${postId}`, { withCredentials: true })
            .then((res) => {
                setComments(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [postId]);

    const handleLike = async (commentId) => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        axios
            .put(`/comment/likeComment/${commentId}`, { withCredentials: true })
            .then((res) => {
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                likes: res.data.likes,
                                numberOfLikes: res.data.likes.length,
                            }
                            : comment
                    )
                );
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };

    const handleDelete = async (commentId) => {
        setShowModal(false);

        if (!currentUser) {
            navigate('/login');
            return;
        }

        axios
            .delete(`/comment/deleteComment/${commentId}`, { withCredentials: true })
            .then((res) => {
                setComments(comments.filter((comment) => comment._id !== commentId));
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // clear all the character that writing comment 
    const handleClear = () => {
        setComment("");
    }

    return (
        <div className='max-w-3xl mx-auto p-3'>
            {!currentUser && (
                <div className='text-base text-green-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-500 hover:underline' to={'/login'}>
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form className="mb-6 flex" onSubmit={handleSubmit}>
                    {/* for commenter image */}
                    <div className='w-12 flex justify-center pt-1'>
                        <img className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                            src={currentUser.profilePicture}
                            alt="author-image" />
                    </div>
                    {/* for user post and post buttons */}
                    {currentUser &&
                        <div className='flex-1 px-2'>
                            <div className='flex gap-1'>
                                <textarea
                                    rows="1"
                                    className={` px-1 w-full text-sm bg-[#eee] dark:text-gray-400 text-gray-800 dark:bg-gray-800  border-0  resize-none border-b-[2px] border-gray-600 overflow-visible `}
                                    placeholder="Add a comment..."
                                    required
                                    maxLength='200'
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                />
                                <span className='text-gray-500 text-xs flex items-end'> {250 - comment.length}/250</span>
                            </div>
                            {customErrors.emptyComment && (<p className="text-red-500 text-sm ">{customErrors.emptyComment}</p>)}
                            <div className='flex justify-between items-center'>
                                <div className='py-1 px-2 sm:py-2 sm:px-3 rounded-full hover:bg-gray-200'>😊</div>
                                <div className='flex gap-8'>
                                    <button className='py-1 px-2 sm:py-2 sm:px-4  border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600  rounded-full text-sm' type="button"
                                        onClick={() => handleClear()}>Cancel</button>
                                    <button className='py-1 px-2 sm:py-2 sm:px-4 border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm' type="submit">Comment</button>
                                </div>
                            </div>
                        </div>}
                </form>
            )}
            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                                setShowModal(true);
                                setCommentToDelete(commentId);
                            }}
                        />
                    ))}
                </>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button
                                color='failure'
                                onClick={() => handleDelete(commentToDelete)}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}