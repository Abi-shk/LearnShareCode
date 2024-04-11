import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { apiRequest } from '../utils';

const ChangePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const params = useParams();
  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = {
      userId : params.id,
      token  : params.token,
      password : confirmPassword,
    }
    try {
      
      const res = await apiRequest({
        url: "/users/reset-password",
        data: data,
        method: "POST",
      })
      console.log(res)
      if(!res.ok){
        setError(res.message)
      }
    }

      catch{
       
      }    
    setIsPasswordChanged(true);

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Change your password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!isPasswordChanged ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change password
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className={`text-xl ${error? "text-[#ff4f4f]": "text-[#4cff70]"} font-bold text-gray-500 text-center`}>{error ? error : "Your password has been successfully changed."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
