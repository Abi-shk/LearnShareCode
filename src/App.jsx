import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import Notification from "./pages/notification";
import ChatsPage from "./pages/ChatsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import EmailVerified from "./pages/emailVerified";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}

function App() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div data-theme={theme} className='w-full min-h-[100vh]'>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id?' element={<Profile />} />
        </Route>
        <Route path='/notification' element={<Notification />} />
        <Route path='/chat' element={<ChatsPage />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/change-password/:id/:token' element={<ChangePasswordPage/>} />
        <Route path='/verified/:id/:token' element={<EmailVerified/>} />
      </Routes>
    </div>
  );
}

export default App;
