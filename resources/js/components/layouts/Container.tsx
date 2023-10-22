import { Button, Slider } from '@mui/material'
import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Container: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, children, ...rest } = props

  return (
    <div {...rest} className={twMerge('w-full max-w-screen-xl mx-auto', className)}>
      {children}
    </div>
  )
}

export default Container