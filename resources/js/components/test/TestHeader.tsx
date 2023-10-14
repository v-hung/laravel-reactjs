import { Button } from '@mui/material'
import {FC, HTMLAttributes} from 'react'
import { twMerge } from 'tailwind-merge'
import useUserStore from "../../stores/user";

const TestHeader: FC<HTMLAttributes<HTMLDivElement>> = (props)  => {
  const { className, ...rest } = props

  const user = useUserStore(state => state.user)

  return (
    <div {...rest} className={twMerge('h-14 border-b flex space-x-4 items-center bg-white px-4 text-sm', className)}>
      <div className="flex-1">
        <Button variant='contained' size='small' color='error' startIcon={<span className='icon'>power_settings_new</span>}>Thoát</Button>
      </div>


      <div className="flex-grow font-semibold text-center">Thí sinh: {user?.name}</div>

      <div className="flex-1 flex items-center justify-end space-x-4">
        <p className="flex items-center space-x-2">
          <span className="icon">timer</span>
          <span>00 : 25 : 47</span>
        </p>
        <Button variant='contained' size='small' startIcon={<span className='icon'>send</span>}>Nộp bài</Button>
      </div>
    </div>
  )
}

export default TestHeader