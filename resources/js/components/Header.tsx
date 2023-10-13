import { Button, Slider } from '@mui/material'
import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Header: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { ...rest } = props

  const commonClasses = twMerge(
    ``,
    rest.className
  )

  rest.className = commonClasses

  return (
    <div {...rest}>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="text-teal-600" />
    </div>
  )
}

export default Header