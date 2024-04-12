import React, { useEffect, useState } from "react";
import { TbSocial } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
import { apiRequest, fetchPosts } from "../utils";
import {  BiUser } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import ProfileCard from "./ProfileCard";
import { FaCode } from "react-icons/fa";


const TopBar = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [nots, setNots] = useState([])
  const [notsNumber, setNotsNumber] = useState(0)
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {

    setInterval(async () => {
      try {
        const res = await apiRequest({
          url: `/posts/notifications/${user._id}`,
          token: user?.token,
          method: "GET",
          data: {},
        });
        if (res.length !== 0) {
          setNots(res);
          const nums = res.filter((n) => n.status === "NOTSEEN")
          setNotsNumber(nums.length)
        }

      } catch (error) {
        console.log(error);
      }

    }, 5000)
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => {
    await fetchPosts(user.token, dispatch, "", data);
  };

  const handleModalClose = async () => {
    setModalOpen(false);

    try {
      const res = await apiRequest({
        url: `/posts/update-notifications/${user._id}`,
        token: user?.token,
        method: "GET",
        data: {},
      });
      setNots(res);
      const nums = res.filter((n) => n.status === "NOTSEEN")
      setNotsNumber(nums.length)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>
      <Link to='/' className='flex gap-2 items-center'>
        <div className='p-1 md:p-2 bg-[#065ad8] rounded text-white'>
          <TbSocial />
        </div>
        <span className='text-xl md:text-2xl text-[#065ad8] font-semibold'>
          LearnSharecode
        </span>
      </Link>
      
      <form
        className='hidden md:flex items-center justify-center'
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder='Search...'
          styles='w-[18rem] lg:w-[38rem]  rounded-1-full py-3 '
          register={register("search")}
        />
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full hover:bg-blue/50'
        />
      </form>

      {/* ICONS */}
      <div className='flex max-md:gap-2 gap-4 items-center text-ascent-1 text-md md:text-xl'>

       <a href="https://www.programiz.com/c-programming/online-compiler/"><FaCode className="h-5 w-5"/></a> 

        <BiUser className="h-5 w-5 max-sm:flex hidden  " onClick={() => setShowProfile(true)} />

        {showProfile &&
          <div className="cursor-pointer absolute top-0 left-0 w-full h-screen bg-primary/90 flex justify-center items-center ">
            <ProfileCard user={user} onSmallScreen={true} setShowProfile={setShowProfile} />
          </div>
        }

        <div className="flex flex-row cursor-pointer">
          <Link to='/chat'>
            <TiMessages className="h-5 w-5" />
          </Link>
        </div>

        <div onClick={() => setModalOpen(true)} className='lg:flex cursor-pointer'>

          <IoMdNotificationsOutline className="h-5 w-5" />{notsNumber !== 0 && <span className="w-6 h-6 rounded-full bg-blue flex justify-center items-center text-sm text-white">{notsNumber}</span>}
        </div>
        <button onClick={() => handleTheme()}>
          {theme === "light" ? <BsMoon className="h-4 w-4" /> : <BsSunFill className="h-5 w-5" />}
        </button>

        {modalOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-primary/80  flex justify-center items-center ">
            <div className="w-3/4 min-h-[75%] bg-black custom-shadow rounded-xl">
              <div className="flex flex-col items-center h-14 justify-center relative">
                <h2 className="text-2xl font-semibold">Notifications</h2>
                <MdClose className="absolute right-2 h-8 w-8 top-2 cursor-pointer" onClick={handleModalClose} />
              </div>
              <div className="flex flex-col gap-2 mt-2 p-2">
                {nots?.length !== 0 && nots?.map((not) =>
                (<div key={not._id} className={`w-full  flex-1 px-2 ${not.status === "NOTSEEN" ? "bg-ascent-2/50" : "bg-ascent-2/10"} flex justify-start rounded-md items-start h-24`}>
                  <div className='   p-2 rounded-lg text-white text-lg w-full '>
                    <div className='flex gap-2 '>
                      <img className='w-8 h-8 rounded-full aspect-square ' src={not.postImg} alt="" />
                      <p className="text-ascent-1">{not.message}</p>
                    </div>
                    <p className='text-end px-2 text-sm italic text-ascent-1'>{not.createdAt}</p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        )}


        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title='Log Out'
            containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full hover:bg-blue'
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;