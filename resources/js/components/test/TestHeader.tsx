import { Box, Button, Modal } from '@mui/material'
import {FC, HTMLAttributes, useState} from 'react'
import { twMerge } from 'tailwind-merge'
import useUserStore from "../../stores/user";
import { motion } from "framer-motion";

const TestHeader: FC<HTMLAttributes<HTMLDivElement>> = (props)  => {
  const { className, ...rest } = props

  const user = useUserStore(state => state.user)

  const [openBack, setOpenBack] = useState(false)
  const handleCloseBack = () => setOpenBack(false)

  const [openSubmit, setOpenSubmit] = useState(false)
  const handleCloseSubmit = () => setOpenSubmit(false)

  return (
    <>
      <div {...rest} className={twMerge('h-14 border-b flex space-x-4 items-center px-4 text-sm', className)}>
        <div className="flex-1">
          <Button variant='contained' size='small' color='error' 
            startIcon={<span className='icon'>power_settings_new</span>}
            onClick={() => setOpenBack(true)}
          >Thoát</Button>
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
          <Button variant='contained' size='small' 
            startIcon={<span className='icon'>send</span>}
            onClick={() => setOpenSubmit(true)}
          >Nộp bài</Button>
        </motion.div>
      </div>

      <Modal
        open={openBack}
        onClose={handleCloseBack}
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow rounded">
          fasd
        </Box>
      </Modal>

      <Modal
        open={openSubmit}
        onClose={handleCloseSubmit}
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow rounded">
          fasd
        </Box>
      </Modal>
    </>
  )
}

export default TestHeader