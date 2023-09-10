import React, {lazy, Suspense} from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import "./App.css"
import ProtectedRoutes from './components/core/Auth/ProtectedRoutes.jsx'
import Error from "./pages/Error.jsx"
import Loader from './components/common/Loader'
//import Home from "./pages/Home.jsx"
//import Navbar from './components/common/Navbar.jsx'
//import Login from "./pages/Login.jsx"
//import Signup from "./pages/Signup.jsx"
//import ForgotPassword from './pages/ForgotPassword.jsx'
//import ResetPassword from './pages/ResetPassword.jsx'
//import VerifyEmail from './pages/VerifyEmail.jsx'
//import About from "./pages/About.jsx"
//import ContactUs from './pages/ContactUs.jsx'
//import MyProfile from './components/core/Dashboard/MyProfile.jsx'
//import Dashboard from './pages/Dashboard.jsx'
//import Settings from './components/core/Dashboard/Settings.jsx'
//import EnrolledCourses from './components/core/Dashboard/EnrolledCourses.jsx'
//import Wishlist from './components/core/Dashboard/Wishlist'
//import AddCourse from './components/core/Dashboard/AddCourse'
//import MyCourses from './components/core/Dashboard/MyCourses'
//import EditCourse from './components/core/Dashboard/EditCourse'
//import CourseDetails from './pages/CourseDetails'
//import Catelog from './pages/Catelog'
//import ViewCourse from './pages/ViewCourse'
//import VideoPlayer from "./components/core/ViewCourse/VideoPlayer.jsx"
//import Insights from './components/core/Dashboard/Insights'

const Home = lazy(() => import ("./pages/Home.jsx"))
const Navbar = lazy(() => import ('./components/common/Navbar.jsx'))
const Login = lazy(() => import ("./pages/Login.jsx"))
const Signup = lazy(() => import ("./pages/Signup.jsx"))
const ForgotPassword = lazy(() => import ('./pages/ForgotPassword.jsx'))
const ResetPassword = lazy(() => import ('./pages/ResetPassword.jsx'))
const VerifyEmail = lazy(() => import ('./pages/VerifyEmail.jsx'))
const About = lazy(() => import ("./pages/About.jsx"))
const ContactUs = lazy(() => import ('./pages/ContactUs.jsx'))
const MyProfile = lazy(() => import ('./components/core/Dashboard/MyProfile.jsx'))
const Dashboard = lazy(() => import ('./pages/Dashboard.jsx'))
const Settings = lazy(() => import ('./components/core/Dashboard/Settings.jsx'))
const EnrolledCourses = lazy(() => import ('./components/core/Dashboard/EnrolledCourses.jsx'))
const Wishlist = lazy(() => import ('./components/core/Dashboard/Wishlist'))
const AddCourse = lazy(() => import ('./components/core/Dashboard/AddCourse'))
const MyCourses = lazy(() => import ('./components/core/Dashboard/MyCourses'))
const EditCourse = lazy(() => import ('./components/core/Dashboard/EditCourse'))
const CourseDetails = lazy(() => import ('./pages/CourseDetails'))
const Catelog = lazy(() => import ('./pages/Catelog'))
const ViewCourse = lazy(() => import ('./pages/ViewCourse'))
const VideoPlayer = lazy(() => import ("./components/core/ViewCourse/VideoPlayer.jsx"))
const Insights = lazy(() => import ('./components/core/Dashboard/Insights'))



const App = () => {

  const {user} = useSelector((state) => state.profile)

  return (
    <div className='w-full min-h-screen font-inter overflow-x-hidden bg-richblack-900'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catelog/:catelogName' element={<Catelog/>}/>
        <Route path='/courses/:courseId' element={<CourseDetails/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='*' element={<Error/>}/>
        {/* this is how you create nested and protected routes */}
        <Route element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} >
          <Route path='/dashboard/my-profile' element={<MyProfile />}/>
          <Route path='/dashboard/settings' element={<Settings />}/>
          {
            user?.role === ACCOUNT_TYPE.STUDENT && 
            <>
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
              <Route path='/dashboard/cart' element={<Wishlist/>}/>
            </>
          }
          {
            user?.role === ACCOUNT_TYPE.INSTRUCTOR && 
            <>
              <Route path='/dashboard/add-course' element={<AddCourse/>}/>
              <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
              <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>
              <Route path='/dashboard/insights' element={<Insights/>}/>
            </>
          }
        </Route>

        <Route element={<ProtectedRoutes><ViewCourse/></ProtectedRoutes>} >
            {
              user?.role === ACCOUNT_TYPE.STUDENT && 
              <>
                <Route path='view-course/:courseId/section/:sectionId/subSection/:subSectionId' element={<VideoPlayer />}/>
              </>
            }
        </Route>

      </Routes>
      
    </div>
  )
}

export default App
