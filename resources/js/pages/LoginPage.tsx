import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useState, FormEvent } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { promiseFunction } from '../lib/helper';
import useUserStore from '../stores/user';

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false)


  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { user, login } = useUserStore()

  // if (user) {
  //   return <Navigate to={"/"} />
  // }

  const handelLogin = async (e: FormEvent) => {
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
      <div className="w-full max-w-[500px] mx-auto bg-white rounded-lg p-6 shadow">
        <h5 className="text-xl font-bold text-center">Đăng nhập</h5>

        <form
          className="mt-6 flex max-w-xl flex-col space-y-6" 
          onSubmit={handelLogin}
        >
          <TextField label="Tài khoản" name='email' className='bg-slte-100' 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="icon">email</span>
                </InputAdornment>
              ),
            }}
          />

          <TextField label="Mật khẩu" name='password' className='bg-slae-100' 
            type={showPass ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="icon">key</span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <span className="icon cursor-pointer"
                    onClick={() => setShowPass(state => !state)}
                  >{showPass ? 'visibility_off' : 'visibility'}</span>
                </InputAdornment>
              ),
            }}
          />

          { error != ""
            ? <div className="border border-red-500 p-2 rounded bg-red-200">
              {error}
            </div> : null
          }

          <Button type='submit' variant='contained' disabled={loading} size='large'
            startIcon={loading ? <span className='icon animate-spin'>progress_activity</span> : null}
          >Tiếp tục</Button>

          <p className="text-center">Bạn không có tài khoản. <Link to={"/auth/register"} className='text-blue-600 hover:text-blue-400'>Đăng ký</Link></p>
        </form>

      </div>
    </div>
  )
}

export default LoginPage