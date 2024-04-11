import React from 'react'
import NoProfile from '../assets/userprofile.png'

function Notification() {
    return (
        <div>
            <div className='bg-primary flex '>
                {/*  LEFT */}
                <div className='w-1/2 h-screen flex  max-lg:w-full'>
                    <div className='w-full mt-2 flex-1 bg-ascent-2/10 flex justify-start items-start  h-full'>
                        <div className='  bg-ascent-2/25 p-2 rounded-l-lg rounded-br-lg text-white text-lg w-full '>
                            <div className='flex gap-2 '>
                                <img className='w-8 h-8 rounded-full aspect-square ' src={NoProfile} alt="" />
                                <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam consectetur autem laboriosam sint? In cum dolore natus quis distinctio quidem deserunt sed incidunt repudiandae ipsum. Aliquam voluptas minima veniam porro.</p>                              
                            </div>
                            <p className='text-end px-2 text-sm italic text-white/50'>(15-02-2024) 12:45 Am</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification