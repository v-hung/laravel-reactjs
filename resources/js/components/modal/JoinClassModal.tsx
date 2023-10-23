import React, { useState } from 'react'
import useModalStore from '../../stores/modal'
import { Modal, Zoom, Box, Backdrop, IconButton, Button, TextField } from "@mui/material";
import useUserStore from '../../stores/user';
import { getImage } from '../../lib/helper';
import Avatar from "../Avatar";
import { AnimatePresence, motion } from 'framer-motion';

const JoinClassModal = () => {
  const { isOpen, dispatch } = useModalStore()
  const { user, logout } = useUserStore()

  if (!user) return null

  const [checkCodeClass, setCheckCodeClass] = useState(false)

  return (
    <AnimatePresence>
      { isOpen == 'joinClass' && <motion.div 
        className="absolute w-full h-full top-0 left-0 bg-white z-50"
        initial={{ opacity: 0, scale: .8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
      >
        <div className="h-16 px-4 border-b flex items-center space-x-4">
          <IconButton
            onClick={() => dispatch({isOpen: null})}
          >
            <span className="icon">close</span>
          </IconButton>
          <p className="text-xl">Tham gia lớp học</p>
          <div className="!ml-auto"></div>
          <Button variant='contained' disabled={!checkCodeClass}>Tham gia</Button>
        </div>

        <div className="w-full max-w-xl mx-auto mt-6 flex flex-col space-y-6">
          <div className="p-6 rounded-lg border">
            <p className="text-gray-600">Bạn đang đăng nhập bằng tài khoản</p>
            <div className="flex items-center space-x-3 mt-4">
              <Avatar className='w-12 h-12' user={user} />
              <div className='text-sm'>
                <p className='font-semibold'>{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <Button className='!ml-auto self-end' variant='outlined' color='error'
                onClick={() => logout()}
              >Đăng xuất</Button>
            </div>
          </div>

          <div className="p-6 rounded-lg border">
            <p className="font-semibold text-xl">Mã lớp</p>
            <p className="text-gray-600 mt-2">Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào đây.</p>
            
            <TextField label="Mã lớp" className='mt-6 w-72' />
          </div>

          <div className="px-4">
            <p className='font-semibold'>Cách đăng nhập bằng mã lớp học</p>
            <ul className='list-disc px-4 mt-2'>
              <li className='py-2'>Sử dụng tài khoản được cấp phép</li>
              <li className='py-2'>Sử dụng mã lớp học gồm 5-7 chữ cái hoặc số, không có dấu cách hoặc ký hiệu</li>
            </ul>
            <p className='mt-2 text-gray-600'>Nếu bạn đang gặp vấn đề khi tham gia lớp học, hãy chuyển đến bài viết trong <a href="#" className="text-blue-600">Trung tâm trợ giúp</a></p>
          </div>
        </div>
      </motion.div>}
    </AnimatePresence>
  )
}

export default JoinClassModal