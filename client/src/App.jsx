import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Headroom from "react-headroom";
import Posts from "./pages/Posts";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import AdminControl from "./components/AdminControl";

import SearchQuery from "./pages/SearchQuery";
// flow bite responsive tests
import HeaderFB from "./components/HeaderFB";
import Comments from "./components/Comments";
import DashboardSidebar from "./components/DashboardSidebar";
import UserPage from "./pages/UserPage";
import Demo from "./components/Demo";
import RealTimeSocket from "./components/RealTimeSocket";
import Sidebar from "./pages/Sidebar";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div className="bg-[#eee] dark:bg-gray-800 h-screen">
      <BrowserRouter>
        <Headroom>
          <HeaderFB />
        </Headroom>
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route element={<AdminControl />}>
            <Route path="/dashboard/:username" element={<Dashboard />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/posts/editpost/:id" element={<EditPost />} />
          </Route>
          <Route path="/" element={<Posts />} />   
          <Route path="/search" element={<SearchQuery/>}/>
          <Route path="/user/editprofile" element={<EditProfile/>}/>

          <Route path="*" element={<Error />} />

          {/* test comment is worked properly */}
          <Route path="/comments" element={<Comments/>}/>
          <Route path="/user/:username" element={<UserPage/>}/>
          <Route path="/demo" element={<Demo/>}/>
          <Route path="/sidebar" element={<Sidebar/>}/>



          {/* dashboard sidebar */}
          <Route path="/sidebar" element={<DashboardSidebar/>}/>

          {/* test socket io */}
          {/* <Route path="/realtime" element={<LikeFollowDemo/>}/> */}
          <Route path="/realtime" element={<RealTimeSocket/>}/>

        

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
