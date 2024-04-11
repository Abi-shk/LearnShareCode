import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsPersonFillAdd,
} from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";
import { apiRequest, getUserInfo } from "../utils";

import  NoProfile  from "../assets/userprofile.png";
import { Logout, UpdateProfile } from "../redux/userSlice";
import axios from "axios";
import { MdDangerous, MdDeleteForever } from "react-icons/md";

const ProfileCard = ({ user,onSmallScreen,setShowProfile }) => {

  const [dialogOpen, setDialogOpen] = useState(false)
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleUpdateProfile = () => {
    navigate("/")
    dispatch(UpdateProfile(true))
  }

  const handleAccountDelete=async()=>{
      try {
        const res = await apiRequest({
          url: `/users/delete-account/${data?._id}`,
          token: data?.token,
          method: "DELETE",
          data: {},
        });
        console.log(res)
        if(res?.success){
          dispatch(Logout())
        }
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div >
      
      <div className={`${onSmallScreen ? "w-[350px] shadow-2xl shadow-[#000000f6]" : "w-full"} bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4  `}>
      
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
          <Link to={"/profile/" + user?._id} className='flex gap-2'>
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className='w-14 h-14 object-cover rounded-full'
            />

            <div className='flex flex-col justify-center'>
              <p className='text-lg font-medium text-ascent-1 capi'>
                {user?.firstName} {user?.lastName}
              </p>
              <span className='text-ascent-2'>
                {user?.profession ?? "No Profession"}
              </span>
            </div>
          </Link>

          <div className=''>
            {user?._id === data?._id ? (
              <LiaEditSolid
                size={22}
                className='text-blue cursor-pointer'
                onClick={handleUpdateProfile}
              />
            ) : (
              <button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                onClick={() => { }}
              >
                <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
              </button>
            )}
          </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <div className='flex gap-2 items-center text-ascent-2'>
            <CiLocationOn className='text-xl text-ascent-1' />
            <span>{user?.location ?? "Add Location"}</span>
          </div>

          <div className='flex gap-2 items-center text-ascent-2'>
            <BsBriefcase className=' text-lg text-ascent-1' />
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <p className='text-xl text-ascent-1 font-semibold'>
            {user?.friends?.length} Friends
          </p>

          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Who viewed your profile</span>
            <span className='text-ascent-1 text-lg'>{user?.views?.length}</span>
          </div>

          <span className='text-base text-blue'>
            {user?.verified ? "Verified Account" : "Not Verified"}
          </span>

          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Joined</span>
            <span className='text-ascent-1 text-base'>
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-4 py-4 pb-6 border-b border-[#66666645]'>
          <p className='text-ascent-1 text-lg font-semibold'>Social Profile</p>

          <div className='flex gap-2 items-center text-ascent-2'>
            <BsInstagram className=' text-xl text-ascent-1' />
            <span>Instagram</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <FaTwitterSquare className=' text-xl text-ascent-1' />
            <span>Twitter</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <BsFacebook className=' text-xl text-ascent-1' />
            <span>Facebook</span>
          </div>
        </div>
        {user?._id === data?._id && <button onClick={() => setDialogOpen(true)} className="text-ascent-1 w-full text-left mt-5 flex items-center gap-1"><MdDeleteForever className="text-2xl" />Permanently delete account</button>}
        {dialogOpen && (
          <div className="w-screen absolute top-0 left-0 h-screen flex justify-center items-center bg-[#000000d8] z-50">
            <div className="w-1/3 p-5 flex flex-col rounded-lg items-center justify-center bg-primary">
              <p className="text-ascent-1 text-2xl font-bold my-3">Are you sure you want to delete your account?</p>
              <p className="text-[#fb5454] flex items-center gap-1"><MdDangerous className="text-xl" />Note:this action is permanent and cannot be undone!</p>
              <div className="w-full flex justify-end items-center gap-3 mt-10">
                <button className="px-3 py-2 rounded-md bg-[#ffffff] font-semibold" onClick={() => setDialogOpen(false)}>Cancel</button>
                <button onClick={handleAccountDelete} className="px-3 py-2 rounded-md bg-[#ea4c4c] font-semibold">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {
        onSmallScreen&&
        (<div onClick={()=>setShowProfile(false)} className="bg-primary shadow-lg shadow-[#000000] cursor-pointer rounded-xl py-2 mt-2 text-[#ec4e4e] font-semibold flex justify-center items-center">
          <h1>CLOSE</h1>
        </div>)
      }
    </div>
  );
};

export default ProfileCard;