import { Accordion, AccordionDetails, AccordionSummary, Button, InputAdornment, Skeleton, TextField } from '@mui/material'
import Container from "../components/layouts/Container";
import { Link } from 'react-router-dom'
import useTestStore from '../stores/test'
import { useEffect, useState } from 'react'
import { Fetch, promiseFunction } from '../lib/helper'
import useModalStore from '../stores/modal';

const StudyPage = () => {
    const { isLoad, tests, loadTests } = useTestStore()
    const { dispatch } = useModalStore()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const load = async () => {
            if (!isLoad) {
                await promiseFunction({
                    loading,
                    setLoading,
                    showSuccessTitle: false,
                    callback: async () => {
                        await loadTests()
                    }
                })
            }
            else {
                setLoading(false)
            }
        }
        load()
    }, [])

    return (
        <Container className='py-4'>
            <h5 className="text-xl font-semibold">Bài kiểm tra</h5>

            <div className="mt-6 flex justify-between">
                <TextField label="Tìm kiếm" size='small' className='bg-white' InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <span className='icon'>search</span>
                        </InputAdornment>
                    ),
                }} />

                <Button variant='contained' size='small' startIcon={<span className='icon'>add</span>} className='font-semibold'
                    onClick={() => dispatch({ isOpen: 'joinClass' })}
                >Tìm lớp</Button>
            </div>

            <div className="mt-6">
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<span className='icon'>keyboard_arrow_down</span>}
                    >
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center">
                                <span className="font-semibold">VH</span>
                            </div>
                            <p className='font-semibold'>Danh sách bài kiểm tra</p>
                            <p>Tháng 11.2023 </p>
                            <p className="text-sm text-slate-500">(Sĩ số: 3 - Năm học: 2023 - 2024)</p>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className='px-4 pb-4 py-0'>
                        {loading
                            ? <div className='rounded p-3 bg-slate-100 flex items-center space-x-4'>
                                <Skeleton variant="rounded" width={50} height={50} />
                                <div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={50} />
                                    <div className="mt-1">
                                        <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} width={100} />
                                        <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} width={200} />
                                    </div>
                                </div>
                            </div>
                            : <div className="flex flex-col space-y-4">
                                {tests.length > 0 ? tests.map(v =>
                                    <Link key={v.id} to={`/exam/${v.code}`} className='rounded p-3 bg-slate-200 flex space-x-4'>
                                        <span className="icon text-5xl text-orange-600">note_stack</span>
                                        <div>
                                            <p className="font-semibold">{v.title}</p>
                                            <div className="mt-1 text-xs text-slate-500 font-semibold">
                                                <p>{v.number || 0} lượt làm đề</p>
                                                <p>Thời gian vào thi: Không thời hạn</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                                    : <p className='p-2'>Không có bài kiểm tra nào</p>
                                }
                            </div>
                        }
                    </AccordionDetails>
                </Accordion>

                {/* <Accordion>
                    <AccordionSummary
                        expandIcon={<span className='icon'>keyboard_arrow_down</span>}
                    >
                        <p className='font-semibold'>Đề bạn đã làm</p>
                    </AccordionSummary>
                    <AccordionDetails className='px-4 pb-4 py-0'>
                        <div className='rounded p-6 bg-slate-200'>
                            <p className="text-center">Chưa có đề thì nào</p>
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<span className='icon'>keyboard_arrow_down</span>}
                    >
                        <p className='font-semibold'>Danh sách lớp lưu trữ (0)</p>
                    </AccordionSummary>
                    <AccordionDetails className='px-4 pb-4 py-0'>
                        <div className='rounded p-6 bg-slate-200'>
                            <p className="text-center">Chưa có lớp học nào được lưu trữ</p>
                        </div>
                    </AccordionDetails>
                </Accordion> */}
            </div>
        </Container>
    )
}

export default StudyPage