import { Button } from '@mui/material'
import {FC, HTMLAttributes} from 'react'
import { twMerge } from 'tailwind-merge'
import useUserStore from "../../stores/user";
import { motion } from "framer-motion";

const TestHeader: FC<HTMLAttributes<HTMLDivElement>> = (props)  => {
  const { className, ...rest } = props

  const user = useUserStore(state => state.user)

  return (
    <div {...rest} className={twMerge('h-14 border-b flex space-x-4 items-center px-4 text-sm', className)}>
      <div className="flex-1">
        <Button variant='contained' size='small' color='error' startIcon={<span className='icon'>power_settings_new</span>}>Thoát</Button>
      </div>


      <motion.div className="flex-grow font-semibold text-center"
        initial={{ x: 50, opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >Thí sinh: {user?.name}</motion.div>

      <motion.div className="flex-1 flex items-center justify-end space-x-4"
        initial={{ x: 50, opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="flex items-center space-x-2">
          <span className="icon">timer</span>
          <span>00 : 25 : 47</span>
        </p>
        <Button variant='contained' size='small' startIcon={<span className='icon'>send</span>}>Nộp bài</Button>
      </motion.div>
    </div>
  )
}

export default TestHeader