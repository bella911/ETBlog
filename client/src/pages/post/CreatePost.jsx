import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import axios from "../../axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import ClipLoader from "react-spinners/ClipLoader";
// import MoonLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ScrollToTop from "../../components/ScrollToTop";
import { Helmet } from "react-helmet";

function CreatePost() {
  const currentUser= useSelector((state) => state.user.currentUser);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [customErrors, setCustomErrors] = useState({});
  const [cleanedDescription, setCleanedDescription] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  
  const uploadImage = async () => {

    // Allowed image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    try {
      if(!file) return;
      if (file) {
        // Check if the selected file is an allowed type
        if (allowedTypes.includes(file.type)) {
          setFile(file);
          setCustomErrors({});
        } else {
          setFile(null);
          return setCustomErrors({fileType:'Please select a valid image file (JPEG, PNG, GIF, ...).'});
        }
      }
      setUploadLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      setImage(data.secure_url);
      console.log("Image URL:", data.secure_url);
      setUploadLoading(false);

      // const storage = getStorage(app);
      // const fileName = new Date().getTime() + "-" + file.name;
      // const storageRef = ref(storage, fileName);
      // const uploadTask = uploadBytesResumable(storageRef, file);

      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     // console.log("Upload is " + progress + "% done");
      //   },
      //   (error) => {
      //     console.log(error);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       // console.log("File available at", downloadURL);
      //       setImage(downloadURL);
      //       setUploadLoading(false);
      //     });
      //   }
      // );
    } catch (error) {
      setUploadLoading(false);
    }
  };

    // we all do this description process because we using react quill and have to check validity
  //  using react-hook-form that registers the field and its validation rules
    useEffect(() => {
      register("description", { required: true, minLength: 10, maxLength: 10000 
      });
    }, [register]);
  
    const onEditorStateChange = (editorState) => {
      setValue("description", editorState);
    };
  
    const descriptionContent = watch("description");

  // on submit using hook  form
  const onSubmit = (data) => {
    
    setCustomErrors({}); // Clear previous errors
    // check image validation
    if(!file) return setCustomErrors({selectImageRequire: "Image required"})
    if (!image) return setCustomErrors({ uploadRequire: "Image upload required" });

     // remove html tags and trim
     const cleanedDescription = data.description.replace(/<[^>]*>/g, '').trim();

     //  check input only space on description
     if(cleanedDescription === "") return setCustomErrors({emptyDesc: "Description cannot contain only spaces"})
     
    // insert image and author
    data.image = image; // insert image link individually
    data.author = currentUser.username; // add author from redux
    
    setLoading(true); // only start after all validations pass
      axios
        .post("/post/create", data, { withCredentials: true })
        .then((res) => {
          setLoading(false);
          navigate("/");
          // console.log(res);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
  };

  return (
    // <div className="mt-32 mb-32 w-1/2 mx-auto">
    <div className="bg-[#eee] dark:bg-gray-800 dark:text-gray-200 ">
      <Helmet>
        <title>Create post | ETBlog</title>
        <meta name="description" content="create post and upload area" />
     </Helmet>
      <ScrollToTop/>
      <div className="max-w-screen-xl mx-auto pt-8 pb-64 px-2 lg:px-32 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full my-4 py-2 px-3 border-[1px] outline-none  rounded-md bg-transparent"
            type="text"
            placeholder="Title" 
            {...register("title", { required: true, minLength: 3, maxLength:30, 
              validate: (value) =>
              value.trim() !== '' || 'Title cannot contain only spaces',
            })}
          />
           {errors.title && errors.title.type === "required" &&  <p className="text-red-500 text-sm mb-2"> Title required</p>}
           {errors.title && errors.title.type === "minLength" && <p className="text-red-500 text-sm mb-2">Title must be at least 3 characters long</p> }
           {errors.title && errors.title.type === "maxLength" && <p className="text-red-500 text-sm mb-2">Title not be more than 30 characters long</p> }
           {errors.title && errors.title.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p> }

          <input
            className="w-full my-4 py-2 px-3 border-[1px] outline-none bg-transparent rounded-md"
            type="text"
            value={currentUser.username}
            {...register("author")}
            disabled
          />

          {/* independent upload image  */}
          <div className="flex sm:flex-row flex-col gap-5 justify-between  items-center my-4 rounded-md dark:border-gray-600">
            <input
              type="file"
              // accept=".jpg,.jpeg,.png,.gif" // Restrict file types
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border-[2px] outline-none rounded-md"
            />
            {customErrors.selectImageRequire && (<p className="text-red-500 text-sm sm:hidden">{customErrors.selectImageRequire}</p>)}
          {customErrors.uploadRequire && (<p className="text-red-500 text-sm sm:hidden">{customErrors.uploadRequire}</p>)}
          {customErrors.fileType && (<p className="text-red-500 text-sm sm:hidden ">{customErrors.fileType}</p>)}

            <button
              className="px-4 rounded-lg py-2 bg-green-300 dark:bg-green-500 dark:text-gray-800 w-20 font-semibold"
              type="button"
              onClick={() => {
                if(file) setCustomErrors({}); // clear error message
                uploadImage();
              }}
              disabled={loading}
            >
              {uploadLoading ? (
                <ClipLoader speedMultiplier="0.5" size="20px" />
              ) : (
                "Upload"
              )}
            </button>
          </div>
          {customErrors.selectImageRequire && (<p className="text-red-500 text-md sm:block hidden">{customErrors.selectImageRequire}</p>)}
          {customErrors.uploadRequire && (<p className="text-red-500 text-md sm:block hidden">{customErrors.uploadRequire}</p>)}
          {customErrors.fileType && (<p className="text-red-500 text-md sm:block hidden ">{customErrors.fileType}</p>)}

          {image && <img className="my-4 max-h-80" src={image} alt="image" /> }

          <ReactQuill
            className="h-60 mt-8 mb-16 rounded-md "
            theme="snow"
            // required
            value={descriptionContent}
            onChange={onEditorStateChange}
            // {...register("description", { required: true, minLength: 10, maxLength:500 })}
          />
          {errors.description && errors.description.type === "required" &&  <p className="text-red-500 text-sm mb-2">Description required</p>}
           {errors.description && errors.description.type === "minLength" && <p className="text-red-500 text-sm mb-2">Description must be at least 10 characters long</p> }
           {errors.description && errors.description.type === "maxLength" && <p className="text-red-500 text-sm mb-2">Description not be more than 10000 characters long</p> }
          {customErrors.emptyDesc && (<p className="text-red-500 text-md sm:block hidden">{customErrors.emptyDesc}</p>)}
          <button
            className="w-full my-4 py-2 px-3 md:py-3 md:text-base rounded-md bg-green-300 dark:bg-green-500 dark:text-gray-800 outline-none font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader speedMultiplier="0.5" size="20px" />
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreatePost;
