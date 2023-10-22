import { Button, Menu, Slider } from '@mui/material'
import { FC, HTMLAttributes, MouseEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from './Container'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useUserStore, { UserType } from '../../stores/user'
import { MenuItem } from '@mui/material'
import { getImage } from '../../lib/helper'

const Header: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...rest } = props

  const { user } = useUserStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div {...rest} className={twMerge('h-16 border-b flex space-x-4 items-center', className)}>

      { pathname.split('/').length > 2
        ? <div className='font-semibold flex items-center cursor-pointer'
            onClick={() => navigate(-1)}  
          >
            <span className="icon">chevron_left</span>
            <span className='text-sm'>Quay lại</span>
          </div>
        : null
      }

      <div className="!ml-auto"></div>

      <span className="icon cursor-pointer">notifications</span>

      <UserIcon user={user!} />
    </div>
  )
}

const UserIcon = ({ user }: { user: UserType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = useUserStore(state => state.logout)
  const navigate = useNavigate()

  const handelLogout = () => {
    logout()
    // navigate('/auth/login')
    // setAnchorEl(null)
  }

  const [list, setList] = useState([
    { icon: 'person', title: 'Tài khoản' },
    { icon: 'sync_alt', title: 'Vào màn hình học sinh' },
    { icon: 'dark_mode', title: 'Chế độ tối' },
    { icon: 'shield_person', title: 'Bỏ quyền giáo viên' },
    { icon: 'cached', title: 'Refresh' },
  ])

  const [list2, setList2] = useState([
    { icon: 'qr_code', title: 'QR đăng nhập' },
    { icon: 'qr_code_scanner', title: 'Tạo QR quên mật khẩu' },
    { icon: 'logout', title: 'Đăng xuất', action: handelLogout },
  ])

  return (
    <>
      <div className="cursor-pointer select-none"
        onClick={handleClick}
      >
        <div className='w-8 h-8 rounded-full bg-white'>
          { user.avatar
            ? <img src={getImage(user.avatar)} alt={`photo ${user.name}`} className='w-full h-full object-cover' />
            : <span className="w-full h-full icon icon-fill text-blue-600">person</span>
          }
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PopoverClasses={{
          paper: 'mt-1 shadow'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{ disablePadding: true }}
      >
        <div className="min-w-[250px]">
          <div className="py-2 px-4 border-b border-gray-200">
            <p className='text-sm font-semibold'>{user.name}</p>
            <p className="mt-1 text-xs text-gray-500">Giáo viên</p>
          </div>

          <div className="py-2 flex flex-col px-2 text-[#333] text-sm">
            {list.map((v,i) =>
              <div key={i} className="rounded px-1 py-1 flex space-x-1 items-center hover:bg-gray-200 cursor-pointer">
                <span className="icon text-lg">{v.icon}</span>
                <span>{v.title}</span>
              </div>
            )}
          </div>

          <div className="h-[1px] bg-gray-200"></div>

          <div className="py-2 flex flex-col px-2 text-[#444] text-sm">
            {list2.map((v,i) =>
              <div key={i} className="rounded px-1 py-1 flex space-x-1 items-center hover:bg-gray-200 cursor-pointer"
                onClick={v.action}
              >
                <span className="icon text-lg">{v.icon}</span>
                <span>{v.title}</span>
              </div>
            )}
          </div>
        </div>
      </Menu>
    </>
  )
}

export default Header