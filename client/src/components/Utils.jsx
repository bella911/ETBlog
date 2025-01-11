import React,{useState, useEffect} from 'react'
import axios from "../axios"
import { FaRegComment } from "react-icons/fa";

export function TotalComments({postId}) {
    const [commentLength, setCommentLength] = useState("");

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

    return (
        <div className='flex items-center'>
        <FaRegComment className="text-xl" />
        <span className="text-sm">&nbsp; {commentLength}</span>
        </div>
    )
}

