import { useEffect, useState } from "react";
import axios from "../axios";
import ClipLoader from "react-spinners/ClipLoader";

function Subscribe() {
  const [counter, setCounter] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  // const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  let existEmails = [];

  useEffect(() => {
    axios
      .get("/getSubscriber")
      .then((res) => {
        // console.log(res.data);
        setCounter(res.data.length);
        existEmails = res.data.map((e) => e.email);
        // console.log(existEmails);
        // console.log(existEmails.includes(email));
      })
      .catch((error) => console.log(error.message));
  }, [counter]);

  const addSubscriber = (e) => {
    e.preventDefault();

    setError({});

    if (existEmails.includes(email)) {
      return setError({ message: "You already subscribed" });
    }

    setLoading(true);

    axios
      .post("/subscribe", { email })
      .then(() => {
        setLoading(false);
        setEmail("");
        setCounter(counter + 1);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        return setError({ message: "You already subscribed" });
      });
  };

  return (
    <form
      className="py-12 my-16 border-t-2 border-green-200"
      onSubmit={addSubscriber}
    >
      <div className="font-semibold border-b-2 border-green-400">
        Subscribe To <span className="text-green-300">ET Blogs</span> Via Email
      </div>
      <div className="py-4">
        <input
          type="email"
          required
          placeholder="Email address"
          className="border-2 w-full py-[3px]  px-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      </div>
      <button
        type="submit"
        className="min-w-[120px] block mb-0 font-semibold rounded-2xl dark:text-gray-800 dark:bg-green-500  border-green-400 hover:bg-green-300 border-2 px-4 py-[1px]"
      >
        {loading ? (
          <ClipLoader speedMultiplier="0.5" size="20px" />
        ) : (
          "Subscribe"
        )}
      </button>
      {error.message && <p className="text-red-500 text-xs">{error.message}</p>}

      <small className="font-medium">{`Join ${counter} other subscribers`}</small>
    </form>
  );
}

export default Subscribe;
