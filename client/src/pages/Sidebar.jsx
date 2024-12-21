import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";
import { Link } from "react-router-dom";
import { Accordion } from "flowbite-react";
// import Accordions from "../components/Accordions";
// import { TiUserAdd } from "react-icons/ti";
// import { PiUserList } from "react-icons/pi";
// import { MdDashboardCustomize } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiViewGrid } from "react-icons/hi";

const navigationAdmin = [
  { name: "Home", href: "/admin/home" },
  { name: "Add User", href: "/admin/adduser" },
  // { name: "List User", href: "/admin/listUser" },
  { name: "User Management", href: "/admin/usermanagement" },
];

const navigationPolice = [
  { name: "Home", href: "/police/Home" },
  { name: "Check Criminal", href: "/police/verifycriminal" },
  { name: "Add Criminal", href: "/police/addcriminal" },
  { name: "List Criminal", href: "/police/updatecriminal/:id" },
  { name: "Travel Ban", href: "/police/travelban" },
];

const navigationJudge = [
  { name: "Add Sentence", href: "/judge/task" },
  { name: "Travel Ban", href: "/judge/travelban" },
  // { name: "Add Sentence", href: "/judge/updatecriminal/:id" },
];
const navigationAuthor  = [
  { name: "Home", href: "/posts" },
  { name: "Create Post", href: "/create" },
  { name: "Dashboard", href: "/dashboard" },
];

const navigationAirlineOfficer = [{ name: "Travel Ban", href: "/airline/travelban" }];

function Sidebar() {
  // const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // change to current user role

  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-64 h-screen pt-20  transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {
               navigationPolice.map((item) => (
                  <li key={item.name} className="flex  gap-5 items-center">
                    <button><HiViewGrid/></button>
                    <Link
                      to={item.href}
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                        {item.name}
                    </Link>
                  </li>
                ))
            }
          </ul>
          {/* for remain user management tab */}
          {/* {currentUser.role === "admin" &&
          <Accordion className="border-none ">
            <Accordion.Panel>
              <Accordion.Title className="py-2 text-black font-normal">
                User Management
              </Accordion.Title>
              <Accordion.Content>
              <Link
                  to={""}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Police</span>
                </Link>
                <Link
                  to={""}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Judge</span>
                </Link>
                <Link
                  to={""}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Author</span>
                </Link>
                <Link
                  to={""}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Airline Officer</span>
                </Link>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>} */}
          <div className="mt-32 mb-2">
            {/* <hr /> */}
            {/* <Accordions /> */}
          </div>
        </div>
      </div>

    </>
  );
}

export default Sidebar;
