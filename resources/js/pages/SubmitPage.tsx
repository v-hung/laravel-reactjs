import { useEffect, useState } from "react";
import Container from "../components/layouts/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTestStore, { TestHistoryType, TestType } from "../stores/test";
import useUserStore from "../stores/user";
import { formatTimeToString } from "../lib/helper";
import { Button } from "@mui/material";

const SubmitPage = () => {
  const { code, id }: any  = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const { findHistory } = useTestStore()

  const [test, setTest] = useState<TestType | null>(null)
  const [history, setHistory] = useState<TestHistoryType | null>(null)
  const { user } = useUserStore()

  useEffect(() => {
    const load = async () => {
      if (!code || !id) return
      const { test, history } = await findHistory(code, id)
      setTest(test)
      setHistory(history)

      setLoading(false)
    }
    load()
  }, [])

  return (
    <Container className="bg-white max-w-4xl mt-8">
      { loading
        ? <p>Đang tải...</p>
        : !test || !history || !user ? <p>Không tải được</p>
        : <>
            <div className="p-6 border-b text-center">
              <p className="text-lg font-semibold">Bài làm của bạn đã được gửi đi</p>
              <p className="mt-4">Điểm của bạn: <span className="text-2xl font-semibold">{history.point}</span></p>
            </div>
            <p className="text-center font-semibold mt-4">{test.title}</p>

            <div className="p-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2">
                      <div className="flex items-center space-x-2">
                        <span className="icon">person</span><span>Thí sinh</span>
                      </div>
                    </td>
                    <td className="text-end py-2 font-semibold">{user.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <div className="flex items-center space-x-2">
                        <span className="icon">schedule</span><span>Thời gian làm bài</span>
                      </div>
                    </td>
                    <td className="text-end py-2 font-semibold">{formatTimeToString(history.time)}</td>
                  </tr>
                  <tr className="text-green-600">
                    <td className="py-2">
                      <div className="flex items-center space-x-2">
                        <span className="icon">check_circle</span><span>Số câu trắc nghiệm đúng</span>
                      </div>
                    </td>
                    <td className="text-end py-2 font-semibold">{history.correct}</td>
                  </tr>
                  <tr className="text-red-600">
                    <td className="py-2">
                      <div className="flex items-center space-x-2">
                        <span className="icon">cancel</span><span>Số câu trắc nghiệm sai</span>
                      </div>
                    </td>
                    <td className="text-end py-2 font-semibold">{history.wrong}</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <div className="flex items-center space-x-2">
                        <span className="icon">all_inclusive</span><span>Tổng số câu trắc nghiệm</span>
                      </div>
                    </td>
                    <td className="text-end py-2 font-semibold">{history.correct + history.wrong}</td>
                  </tr>
                </tbody>
              </table>

              <Button variant="outlined" className="w-full mt-4" endIcon={<span className="icon">chevron_right</span>}
                onClick={() => navigate(`/answer-test/${test.code}/${history.id}`, { replace: true })}
              >Xem đáp án</Button>
            </div>
          </>
      }
    </Container>
  )
}

export default SubmitPage