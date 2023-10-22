import { Avatar, Box, Button, ButtonBase, Checkbox, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useState, FormEvent, useEffect } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { promiseFunction } from '../lib/helper';
import useUserStore from '../stores/user';
import { isEmail, isName, isPassword, removeSpace } from "../lib/validator";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false)
  const [reShowPass, setReShowPass] = useState(false)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>({})
  const [errors, setErrors] = useState<any>({})

  const { register } = useUserStore()

  const handelRegister = async (e: FormEvent) => {
    e.preventDefault()

    await promiseFunction({
      loading,
      setLoading,
      successTitle: 'Đăng nhập thành công',
      setError: setErrors,
      callback: async () => {
        var { email, name, password, re_password } : any = Object.fromEntries(
          new FormData(e.target as HTMLFormElement),
        )

        name = removeSpace(name)
        setErrors({})

        let error: any = {}

        if (!isEmail(email)) {
          error.email = true
        }

        if (!isName(name)) {
          error.name = true
        }

        if (password.length < 6) {
          error.password = true
        }

        if (password != re_password) {
          error.re_password = true
        }

        setError(error)
        if (Object.keys(error).length > 0) {
          throw "Dữ liệu form chưa đúng định dạng"
        }
        
        await register({ email, password, name })
      }
    })
  }

  const [ searchParams, setSearchParams ] = useSearchParams()
  const redirect_url = searchParams.get('redirect_url')

  return (
    <>
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
          required
          error={error?.email}
          helperText={error?.email && "Email không đúng định dạng"}
        />

        <TextField label="Tên" name='name'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span className="icon">person</span>
              </InputAdornment>
            ),
          }}
          required
          error={error?.name}
          helperText={error?.name && "Tên phải có ít nhất 6 ký tự và không chứa ký tự đặc biệt"}
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
          required
          error={error?.password}
          helperText={error?.password && "Mật khẩu không phải có ít nhất 6"}
        />

        <TextField label="Nhập lại mật khẩu" name='re_password'
          type={reShowPass ? 'text' : 'password'}
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
          required
          error={error?.re_password}
          helperText={error?.re_password && "Nhập lại mật khẩu không chính xác"}
        />

        { errors.errors
          ? <div className="border border-red-300 p-2 rounded bg-red-100 text-red-700 flex flex-col space-y-1 text-sm">
            {  Object.keys(errors.errors).map((key,i) =>
              <div key={i} >
                * <span className='capitalize font-semibold'>{key}</span> : <span>{errors.errors[key].toString()}</span>
              </div>
            )}
          </div>
          : null
        }

        <Button type='submit' variant='contained' disabled={loading} size='large'
          startIcon={loading ? <span className='icon animate-spin'>progress_activity</span> : null}
        >Tiếp tục</Button>

        <p className="text-center">Bạn đã có tài khoản. <Link to={`/auth/login${redirect_url ? '?redirect_url=' + redirect_url : ''}`} className='text-blue-600 hover:text-blue-400'>Đăng nhập</Link></p>
      </form>

    </>
  )
}

export default RegisterPage