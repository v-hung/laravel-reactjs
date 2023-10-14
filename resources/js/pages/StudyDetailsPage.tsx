import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const StudyDetailsPage = () => {
  const [data, setData] = useState([
    { icon: 'schedule', title: 'Thời gian làm bài', value: '40 phút' },
    { icon: 'pending_actions', title: 'Thời gian vào thi', value: 'Không giới hạn' },
    { icon: 'help', title: 'Số lượng câu hỏi', value: '50' },
    { icon: 'library_books', title: 'Loại đề', value: 'Trắc nghiệm' },
    { icon: 'group', title: 'Số lượt làm đề ', value: '1201 lượt' }
  ])

  return (
    <div className='w-full max-w-lg mx-auto flex flex-col space-y-4'>
      <div className='bg-white p-4 rounded-lg shadow'>
        <h5 className="text-lg font-semibold text-center">Path 2</h5>
        <p className='font-semibold mt-1 flex items-center space-x-2 justify-center'>
          <span>mã đề: amxvlv</span>
          <span className="icon text-blue-600">qr_code</span>
        </p>
        <table className='w-full text-sm mt-6'>
          {data.map((v,i) =>
            <tr key={i}>
              <td>
                <div className="flex items-center space-x-1">
                  <span className="icon text-lg">{v.icon}</span>
                  <span>{v.title}</span>
                </div>
              </td>
              <td className='text-right font-semibold'>{v.value}</td>
            </tr>
          )}
        </table>

        {/* @ts-ignore */}
        <Button LinkComponent={Link} to='/test/1' variant='contained' fullWidth className='mt-4'>Băt đầu thi</Button>
      </div>

      <p className="font-semibold">Lịch sử làm bài của bạn</p>

      <div className='bg-white p-4 rounded-lg shadow'>
        <h5 className="text-lg font-semibold text-center">Điểm của bạn: 0</h5>
       
        <table className='w-full text-sm mt-6'>
          <tr>
            <td>
              <div className="flex items-center space-x-1">
                <span className="icon text-lg">schedule</span>
                <span>Thời gian làm bài:</span>
              </div>
            </td>
            <td className='text-right font-semibold'>4 giây</td>
          </tr>
          <tr>
            <td>
              <div className="flex items-center space-x-1">
                <span className="icon text-lg text-green-500">check_circle</span>
                <span>Số lượng đúng</span>
              </div>
            </td>
            <td className='text-right font-semibold text-green-500'>0</td>
          </tr>
          <tr>
            <td>
              <div className="flex items-center space-x-1">
                <span className="icon text-lg">help</span>
                <span>Tổng số câu hỏi trong đề</span>
              </div>
            </td>
            <td className='text-right font-semibold'>50</td>
          </tr>
        </table>

        <Button variant='contained' color='gray' fullWidth className='mt-4 shadow hover:shadow text-gray-500 font-semibold'>
          Xem chi tiết bài làm
          <span className="icon">navigate_next</span>
        </Button>

        <p className="text-right mt-3 text-gray-500 text-sm">13/10/2023 23:44</p>
      </div>
    </div>
  )
}

export default StudyDetailsPage