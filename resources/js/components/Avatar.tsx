import { FC, HTMLAttributes} from 'react'
import { twMerge } from 'tailwind-merge'
import { UserType } from '../stores/user'
import { getImage } from '../lib/helper'

type State = HTMLAttributes<HTMLDivElement> & {
  user?: UserType | null
}

const Avatar: FC<State> = (props) => {
  const { className, user, ...rest } = props

  return (
    <div {...rest} className={twMerge('w-8 h-8 rounded-full bg-white', className)}>
      { user?.avatar
        ? <img src={getImage(user.avatar)} alt={`photo ${user.name}`} className='w-full h-full object-cover' />
        : <span className="w-full h-full icon icon-fill text-blue-600">person</span>
      }
    </div>
  )
}

export default Avatar