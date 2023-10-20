import { Avatar, Box, Button, ButtonBase, Checkbox, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useState, FormEvent, useEffect } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { promiseFunction } from '../lib/helper';
import useUserStore from '../stores/user';

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false)
  const [reShowPass, setReShowPass] = useState(false)

  const [pass, setPass] = useState('')
  const [rePass, setRePass] = useState('')
  const [isCheckRePass, setIsCheckRePass] = useState(true)

  useEffect(() => {
    setIsCheckRePass(pass == rePass)
  }, [pass, rePass])


  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { user, login } = useUserStore()

  // if (user) {
  //   return <Navigate to={"/"} />
  // }

  const handelRegister = async (e: FormEvent) => {
    e.preventDefault()

    // await promiseFunction({
    //   loading,
    //   setLoading,
    //   successTitle: 'Đăng nhập thành công',
    //   callback: async () => {
    //     const { email, password, remember }: any = Object.fromEntries(
    //       new FormData(e.target as HTMLFormElement),
    //     )
        
    //     await login({ email, password, remember })
        
    //     navigate('/')
    //   }
    // })
  }

  return (
    <div className="w-full min-h-full px-6 py-8 md:py-16 lg:py-20 bg-slate-100">
      <div className="w-full max-w-[500px] mx-auto bg-white rounded-lg p-6 shadow">
        <h5 className="text-xl font-bold text-center">Đăng ký</h5>

        <form
          className="mt-6 flex max-w-xl flex-col space-y-6" 
          onSubmit={handelRegister}
        >
          <TextField label="Tài khoản" name='email'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="icon">email</span>
                </InputAdornment>
              ),
            }}
          />

          <TextField label="Tên" name='name'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="icon">person</span>
                </InputAdornment>
              ),
            }}
          />

          <TextField label="Mật khẩu" name='password'
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

          <TextField label="Nhập lại mật khẩu" name='re_password'
            type={reShowPass ? 'text' : 'password'}
            value={rePass}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="icon">key</span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <span className="icon cursor-pointer"
                    onClick={() => setReShowPass(state => !state)}
                  >{reShowPass ? 'visibility_off' : 'visibility'}</span>
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

          <p className="text-center">Bạn đã có tài khoản. <Link to={"/auth/login"} className='text-blue-600 hover:text-blue-400'>Đăng nhập</Link></p>
        </form>

      </div>
    </div>
  )
}

export default RegisterPage