import React, { useEffect, useState } from 'react'
import { CustomButton } from '../components'
import { Link, useParams } from "react-router-dom";
import { apiRequest } from '../utils';

import { BiLoader } from 'react-icons/bi';


const EmailVerified = () => {
    const params = useParams();
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [isVerified, setIsVerified] = useState()
    const { token, id } = params

    useEffect(() => {
        (async () => {
            
            try {
                const res = await apiRequest({
                    url: `/users/verify/${id}/${token}`,
                    data: {},
                    method: "GET",
                })
                console.log(res)
                if (res.message) {
                    setIsVerified(true)
                    setMessage(res.message)
                }
                if (!res.ok) {
                    setIsVerified(false)
                    setMessage(res.message)
                }
                setLoading(false)
            }
            catch {

            }
        })()
    }, [])

    return (
        loading ? (
            <div className="w-full h-screen flex justify-center items-center">
                <BiLoader className='h-24 w-24 animate-spin'/>
            </div>
        ) : (

            <div className='w-full h-screen flex justify-center items-center '>
                {
                    isVerified ?

                        <div className='w-1/2 h-1/3 flex flex-col gap-5 justify-center items-center m-5 '>
                            <h1 className='text-4xl text-[#07ee0b] font-bold'>{message}</h1 >
                            <p className='text-xl text-black'>You can login to your account now</p>
                            <Link to={"/login"}>
                                <CustomButton
                                    type='button'
                                    containerStyles={`inline-flex justify-center h-12 rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                                    title='Click here to Login' />
                            </Link>
                        </div > :
                        <div className='w-1/2 h-1/3 flex flex-col gap-5 justify-center items-center m-5 '>
                            <h1 className='text-4xl text-[#ee0707] font-bold'>Email verification failed</h1>
                            <p className='text-2xl text-black'>{message}</p>
                        </div>
                }
            </div >
        )





    )
}

export default EmailVerified