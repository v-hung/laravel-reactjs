import { Box, Button, Modal } from '@mui/material'
import {Dispatch, FC, HTMLAttributes, SetStateAction, useEffect, useState} from 'react'
import { twMerge } from 'tailwind-merge'
import useUserStore from "../../stores/user";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import useTestStore, { AnswerType, TestType } from '../../stores/test';
import { Fetch, formatTimeToCountDown } from '../../lib/helper';

type State = HTMLAttributes<HTMLDivElement> & {
  test: TestType,
  answers: AnswerType[],
  numberOfUnansweredQuestions: number,
  loadingSubmit: boolean,
  setLoadingSubmit: Dispatch<SetStateAction<boolean>>
}

const TestHeader: FC<State> = (props)  => {
  const { 
    className, test, numberOfUnansweredQuestions,
    loadingSubmit, setLoadingSubmit, answers,
   ...rest 
  } = props

  const user = useUserStore(state => state.user)
  const { addTestHistory } = useTestStore()
  const navigate = useNavigate()

  const [openBack, setOpenBack] = useState(false)
  const handleCloseBack = () => setOpenBack(false)

  const [openSubmit, setOpenSubmit] = useState(false)
  const handleCloseSubmit = () => setOpenSubmit(false)

  const exit = () => {
    navigate(-1)
  }

  const submit = async () => {
    setOpenSubmit(false)
    setLoadingSubmit(true)

    const { testHistory } = await Fetch('/api/submit-test', {
      method: 'post',
      body: JSON.stringify({
        code: test.code,
        answers: answers,
        time: countDownTime - timeLeft
      })
    }).catch(e => ({ testHistory: null }))

    if (testHistory) {
      await addTestHistory(test.code, testHistory)
      navigate(`/submit-test/${test.code}/${testHistory.id}`, {
        replace: true
      })
    }
    else {
      navigate('/')
    }
  }

  const countDownTime = test.time * 60
  const [timeLeft, setTimeLeft] = useState(countDownTime)

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval)
        submit()
      }
      else setTimeLeft(prevTime => prevTime - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

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
            <span>{formatTimeToCountDown(timeLeft)}</span>
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
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow rounded w-96 bg-white">
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <span className="icon !text-3xl text-red-600">warning</span>
              <span className='font-semibold'>Bạn có chắc chắn muốn thoát?</span>
            </div>
            <p className='py-3 text-sm'>Thời gian làm bài còn lại của bạn còn : <span className="font-semibold">{formatTimeToCountDown(timeLeft)}</span></p>
            <p className="text-gray-600 text-sm">Khi bạn xác nhận thoát bài thi, bạn sẽ không thể tiếp tục làm bài ở lần thi này. Kết quả làm bài của bạn từ lúc bắt đầu vẫn sẽ được nộp lên. </p>
          </div>
          <div className="border-t p-4 flex justify-end space-x-4">
            <Button color='inherit' onClick={handleCloseBack}>Hủy</Button>
            <Button variant='contained' onClick={exit}>Xác nhận</Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openSubmit}
        onClose={handleCloseSubmit}
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow rounded w-96 bg-white">
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <span className="icon !text-3xl text-green-600">assignment_turned_in</span>
              <span className='font-semibold'>Bạn có chắc chắn muốn nộp bài ? </span>
            </div>
            <p className='py-3 text-sm'>Thời gian làm bài còn lại của bạn còn : <span className="font-semibold">{formatTimeToCountDown(timeLeft)}</span></p>

            { numberOfUnansweredQuestions > 0
              ? <p className='pb-3 text-sm text-red-600'>
                  <span className="font-semibold">Cảnh báo</span>: 
                  Bạn còn <span className="font-semibold">{numberOfUnansweredQuestions}</span> câu hỏi trắc nghiệm chưa trả lời. Bạn có chắc muốn kết thúc bài thi? 
                </p>
              : null
            }
            
            <p className="text-gray-600 text-sm">
              Khi xác nhận nhấn nộp bài, bạn sẽ không thể sửa lại bài thi của mình. Hãy chắc chắn bạn đã xem lại tất cả các đáp án. Chúc bạn may mắn 🍀.
              </p>
          </div>
          <div className="border-t p-4 flex justify-end space-x-4">
            <Button color='inherit' onClick={handleCloseSubmit}>Hủy</Button>
            <Button variant='contained' onClick={submit}>Xác nhận</Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default TestHeader