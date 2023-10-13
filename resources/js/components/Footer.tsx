import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Footer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { ...rest } = props

  const commonClasses = twMerge(
    `rounded-md border-2 border-gray-100 !bg-white/10 text-gray-100 font-black text-lg`,
    rest.className
  )

  rest.className = commonClasses

  return (
    <div {...rest}>Footer</div>
  )
}

export default Footer