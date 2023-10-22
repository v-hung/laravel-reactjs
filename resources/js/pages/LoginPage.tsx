import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useState, FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { promiseFunction } from '../lib/helper';
import useUserStore from '../stores/user';

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useUserStore()

  const [ searchParams, setSearchParams ] = useSearchParams()
  const redirect_url = searchParams.get('redirect_url')

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
        
        await login({ email, password, remember }).catch(e => {throw Error("Tài khoản hoặc mật khẩu không đúng")})
        
        // navigate(0)
      }
    })
  }

  return (
    <>
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
          required
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
          required
        />

        <Button type='submit' variant='contained' disabled={loading} size='large'
          startIcon={loading ? <span className='icon animate-spin'>progress_activity</span> : null}
        >Tiếp tục</Button>

        <p className="text-center">Bạn không có tài khoản. <Link to={`/auth/register${redirect_url ? '?redirect_url=' + redirect_url : ''}`} className='text-blue-600 hover:text-blue-400'>Đăng ký</Link></p>
      </form>

    </>
  )
}

export default LoginPage