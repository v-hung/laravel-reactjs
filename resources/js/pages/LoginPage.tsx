import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { useState, FormEvent } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { promiseFunction } from '../lib/helper';
import useUserStore from '../stores/user';

const LoginPage = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { user, login } = useUserStore()

  // if (user) {
  //   return <Navigate to={"/"} />
  // }

  const HandelLogin = async (e: FormEvent) => {
    e.preventDefault()

    await promiseFunction({
      loading,
      setLoading,
      successTitle: 'Đăng nhập thành công',
      callback: async () => {
        const { email, password, remember }: any = Object.fromEntries(
          new FormData(e.target as HTMLFormElement),
        )
        
        await login({ email, password, remember })
        
        navigate('/')
      }
    })
  }

  return (
    <div className="w-full min-h-full px-6 py-8 md:py-16 lg:py-20 bg-slate-100">
      <div className="w-full max-w-[500px] mx-auto bg-white rounded p-6 shadow">
        <h5 className="text-xl font-bold text-center">Đăng nhập</h5>

        <form
          className="mt-6 flex max-w-xl flex-col space-y-6" 
          onSubmit={HandelLogin}
        >
          <div className="flex flex-row-reverse items-center rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 focus-within:border-blue-500 focus-within:bg-white">
            <input id="email" name="email" type="text" 
              className="peer min-w-0 flex-grow focus:text-gray-800 p-0 border-none focus:outline-none" placeholder="Tài khoản"
            />
            <label htmlFor="email" className="icon-svg mr-3 w-6 flex-none text-gray-400 peer-focus:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"
                />
              </svg>
            </label>
          </div>

          <div className="flex flex-row-reverse rounded-md border border-gray-200 bg-gray-100 px-4 py-2.5 focus-within:border-blue-500 focus-within:bg-white">
            <input id="password"type="password" name="password" className="peer min-w-0 flex-grow focus:text-gray-800 p-0 border-none focus:outline-none" placeholder="Mật khẩu"/>
            <label htmlFor="password" className="icon-svg mr-3 w-6 flex-none text-gray-400 peer-focus:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M3.433 17.325 3.079 19.8a1 1 0 0 0 1.131 1.131l2.475-.354C7.06 20.524 8 18 8 18s.472.405.665.466c.412.13.813-.274.948-.684L10 16.01s.577.292.786.335c.266.055.524-.109.707-.293a.988.988 0 0 0 .241-.391L12 14.01s.675.187.906.214c.263.03.519-.104.707-.293l1.138-1.137a5.502 5.502 0 0 0 5.581-1.338 5.507 5.507 0 0 0 0-7.778 5.507 5.507 0 0 0-7.778 0 5.5 5.5 0 0 0-1.338 5.581l-7.501 7.5a.994.994 0 0 0-.282.566zM18.504 5.506a2.919 2.919 0 0 1 0 4.122l-4.122-4.122a2.919 2.919 0 0 1 4.122 0z"
                />
              </svg>
            </label>
          </div>

          <div className="flex space-x-2 items-center">
            <input type="checkbox" name='remember' id='remember' value="true" checked />
            <label htmlFor='remember' className='select-none cursor-pointer'>Ghi nhớ tôi</label>
          </div>

          { error != ""
            ? <div className="border border-red-500 p-2 rounded bg-red-200">
              {error}
            </div> : null
          }

          <button className="rounded-md bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-500 relative overflow-hidden">
            <span>Tiếp tục</span>
            { loading
              ? <div className="absolute w-full h-full top-0 left-0 grid place-items-center bg-blue-500">
                <span className="icon-svg animate-spin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path></svg>
                </span>
              </div>
              : null
            }
          </button>
        </form>

      </div>
    </div>
  )
}

export default LoginPage