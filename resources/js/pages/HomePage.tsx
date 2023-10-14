import { Accordion, AccordionDetails, AccordionSummary, Button, Container, InputAdornment, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Container className='py-4'>
      <h5 className="text-xl font-semibold">Đề thi</h5>

      <div className="mt-6 flex justify-between">
        <TextField label="Tìm kiếm" size='small' InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <span className='icon'>search</span>
            </InputAdornment>
          ),
        }} />

        <Button variant='contained' size='small' startIcon={<span className='icon'>add</span>} className='font-semibold'>Tìm giáo viên</Button>
      </div>

      <div className="mt-6">
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<span className='icon'>keyboard_arrow_down</span>}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center">
                <span className="font-semibold">HG</span>
              </div>
              <p className='font-semibold'>Cô Hoàng Thu Giang</p>
              <p>G_B1.Tháng 11.2023 </p>
              <p className="text-sm text-slate-500">(Sĩ số: 33 - Năm học: 2023 - 2024)</p>
            </div>
          </AccordionSummary>
          <AccordionDetails className='px-4 pb-4 py-0'>
            <Link to={"/exam/1"} className='rounded p-3 bg-slate-200 flex space-x-4'>
              <span className="icon text-5xl text-orange-600">note_stack</span>
              <div>
                <p className="font-semibold">Part 2</p>
                <div className="mt-1 text-xs text-slate-500 font-semibold">
                  <p>1195 lượt làm đề</p>
                  <p>Thời gian vào thi: Không thời hạn</p>
                </div>
              </div>
            </Link>
          </AccordionDetails>
        </Accordion>

        <Accordion>
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
        </Accordion>
      </div>
    </Container>
  )
}

export default HomePage