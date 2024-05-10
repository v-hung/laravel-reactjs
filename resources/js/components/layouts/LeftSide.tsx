import { Tooltip } from '@mui/material'
import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useResolvedPath } from 'react-router-dom'
import { motion } from "framer-motion"
import { twMerge } from 'tailwind-merge'

const LeftSide: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { className, ...rest } = props

    const [menu, setMenu] = useState([
        { icon: 'feed', title: 'Tài liệu', path: '/posts' },
        { icon: 'library_books', title: 'Bài kiểm tra', path: '/exam' },
        { icon: 'school', title: 'Lớp', path: '/class' },
    ])

    const [positionRouterActive, setPositionRouterActive] = useState(0)

    const location = useLocation()

    useEffect(() => {
        const index = menu.findIndex(v => {
            return (location.pathname != "/" && v.path != '/') ? location.pathname.includes(v.path) : (location.pathname == v.path)
        })
        setPositionRouterActive(index < 0 ? 0 : index * 50)
    }, [location])

    return (
        <div {...rest} className={twMerge('w-20 text-white flex flex-col', className)}>
            <div className="h-16 grid place-items-center border-b mr-4">
                <Link to={'/'} className="text-2xl font-black">VH</Link>
            </div>

            <div className="flex-grow relative overflow-y-auto flex flex-col py-6 pr-4">
                {menu.map((v, i) =>
                    <NavLink key={i} to={v.path} className={({ isActive }) =>
                        `relative z-10 ${isActive || i == positionRouterActive ? "text-blue-600" : ""}`
                    }>
                        <Tooltip title={v.title} placement="right" arrow>
                            <span className="icon h-[50px]">{v.icon}</span>
                        </Tooltip>
                    </NavLink>
                )}

                <motion.div className="absolute w-full right-0"
                    initial={false}
                    animate={{ y: positionRouterActive }}
                >
                    <div className="w-full h-[50px] bg-gray-50 rounded-l-full"></div>
                    <svg className='absolute w-6 h-6 right-0 top-[-23px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 3 3">
                        <path d="M 0 0 L 3 0 L 3 -3 C 3 -1 2 0 0 0" fill="#fff" />
                    </svg>
                    <svg className='absolute w-6 h-6 right-0 bottom-[-23px] -scale-y-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 3 3">
                        <path d="M 0 0 L 3 0 L 3 -3 C 3 -1 2 0 0 0" fill="#fff" />
                    </svg>
                </motion.div>
            </div>

            <div className="flex-none py-4 mr-4">
                <span className="icon">settings</span>
            </div>
        </div>
    )
}

export default LeftSide