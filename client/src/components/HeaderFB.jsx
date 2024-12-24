import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  DarkThemeToggle,
  TextInput,
  DropdownItem,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import logoMain from "../images/logo-main.png";
// import bella_logo from "../images/bella_logo_main.png";
import { AiOutlineSearch } from "react-icons/ai";
import { CiLogin, CiLogout } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import axios from "../axios";
import { signOut } from "../redux/authSlice";
import { HiViewGrid } from "react-icons/hi";
import { linkWithCredential } from "firebase/auth";
import { FollowModal, SearchModal } from "../components/Modal";
import { FaSearch } from "react-icons/fa";

// import Logout from "../pages/Logout";
// import Cookies from 'js-cookie';

export default function HeaderFB() {
  const path = useLocation().pathname; // change current clicked tabs
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  // console.log(currentUser);


  function logout() {
    axios
      .post("/auth/logout")
      .then((res) => {
        dispatch(signOut());
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // search
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("");
  useEffect(() => {
    setSearchParams(query);
  }, [id]);

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    if (query.length < 3) {
      return setError("Enter at least 3 character");
    }
    const urlP = new URLSearchParams(location.search);
    urlP.set("query", query);
    const searchQuery = urlP.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="bg-[#eee] dark:bg-gray-800 ">
      <Navbar
        className="max-w-screen-xl mx-auto  border-b dark:border-gray-700 bg-[#eee] dark:bg-gray-800 "
      >
        <div className="flex">
          {/* <Navbar.Toggle /> */}
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
          >
            {/* header logo */}
            <svg
              viewBox="0 0 300 97.72330871596895"
              className="md:w-auto w-24 h-10 "
            >
              <g
                featurekey="nameFeature-0"
                transform="matrix(2.6168876622227972,0,0,2.6168876622227972,2.1447065684535184e-7,-26.796924070886288)"
                fill="#0ea47a"
                data-darkreader-inline-fill=""
              >
                <path d="M0 40 l0 -29.76 l17.32 0 l0 8.36 l-10.48 0 l0 3.68 l8.6 0 l0 5.96 l-8.6 0 l0 3.4 l10.48 0 l0 8.36 l-17.24 0 l-0.08 0 z M19.32 20.48 l0 -10.24 l21.76 0 l0 10.24 l-7.48 0 l0 19.52 l-6.8 0 l0 -19.52 l-7.48 0 z M61.44 23.6 c2.4 0.88 3.28 2.52 3.28 5.04 l0 5.28 c0 4.08 -1.6 6.08 -9.68 6.08 l-11.96 0 l0 -5.96 l1.84 0 l0 -16.92 l-1.84 0 l0 -6.88 l11.6 0 c6.92 0 8.28 1.72 8.28 5.2 l0 4.52 c0 1.64 -0.44 2.8 -1.52 3.64 z M52.48 15.8 l0 6.84 c0.32 0.08 0.72 0.16 1.24 0.16 c1.84 0 2.44 -0.64 2.44 -2.12 l0 -2.88 c0 -1.44 -0.4 -2.16 -2.44 -2.16 c-0.52 0 -0.92 0.04 -1.24 0.16 z M56.76 32.32 l0 -3 c0 -1.48 -0.72 -2.12 -2.84 -2.12 c-0.6 0 -1.08 0.04 -1.44 0.12 l0 7.04 c0.36 0.12 0.84 0.2 1.44 0.2 c2.36 0 2.84 -0.76 2.84 -2.24 z M72.2 32.480000000000004 l19.2 0 l0 7.52 l-24.68 0 l0 -29.76 l5.48 0 l0 22.24 z M81.8 10.239999999999998 c6.24 0 7.48 2.08 7.48 6.36 l0 8.44 c0 4.28 -1.84 6.12 -7.48 6.12 c-5.68 0 -7.48 -1.92 -7.48 -6.12 l0 -8.44 c0 -4.2 1.84 -6.36 7.48 -6.36 z M85.32 22.16 l0 -3.04 c0 -1.52 -0.52 -2.24 -3.12 -2.24 c-2.36 0 -3.12 0.76 -3.12 2.24 l0 3.04 c0 1.48 0.72 2.16 3.12 2.16 c2.36 0 3.12 -0.64 3.12 -2.16 z M104 10.239999999999998 c8 0 10.64 2.6 10.64 8.68 l0 2.6 l-5.64 0 c-0.04 -2.44 -1.16 -3.44 -4.44 -3.44 c-3.36 0 -4.44 1.12 -4.44 3.64 l0 7.88 c0 2.48 1.12 3.8 4.44 3.8 c3.56 0 4.36 -1.16 4.44 -3.48 l-5.52 0 l0 -6.48 l11.16 0 l0 7.52 c0 6.08 -1.76 9.04 -10.64 9.04 c-8 0 -10.6 -3.08 -10.6 -9.04 l0 -12.04 c0 -5.96 2.52 -8.68 10.6 -8.68 z"></path>
              </g>
              <g
                featurekey="sloganFeature-0"
                transform="matrix(0.48035836305368684,0,0,0.48035836305368684,29.231426435871928,86.29077866745925)"
                fill="#0ea47a"
                data-darkreader-inline-fill=""
              >
                <path d="M6.93 9.99 c2.84 0 4.49 2.23 4.49 5.13 s-1.69 5.13 -4.49 5.13 c-1.4 0 -2.44 -0.57 -3.17 -1.41 l0 4.66 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.56 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -13 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.56 0 c0.18 0 0.3 0.12 0.3 0.3 l0 1.14 l0.2 0 c0.54 -0.91 1.47 -1.65 2.97 -1.65 z M6.5 18.27 c1.87 0 2.83 -1.29 2.83 -3.17 s-0.96 -3.13 -2.83 -3.13 c-1.7 0 -2.76 1.25 -2.76 3.13 s1.06 3.17 2.76 3.17 z M29.2935 20.26 c-2.85 0 -5.15 -2.26 -5.15 -5.14 c0 -2.87 2.3 -5.14 5.15 -5.14 c2.84 0 5.14 2.27 5.14 5.14 c0 2.88 -2.3 5.14 -5.14 5.14 z M29.2935 18.25 c1.72 0 3.05 -1.4 3.05 -3.13 c0 -1.72 -1.33 -3.14 -3.05 -3.14 c-1.73 0 -3.06 1.42 -3.06 3.14 c0 1.73 1.33 3.13 3.06 3.13 z M60.06699999999999 10.2 c0.22 0 0.29 0.12 0.24 0.34 l-2.41 9.22 c-0.04 0.16 -0.2 0.24 -0.36 0.24 l-1.85 0 c-0.16 0 -0.31 -0.08 -0.36 -0.24 l-1.78 -7.01 l-1.8 7.01 c-0.04 0.16 -0.2 0.24 -0.36 0.24 l-1.85 0 c-0.16 0 -0.31 -0.08 -0.36 -0.24 l-2.39 -9.22 c-0.06 -0.22 0.02 -0.34 0.24 -0.34 l1.45 0 c0.16 0 0.32 0.08 0.36 0.24 l1.68 7.09 l1.9 -7.09 c0.05 -0.16 0.2 -0.24 0.36 -0.24 l1.52 0 c0.16 0 0.32 0.08 0.36 0.24 l1.91 7.09 l1.69 -7.09 c0.03 -0.16 0.19 -0.24 0.36 -0.24 l1.45 0 z M77.6505 9.98 c2.96 0 4.74 2.27 4.74 4.89 c0 0.74 -0.09 1.11 -0.65 1.11 l-6.99 0 c0.23 1.52 1.5 2.5 3.31 2.5 c1.05 0 1.78 -0.32 2.45 -0.83 c0.16 -0.12 0.28 -0.15 0.43 0 l0.66 0.66 c0.15 0.15 0.16 0.29 0 0.45 c-0.95 0.95 -2.19 1.5 -3.76 1.5 c-3.12 0 -5.19 -2.26 -5.19 -5.14 s2.07 -5.14 5 -5.14 z M77.6605 11.83 c-1.53 0 -2.67 1 -2.89 2.59 l5.72 0 c-0.16 -1.57 -1.27 -2.59 -2.83 -2.59 z M101.27399999999999 9.98 c2.16 0 3.75 1.32 3.75 3.81 c0 0.19 -0.1 0.3 -0.29 0.32 l-1.56 0.22 c-0.19 0.03 -0.3 -0.08 -0.32 -0.27 c-0.09 -1.46 -0.99 -2.07 -2.27 -2.07 c-2.02 0 -2.96 1.69 -2.96 2.29 l0 5.42 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.56 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -9.2 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.48 0 c0.18 0 0.28 0.12 0.3 0.3 l0.08 1.32 l0.22 0 c0.64 -0.94 1.83 -1.84 3.43 -1.84 z M145.321 10.2 c0.22 0 0.33 0.12 0.24 0.34 l-5.4 13.02 c-0.06 0.16 -0.2 0.24 -0.36 0.24 l-1.56 0 c-0.22 0 -0.33 -0.12 -0.24 -0.34 l1.43 -3.44 l-3.97 -9.48 c-0.09 -0.22 0.02 -0.34 0.24 -0.34 l1.56 0 c0.16 0 0.3 0.08 0.36 0.24 l2.89 7.13 l2.88 -7.13 c0.07 -0.16 0.2 -0.24 0.36 -0.24 l1.57 0 z M163.2245 20.26 c-2.85 0 -5.15 -2.26 -5.15 -5.14 c0 -2.87 2.3 -5.14 5.15 -5.14 c2.84 0 5.14 2.27 5.14 5.14 c0 2.88 -2.3 5.14 -5.14 5.14 z M163.2245 18.25 c1.72 0 3.05 -1.4 3.05 -3.13 c0 -1.72 -1.33 -3.14 -3.05 -3.14 c-1.73 0 -3.06 1.42 -3.06 3.14 c0 1.73 1.33 3.13 3.06 3.13 z M190.248 10.2 c0.18 0 0.3 0.12 0.3 0.3 l0 9.2 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.48 0 c-0.18 0 -0.28 -0.12 -0.3 -0.3 l-0.08 -1.33 l-0.2 0 c-0.61 0.95 -1.67 1.85 -3.27 1.85 c-2.1 0 -3.58 -1.42 -3.58 -4.04 l0 -5.68 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.56 0 c0.18 0 0.3 0.12 0.3 0.3 l0 5.36 c0 1.67 0.88 2.38 2.29 2.38 c1.76 0 2.6 -1.65 2.6 -2.09 l0 -5.65 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.56 0 z M209.7815 9.98 c2.16 0 3.75 1.32 3.75 3.81 c0 0.19 -0.1 0.3 -0.29 0.32 l-1.56 0.22 c-0.19 0.03 -0.3 -0.08 -0.32 -0.27 c-0.09 -1.46 -0.99 -2.07 -2.27 -2.07 c-2.02 0 -2.96 1.69 -2.96 2.29 l0 5.42 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.56 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -9.2 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.48 0 c0.18 0 0.28 0.12 0.3 0.3 l0.08 1.32 l0.22 0 c0.64 -0.94 1.83 -1.84 3.43 -1.84 z M244.8285 20 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -9.2 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.33 0 c0.18 0 0.29 0.12 0.3 0.3 l0.05 0.8 l0.15 0 c0.38 -0.87 1.17 -1.32 2.18 -1.32 c0.96 0 1.68 0.41 2.06 1.32 l0.12 0 c0.43 -0.88 1.24 -1.32 2.23 -1.32 c1.59 0 2.55 0.91 2.55 3.48 l0 6.24 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.41 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -6.24 c0 -1.22 -0.41 -1.62 -1.18 -1.62 c-0.96 0 -1.37 0.72 -1.46 1.32 l0 6.54 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.37 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -6.24 c0 -1.22 -0.41 -1.62 -1.2 -1.62 c-0.93 0 -1.35 0.72 -1.44 1.32 l0 6.54 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.41 0 z M273.87199999999996 9.98 c2.96 0 4.74 2.27 4.74 4.89 c0 0.74 -0.09 1.11 -0.65 1.11 l-6.99 0 c0.23 1.52 1.5 2.5 3.31 2.5 c1.05 0 1.78 -0.32 2.45 -0.83 c0.16 -0.12 0.28 -0.15 0.43 0 l0.66 0.66 c0.15 0.15 0.16 0.29 0 0.45 c-0.95 0.95 -2.19 1.5 -3.76 1.5 c-3.12 0 -5.19 -2.26 -5.19 -5.14 s2.07 -5.14 5 -5.14 z M273.88199999999995 11.83 c-1.53 0 -2.67 1 -2.89 2.59 l5.72 0 c-0.16 -1.57 -1.27 -2.59 -2.83 -2.59 z M300.9455 6 c0.18 0 0.3 0.12 0.3 0.3 l0 13.4 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.41 0 c-0.18 0 -0.28 -0.12 -0.3 -0.3 l-0.07 -0.92 c-0.74 0.87 -1.81 1.48 -3.27 1.48 c-2.8 0 -4.56 -2.24 -4.56 -5.14 s1.71 -5.14 4.56 -5.14 c1.58 0 2.52 0.75 3 1.66 l0.19 0 l0 -5.34 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.56 0 z M296.3155 18.28 c1.77 0 2.87 -1.3 2.87 -3.18 s-1.1 -3.14 -2.87 -3.14 c-1.81 0 -2.89 1.26 -2.89 3.14 s1.08 3.18 2.89 3.18 z M319.169 8.13 c-0.7 0 -1.25 -0.55 -1.25 -1.24 c0 -0.7 0.55 -1.25 1.25 -1.25 c0.69 0 1.24 0.55 1.24 1.25 c0 0.69 -0.55 1.24 -1.24 1.24 z M323.229 18.19 c0.18 0 0.3 0.12 0.3 0.3 l0 1.21 c0 0.18 -0.12 0.3 -0.3 0.3 l-8.61 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -1.21 c0 -0.18 0.12 -0.3 0.3 -0.3 l3.49 0 l0 -6.18 l-2.99 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -1.21 c0 -0.18 0.12 -0.3 0.3 -0.3 l4.85 0 c0.18 0 0.3 0.12 0.3 0.3 l0 7.69 l2.96 0 z M346.0125 18.21 c0.25 0.06 0.36 0.14 0.36 0.35 l0 1.19 c0 0.23 -0.22 0.32 -0.57 0.33 c-1.45 0.03 -2.13 -0.5 -2.13 -1.64 l-0.09 0 c-1.02 1.16 -2.74 1.8 -4.15 1.8 c-2.19 0 -3.33 -1.09 -3.33 -2.79 c0 -1.77 1.13 -2.67 3.36 -3 l2.33 -0.36 c0.83 -0.13 1.27 -0.24 1.39 -0.47 c-0.05 -1.36 -0.83 -1.8 -2.12 -1.8 c-1.27 0 -2.19 0.34 -2.34 1.35 c-0.02 0.14 -0.11 0.22 -0.29 0.22 l-1.49 0 c-0.18 0 -0.31 -0.1 -0.29 -0.3 c0.24 -2.33 1.98 -3.11 4.43 -3.11 c2.84 0 4.2 1.33 4.2 3.74 l0 3.67 c0 0.44 0.23 0.72 0.73 0.82 z M339.8425 18.39 c1.11 0 2.28 -0.25 3.34 -1.31 l0 -2.01 c-0.11 0.23 -0.5 0.34 -1.25 0.46 l-2.1 0.33 c-1.18 0.19 -1.57 0.66 -1.57 1.32 c0 0.73 0.48 1.21 1.58 1.21 z M386.47950000000003 6 c0.18 0 0.3 0.12 0.3 0.3 l0 13.4 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.41 0 c-0.18 0 -0.28 -0.12 -0.3 -0.3 l-0.07 -0.92 c-0.74 0.87 -1.81 1.48 -3.27 1.48 c-2.8 0 -4.56 -2.24 -4.56 -5.14 s1.71 -5.14 4.56 -5.14 c1.58 0 2.52 0.75 3 1.66 l0.19 0 l0 -5.34 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.56 0 z M381.84950000000003 18.28 c1.77 0 2.87 -1.3 2.87 -3.18 s-1.1 -3.14 -2.87 -3.14 c-1.81 0 -2.89 1.26 -2.89 3.14 s1.08 3.18 2.89 3.18 z M406.01300000000003 9.98 c2.16 0 3.75 1.32 3.75 3.81 c0 0.19 -0.1 0.3 -0.29 0.32 l-1.56 0.22 c-0.19 0.03 -0.3 -0.08 -0.32 -0.27 c-0.09 -1.46 -0.99 -2.07 -2.27 -2.07 c-2.02 0 -2.96 1.69 -2.96 2.29 l0 5.42 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.56 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -9.2 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.48 0 c0.18 0 0.28 0.12 0.3 0.3 l0.08 1.32 l0.22 0 c0.64 -0.94 1.83 -1.84 3.43 -1.84 z M427.3865 9.98 c2.96 0 4.74 2.27 4.74 4.89 c0 0.74 -0.09 1.11 -0.65 1.11 l-6.99 0 c0.23 1.52 1.5 2.5 3.31 2.5 c1.05 0 1.78 -0.32 2.45 -0.83 c0.16 -0.12 0.28 -0.15 0.43 0 l0.66 0.66 c0.15 0.15 0.16 0.29 0 0.45 c-0.95 0.95 -2.19 1.5 -3.76 1.5 c-3.12 0 -5.19 -2.26 -5.19 -5.14 s2.07 -5.14 5 -5.14 z M427.3965 11.83 c-1.53 0 -2.67 1 -2.89 2.59 l5.72 0 c-0.16 -1.57 -1.27 -2.59 -2.83 -2.59 z M454.71000000000004 18.21 c0.25 0.06 0.36 0.14 0.36 0.35 l0 1.19 c0 0.23 -0.22 0.32 -0.57 0.33 c-1.45 0.03 -2.13 -0.5 -2.13 -1.64 l-0.09 0 c-1.02 1.16 -2.74 1.8 -4.15 1.8 c-2.19 0 -3.33 -1.09 -3.33 -2.79 c0 -1.77 1.13 -2.67 3.36 -3 l2.33 -0.36 c0.83 -0.13 1.27 -0.24 1.39 -0.47 c-0.05 -1.36 -0.83 -1.8 -2.12 -1.8 c-1.27 0 -2.19 0.34 -2.34 1.35 c-0.02 0.14 -0.11 0.22 -0.29 0.22 l-1.49 0 c-0.18 0 -0.31 -0.1 -0.29 -0.3 c0.24 -2.33 1.98 -3.11 4.43 -3.11 c2.84 0 4.2 1.33 4.2 3.74 l0 3.67 c0 0.44 0.23 0.72 0.73 0.82 z M448.54 18.39 c1.11 0 2.28 -0.25 3.34 -1.31 l0 -2.01 c-0.11 0.23 -0.5 0.34 -1.25 0.46 l-2.1 0.33 c-1.18 0.19 -1.57 0.66 -1.57 1.32 c0 0.73 0.48 1.21 1.58 1.21 z M468.1935 20 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -9.2 c0 -0.18 0.12 -0.3 0.3 -0.3 l1.33 0 c0.18 0 0.29 0.12 0.3 0.3 l0.05 0.8 l0.15 0 c0.38 -0.87 1.17 -1.32 2.18 -1.32 c0.96 0 1.68 0.41 2.06 1.32 l0.12 0 c0.43 -0.88 1.24 -1.32 2.23 -1.32 c1.59 0 2.55 0.91 2.55 3.48 l0 6.24 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.41 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -6.24 c0 -1.22 -0.41 -1.62 -1.18 -1.62 c-0.96 0 -1.37 0.72 -1.46 1.32 l0 6.54 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.37 0 c-0.18 0 -0.3 -0.12 -0.3 -0.3 l0 -6.24 c0 -1.22 -0.41 -1.62 -1.2 -1.62 c-0.93 0 -1.35 0.72 -1.44 1.32 l0 6.54 c0 0.18 -0.12 0.3 -0.3 0.3 l-1.41 0 z M496.667 14.3 c2.11 0.27 4.56 0.53 4.56 2.94 c0 1.79 -1.48 3.02 -4.51 3.02 c-2.62 0 -4.39 -0.77 -4.62 -3.1 c-0.02 -0.2 0.11 -0.3 0.29 -0.3 l1.49 0 c0.18 0 0.27 0.08 0.29 0.22 c0.15 1.01 1.09 1.38 2.51 1.38 c1.54 0 2.43 -0.4 2.43 -1.26 c0 -0.91 -1.04 -1.13 -2.44 -1.3 c-2.08 -0.27 -4.38 -0.55 -4.38 -2.92 c0 -1.77 1.38 -3 4.23 -3 c2.48 0 4.27 0.76 4.5 3.09 c0.02 0.2 -0.11 0.3 -0.29 0.3 l-1.49 0 c-0.18 0 -0.27 -0.08 -0.29 -0.22 c-0.15 -1.01 -1.11 -1.38 -2.4 -1.38 c-1.33 0 -2.15 0.38 -2.15 1.25 s0.88 1.1 2.27 1.28 z"></path>
              </g>
            </svg>
          </Link>
        </div>
        <div className="flex gap-2 md:order-2">
          {/* search bar */}

          {/* search icon with modal and with logged in user conditions*/}
          {currentUser ? (
            <SearchModal />
          ) : (
            <span className="flex items-center  md:hidden">
              <SearchModal />
            </span>
          )}

          {/* notification */}
          {/* <Button color="transparent" className=" rounded-full bg-transparent dark:bg-transparent border-none hover:opacity-80 focus:ring-0" size="xs" ><IoIosNotifications  className=" hover:bg-transparent dark:text- text-gray-600 w-6 h-6"/></Button> */}

          {/* dark and light mode */}
          <DarkThemeToggle className="focus:ring-0" />

          {/* user toggle */}
          {currentUser ? (
            <Dropdown
              label={
                <Avatar
                  alt="User settings"
                  img={currentUser.profilePicture}
                  rounded
                  size="sm"
                />
              }
              arrowIcon={false}
              inline
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={HiViewGrid} as={"div"}>
                <Link to={`/dashboard/${currentUser.username}`}>Dashboard</Link>
              </Dropdown.Item>
              <Dropdown.Item as={"div"}>
                <svg
                  className="w-4 h-4 me-2.5 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>

                <Link to={"/user/editprofile"}>Profile</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={CiLogout} as={"div"}>
                <button onClick={logout}>Sign out</button>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button
                gradientDuoTone="greenToBlue"
                outline
                className="hidden sm:inline"
              >
                Sign In
              </Button>
              <Button
                gradientDuoTone="greenToBlue"
                outline
                className="sm:hidden inline py-[1px] mt-1"
              >
                <CiLogin />
              </Button>
            </Link>
          )}
          {/* toggle modal show when user logged in */}
          {currentUser && <Navbar.Toggle />}
        </div>
        {currentUser ? (
          <Navbar.Collapse 
          >
            <Navbar.Link active={path === "/"} as={"div"}  >
              <Link to="/" >News</Link>
            </Navbar.Link>
            {/* change user endpoint user based on database list name */}
            <Navbar.Link active={path === `/user/${currentUser.username}`}  as={"div"}  >
              <Link to={`/user/${currentUser.username}`}>My Posts</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/authors"} as={"div"} >
              <Link to="/authors">Authors</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/createpost"} as={"div"} >
              <Link to="/createpost">Create Post</Link>
            </Navbar.Link>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse>
            {/* searching area  visible when not logged in and md and lg mode*/}
            {!currentUser && (
              <form className="flex" onSubmit={handleSearch}>
                <TextInput
                  type="text"
                  className="hidden sm:block  lg:w-[500px] md:w-[350px] sm:w-[200px] focus:ring-0 dark:bg-gray-900"
                  placeholder="Search..."
                  // icon={AiOutlineSearch}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  color="transparent"
                  className="rounded-l-none -ml-12 border-l dark:border-gray-600 focus:ring-0"
                >
                  <FaSearch className="dark:text-gray-300" />
                </Button>
              </form>
            )}
          </Navbar.Collapse>
        )}
      </Navbar>
    </div>
  );
}
