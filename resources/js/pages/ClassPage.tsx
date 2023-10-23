import Container from "../components/layouts/Container";
import { Button, IconButton, InputAdornment, Skeleton, TextField } from '@mui/material'
import useModalStore from "../stores/modal";
import Avatar from "../components/Avatar";

const ClassPage = () => {
  const { dispatch } = useModalStore()

  return (
    <Container className='py-4'>
      <h5 className="text-xl font-semibold">Lớp</h5>

      <div className="mt-6 flex justify-between">
        <TextField label="Tìm kiếm" size='small' className='bg-white' InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <span className='icon'>search</span>
            </InputAdornment>
          ),
        }} />

        <Button variant='contained' size='small' startIcon={<span className='icon'>add</span>} className='font-semibold'
          onClick={() => useModalStore.setState({isOpen: 'joinClass'})}
        >Tìm lớp</Button>
      </div>

      <div className="mt-8 grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        { new Array(1).fill(0).map((v,i) =>
          <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-[#566e7a] text-white">
              <p className="truncate text-xl">Công ty cổ phần CN và TT số KennaTech</p>
              <p className="mt-2">GV: Nguyễn Việt Hùng</p>
            </div>
            <div className="h-32 relative">
              <div className="absolute w-16 h-16 -top-8 right-4 bg-blue-200 rounded-full">
                <span className="w-full h-full icon icon-fill !text-5xl text-blue-600">person</span>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center justify-end space-x-1 border-t">
              <IconButton><span className="icon">person</span></IconButton>
              <IconButton><span className="icon">folder</span></IconButton>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default ClassPage