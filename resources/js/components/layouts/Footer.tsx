import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from './Container'

const Footer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={twMerge('bg-gray-800', className)}>
      <Container className='py-8'>
        <div className="text-center text-white text-sm">
          © 2023 Việt Hùng. All Rights Reserved.
        </div>
      </Container>
    </div>
  )
}

export default Footer