import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import HeaderFB from "./components/HeaderFB";
import Footer from "./components/Footer";
import Headroom from "react-headroom";
// import Posts from "./pages/post/Posts";
// import Dashboard from "./pages/Dashboard";
// import EditPost from "./pages/post/EditPost";
// import PostDetail from "./pages/post/PostDetail";
// import CreatePost from "./pages/post/CreatePost";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import Error from "./pages/Error";
// import AdminControl from "./components/AdminControl";

// import SearchQuery from "./pages/SearchQuery";

// flow bite responsive tests
// import HeaderFB from "./components/HeaderFB";
// import OldVersionComment from "./components/comment/OldVersionComment";
// import DashboardSidebar from "./components/dashboard/DashboardSidebar";
// import UserPage from "./pages/UserPage";
// import Demo from "./components/test/Demo";
// import RealTimeSocket from "./components/test/RealTimeSocket";
// import Sidebar from "./pages/Sidebar";
// import EditProfile from "./pages/EditProfile";
// import Authors from "./pages/Authors";
// import Donate from "./components/payment/Donate";
// import ConfirmPayment from "./components/payment/ConfirmPayment";
// import Notification from "./components/test/Demo";

// lazy loading
const Posts = lazy(() => import("./pages/post/Posts"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const AdminControl = lazy(() => import("./components/AdminControl"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditPost = lazy(() => import("./pages/post/EditPost"));
const PostDetail = lazy(() => import("./pages/post/PostDetail"));
const CreatePost = lazy(() => import("./pages/post/CreatePost"));
const SearchQuery = lazy(() => import("./pages/SearchQuery"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const UserPage = lazy(() => import("./pages/UserPage"));

const Authors = lazy(() => import("./pages/Authors"));
const Donate = lazy(() => import("./components/payment/Donate"));
const ConfirmPayment = lazy(() => import("./components/payment/ConfirmPayment"));
const Notification = lazy(() => import("./components/test/Demo"));

const Error = lazy(() => import("./pages/Error"));





function App() {
  return (
    <div className="bg-[#eee] dark:bg-gray-800 h-screen">
      <BrowserRouter>
        <Headroom>
          <HeaderFB />
        </Headroom>
        {/* <Header /> */}
        {/* <Posts/> */}
        {/* <Suspense fallback={<h2>Loading Page...</h2>}> */}
        <Suspense >
        <Routes>
          <Route path="/" element={<Posts />} />   
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route element={<AdminControl />}>
            <Route path="/dashboard/:username" element={<Dashboard />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/posts/editpost/:id" element={<EditPost />} />
          </Route>
          <Route path="/search" element={<SearchQuery/>}/>
          <Route path="/user/editprofile" element={<EditProfile/>}/>
          <Route path="/authors" element={<Authors/>}/>
          <Route path="/user/:username" element={<UserPage/>}/>
          <Route path="/donate" element={<Donate/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/confirm-payment/:txId" element={<ConfirmPayment/>}/>
          <Route path="*" element={<Error />} />
        {/* </Suspense> */}

          {/* test comment is worked properly */}
          {/* <Route path="/comments" element={<OldVersionComment/>}/> */}
          {/* <Route path="/demo" element={<Demo/>}/> */}
          {/* <Route path="/sidebar" element={<Sidebar/>}/> */}


          {/* dashboard sidebar */}
          {/* <Route path="/sidebar" element={<DashboardSidebar/>}/> */}

          {/* test socket io */}
          {/* <Route path="/realtime" element={<LikeFollowDemo/>}/> */}
          {/* <Route path="/realtime" element={<RealTimeSocket/>}/> */}

        

        </Routes>
        </Suspense>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
