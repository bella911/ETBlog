import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import axios from "../axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";
import ScrollToTop from "../components/ScrollToTop";

function EditPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {
    axios
      .get(`/post/getpost/${id}`)
      .then((res) => {
        // console.log(res.data);
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setImage(res.data.image);
        setDescription(res.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const uploadImage = () => {
    try {
      if (!file) {
        return;
      }
      setUploadLoading(true);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            setImage(downloadURL);
            setUploadLoading(false);
          });
        }
      );
    } catch (error) {
      setUploadLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    setErrors({}); // Clear previous errors

    if (!title || !author || !description || !image) {
      return setErrors({ demo: "Please fill all the fields." });
    } else if (description.length < 200) {
      return setErrors({
        description: "Description must be at least 200 characters long",
      });
    }
    setLoading(true);

    const data = { title, author, image, description };
    axios
      .put(`/post/updatepost/${id}`, data, { withCredentials: true })
      .then((res) => {
        navigate("/");
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <div className="mt-32 mb-32 w-1/2 mx-auto">
    <div className="bg-[#eee] dark:bg-gray-800 dark:text-gray-200 ">
      <ScrollToTop/>
      <div className="max-w-screen-xl mx-auto pt-24 pb-64 px-6 lg:px-32">
        <form onSubmit={handlePost}>
          <input
            className="w-full my-4 py-2 px-3 border-[1px] outline-none  bg-transparent rounded-md"
            type="text"
            // id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className="w-full my-4 py-2 px-3 border-[1px] outline-none bg-transparent rounded-md "
            type="text"
            // id="author"
            value={author}
            disabled
            // onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />
          <div className="flex gap-5 justify-between my-4 dark:border-gray-600">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 border-[2px] outline-none rounded-md"
            />
            <button
              className="px-4 rounded-md  bg-green-300 dark:bg-green-500 dark:text-gray-800 w-20 font-semibold"
              type="button"
              onClick={uploadImage}
              disabled={loading}
            >
              {uploadLoading ? (
                <ClipLoader speedMultiplier="0.5" size="20px" />
              ) : (
                "Upload"
              )}
            </button>
          </div>
          {image && (
            <img className="my-4 max-h-80 rounded-md" src={image} alt="image" />
          )}

          <ReactQuill
            className="h-60 mt-8 mb-16"
            theme="snow"
            required
            value={description}
            onChange={setDescription}
          />

          <button
            className="w-full my-4 py-2 px-3 rounded-md bg-green-300 dark:bg-green-500 dark:text-gray-800 outline-none font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader speedMultiplier="0.5" size="20px" />
            ) : (
              "Update Post"
            )}
          </button>
          {errors.demo && <p className="text-red-500 text-xs">{errors.demo}</p>}
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditPost;
