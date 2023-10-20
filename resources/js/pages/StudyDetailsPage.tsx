import { Button, Skeleton } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useTestStore, { TestType } from '../stores/test'

const StudyDetailsPage = () => {
  const [data, setData] = useState<{
    icon: string;
    title: string;
    value: string | number;
  }[]>([
    { icon: 'schedule', title: 'Thời gian làm bài', value: '60 phút' },
    { icon: 'pending_actions', title: 'Giới hạn vào thi', value: 'Không giới hạn' },
    { icon: 'help', title: 'Số lượng câu hỏi', value: '50' },
    
    { icon: 'group', title: 'Số lượt làm đề ', value: '0 lượt' }
  ])

  const { code } = useParams()
  const [loading, setLoading] = useState(true)
  
  const [test, setTest] = useState<TestType | null>(null)
  const { findTest } = useTestStore()

  useEffect(() => {
    const load = async () => {
      const testTemp = await findTest(code || '')
      setTest(testTemp)

      if (testTemp) {
        setData([
          { icon: 'schedule', title: 'Thời gian làm bài', value: `${testTemp.time} phút` },
          { icon: 'pending_actions', title: 'Giới hạn vào thi', value: 'Không giới hạn' },
          { icon: 'help', title: 'Số lượng câu hỏi', value: testTemp.question_number },
          { icon: 'library_books', title: 'Loại đề', value: 'Trắc nghiệm' },
          { icon: 'group', title: 'Số lượt làm đề ', value: `${testTemp.number || 0} lượt` }
        ])
      }

      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className='w-full max-w-lg mx-auto flex flex-col space-y-4'>
      { loading
        ? <div className='bg-white p-4 rounded-lg shadow flex flex-col items-center'>
            <Skeleton variant="text" width={100} sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
            <table className='w-full text-sm mt-6'>
              <tbody>
                {new Array(5).fill(0).map((v,i) =>
                  <tr key={i}>
                    <td><Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} /></td>
                    <td><Skeleton variant="text" width={150} sx={{ fontSize: '1rem', float: 'right' }} /></td>
                  </tr>
                )}
              </tbody>
            </table>

            <Skeleton variant="rounded" width={'100%'} height={30} className='mt-4' />
          </div>
        : test == null ? <p className='text-center'>Không tìm thấy đề</p>
        : <>
          <div className='bg-white p-4 rounded-lg shadow'>
            <h5 className="text-lg font-semibold text-center">{test.title}</h5>
            <p className='font-semibold mt-1 flex items-center space-x-2 justify-center'>
              <span>Mã đề: {test.code}</span>
              <span className="icon text-blue-600">qr_code</span>
            </p>
            <table className='w-full text-sm mt-6'>
              <tbody>
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
              </tbody>
            </table>

            {/* @ts-ignore */}
            <Button LinkComponent={Link} to={`/test/${test.code}`} variant='contained' fullWidth className='mt-4'>Băt đầu thi</Button>
          </div>

          <p className="font-semibold">Lịch sử làm bài của bạn</p>

          <div className='bg-white p-4 rounded-lg shadow'>
            <h5 className="text-lg font-semibold text-center">Điểm của bạn: 0</h5>
          
            <table className='w-full text-sm mt-6'>
              <tbody>
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
              </tbody>
            </table>

            {/* @ts-ignore */}
            <Button variant='contained' color='gray' fullWidth className='mt-4 shadow hover:shadow text-gray-500 font-semibold'>
              Xem chi tiết bài làm
              <span className="icon">navigate_next</span>
            </Button>

            <p className="text-right mt-3 text-gray-500 text-sm">13/10/2023 23:44</p>
          </div>
        </>
      }
    </div>
  )
}

export default StudyDetailsPage