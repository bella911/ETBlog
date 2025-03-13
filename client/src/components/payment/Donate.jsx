import axios from "../../axios"
import { Textarea } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function Donate() {
    // console.log(postId)
    const [openModal, setOpenModal] = useState(false);
    // const [commentLength, setCommentLength] = useState("");
    // const { currentUser } = useSelector((state) => state.user);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
  
    
    // react hook form on submit
    const onSubmit = (donate) => {
  
      console.log(donate)
      axios.post(`/donate/pay`, donate)
        .then((res) => {
          console.log(res.data.checkout_url)
          console.log(res.data.tx_ref)
          
          // navigate is added exist link then add checkout_url but window is clear history and renew by new
          window.location.replace(res.data.checkout_url); 
        //   navigate(`/${res.data.checkout_url}`, {replace: true})
          setOpenModal(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
  
    };
  
  
    
    return (
      <>
        {/* <Button className="border-0 p-0 focus:ring-0" color="transparent" size="xs" onClick={() => setOpenModal(true)} as="div">
          donate
        </Button> */}
        {/* <button className='bg-yellow-400 text-black px-4 py-1 rounded-full hover:opacity-80'onClick={() => setOpenModal(true)}>donate</button> */}
  
        {/* <Modal show={openModal} sizes="md" onClose={() => setOpenModal(false)} popup style={{ height: "100vh", paddingTop: "64px" }} content="h-full"> */}
        {/* <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup> */}
  
          {/* <Modal.Header className=" bg-[#eee] dark:bg-gray-800"><button type="submit" onClick={handleSubmit(onSubmit)} className="text-sm py-2 px-3 bg-green-500 rounded-full">Reply</button></Modal.Header> */}
          {/* <Modal.Header className=" bg-[#eee] dark:bg-gray-800"></Modal.Header>
          <Modal.Body className="p-0"> */}
           
            
  
            <form className="max-w-sm mx-auto my-6  px-2" onClick={handleSubmit(onSubmit)} >
              <h1 className="text-center text-2xl mb-8">Buy Me a Coffee</h1>
              <div className="mb-2">
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <input type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter amount " required 
                  {...register("amount", { required: true, minLength: 3, maxLength:5, 
                    validate: (value) =>
                    value.trim() !== '' || 'amount cannot contain only spaces',
                  })}
                />
                 {errors.amount && errors.amount.type === "required" &&  <p className="text-red-500 text-sm mb-2"> amount required</p>}
                 {errors.amount && errors.amount.type === "minLength" && <p className="text-red-500 text-sm mb-2">amount must be at least 3 characters long</p> }
                 {errors.amount && errors.amount.type === "maxLength" && <p className="text-red-500 text-sm mb-2">amount not be more than 5 characters long</p> }
                 {errors.amount && errors.amount.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.first_name.message}</p> }
      
              </div>
              <div className="mb-2">
                <label htmlFor="from" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
                <input type="text" id="from" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="eg:- abel ge"
                  {...register("first_name", { required: true, minLength: 3, maxLength:30, 
                    validate: (value) =>
                    value.trim() !== '' || 'first_name cannot contain only spaces',
                  })}
                />
                 {errors.first_name && errors.first_name.type === "required" &&  <p className="text-red-500 text-sm mb-2"> first_name required</p>}
                 {errors.first_name && errors.first_name.type === "minLength" && <p className="text-red-500 text-sm mb-2">first_name must be at least 3 characters long</p> }
                 {errors.first_name && errors.first_name.type === "maxLength" && <p className="text-red-500 text-sm mb-2">first_name not be more than 5 characters long</p> }
                 {errors.first_name && errors.first_name.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.first_name.message}</p> }
      
              </div>
              <div className="mb-2">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No.</label>
                <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="eg:- 09123456789"
                  {...register("phone_number", { required: true, minLength: 9, 
                    validate: (value) =>
                    value.trim() !== '' || 'phone_number cannot contain only spaces',
                  })}
                />
                 {errors.phone_number && errors.phone_number.type === "required" &&  <p className="text-red-500 text-sm mb-2"> phone_number required</p>}
                 {errors.phone_number && errors.phone_number.type === "minLength" && <p className="text-red-500 text-sm mb-2">phone_number must be at least 3 characters long</p> }
                 {/* {errors.phone_number && errors.phone_number.type === "maxLength" && <p className="text-red-500 text-sm mb-2">phone_number not be more than 30 characters long</p> } */}
                 {errors.phone_number && errors.phone_number.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.phone_number.message}</p> }
      
              </div>
              <div className="mb-5">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Messages (optional)
              </label>
  
              <Textarea
                        rows="3"
                        placeholder="Post your thought"
                        className=" focus:ring-0 outline-none "
                        // {...register("description", { required: false })}
                      />
              </div>
  
              <button type="submit" className="block text-black dark:text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-xl w-full  px-5 py-2.5 text-center ">donate</button>
            </form>
  
          {/* </Modal.Body>
        </Modal> */}
      </>
    );
  }
  
  export default Donate