import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea, Dropdown } from 'flowbite-react';
import { useForm } from "react-hook-form";
import { FaEllipsisH } from "react-icons/fa";
import axios from "../axios";


// import { set } from 'mongoose';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        axios
            .get(`/user/${comment.userId}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = () => {
        axios
            .put(`/comment/editComment/${comment._id}`, { content: editedContent }, { withCredentials: true })
            .then((res) => {
                setIsEditing(false);
                onEdit(comment, editedContent);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }


    return (
        <div className='flex p-4  dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img
                    className='w-10 h-10 rounded-full bg-gray-200'
                    src={user.profilePicture}
                    alt={user.username}
                />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1 justify-between'>
                    <div>
                        <span className='font-bold mr-1 text-xs truncate'>
                            {user ? `@${user.username}` : 'anonymous user'}
                        </span>
                        <span className='text-gray-500 text-xs'>
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                </div>
                {isEditing ? (
                    <div className=" flex"  >
                        {currentUser &&
                            <div className='flex-1 px-2'>
                                <textarea
                                    rows="1"
                                    className={` px-1 w-full text-sm bg-[#eee] dark:text-gray-400 text-gray-800 dark:bg-gray-800  border-0  resize-none border-b-[2px] border-gray-600 overflow-visible `}
                                    required
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                                <div className='flex justify-between items-center'>
                                    <div className='py-1 px-2 sm:py-2 sm:px-3 rounded-full hover:bg-gray-200'>😊</div>
                                    <div className='flex gap-8'>
                                        <button className='py-1 px-2 sm:py-2 sm:px-4  border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600  rounded-full text-sm' type="button"
                                            onClick={() => setIsEditing(false)}>Cancel</button>
                                        <button className='py-1 px-2 sm:py-2 sm:px-4 border border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm' onClick={handleSave}>Save</button>
                                    </div>
                                </div>
                            </div>}
                    </div>
                ) : (
                    <>
                        <p className='text-gray-500 pb-2 overflow-hidden lg:max-w-2xl sm:max-w-xs max-w-52'>{comment.content.trim()}</p>
                        <div className='flex items-center pt-2 text-xs  dark:border-gray-700 max-w-fit gap-2'>
                            <button
                                type='button'
                                onClick={() => onLike(comment._id)}
                                className={`text-gray-400 hover:text-blue-500 ${currentUser &&
                                    comment.likes.includes(currentUser._id) &&
                                    '!text-blue-500'
                                    }`}
                            >
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes +
                                    ' ' +
                                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                            </p>
                            {currentUser &&
                                (currentUser._id === comment.userId) && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={handleEdit}
                                            className='text-gray-400 hover:text-blue-500'
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => onDelete(comment._id)}
                                            className='text-gray-400 hover:text-red-500'
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}