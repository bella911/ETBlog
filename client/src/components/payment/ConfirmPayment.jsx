import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
function ConfirmPayment() {
  const { txId } = useParams();
  const navigate = useNavigate();
  const confirm = async () => {
    await axios
      .get(`/donate/verify-pay/${txId}`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <div className="bg-[#eee]   dark:bg-gray-800 px-1 text-center">
      <div className="max-w-screen-xl mx-auto text-center pt-16 pb-64   min-h-[70vh]  ">
        <div className="flex justify-center mb-6">
          <GiConfirmed className="text-8xl text-green-600 block text-center"/>
        </div>
        <button onClick={confirm} className="bg-yellow-600 px-4 py-2 rounded-full text-white">Confirm Payment</button>
      </div>
    </div>
  );
}

export default ConfirmPayment;
