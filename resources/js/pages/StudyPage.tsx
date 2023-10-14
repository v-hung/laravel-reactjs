import { Accordion, AccordionDetails, AccordionSummary, Button, Container, InputAdornment, TextField } from '@mui/material'

const StudyPage = () => {
  return (
    <Container className='py-4'>
      <h5 className="text-xl font-semibold">Bài tập</h5>

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
        <Accordion>
          <AccordionSummary
            expandIcon={<span className='icon'>keyboard_arrow_down</span>}
          >
            <p className='font-semibold'>Đề bạn đã làm</p>
          </AccordionSummary>
          <AccordionDetails className='px-4 pb-4 py-0'>
            <div className='rounded p-6 bg-gray-200'>
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
            <div className='rounded p-6 bg-gray-200'>
              <p className="text-center">Chưa có lớp học nào được lưu trữ</p>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  )
}

export default StudyPage