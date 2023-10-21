import { Skeleton } from "@mui/material"

const TestPageLoading = () => {
  return (
    <div className='w-full h-full bg-slate-100 flex flex-col overflow-hidden'>
      <div className="h-14 border-b flex space-x-4 items-center justify-between p-4">
        <Skeleton variant='rounded' width={100} height={30} />
        <Skeleton variant='rounded' width={200} height={25} />
        <Skeleton variant='rounded' width={100} height={30} />
      </div>

      <div className="flex px-4 py-8 space-x-4 items-start mt-2">
        <div className="flex-grow min-w-0 flex flex-col space-y-6">
          { new Array(6).fill(0).map((v,i) =>
            <div key={i} className='w-full rounded-md bg-white shadow'>
              <div className="p-4">
                <Skeleton variant='rounded' width={500} height={20} />
              </div>

              <div className="flex flex-wrap -mx-2 p-4">
                <div className="w-1/2 sm:w-1/4 px-2 mb-4">
                  <Skeleton variant='rounded' width={100} height={30} />
                </div>
                <div className="w-1/2 sm:w-1/4 px-2 mb-4">
                  <Skeleton variant='rounded' width={100} height={30} />
                </div>
                <div className="w-1/2 sm:w-1/4 px-2 mb-4">
                  <Skeleton variant='rounded' width={100} height={30} />
                </div>
                <div className="w-1/2 sm:w-1/4 px-2 mb-4">
                  <Skeleton variant='rounded' width={100} height={30} />
                </div>
              </div>
              
              <div className="rounded-b-md">
                <Skeleton variant='rectangular' width={'100%'} height={40} />
              </div>
            </div>
          )}
        </div>

        <div className="sticky top-[96px] w-96 p-4 rounded bg-white">
          <Skeleton variant='rounded' width={200} height={20} />

          <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
            {new Array(30).fill(0).map((v,i) =>
              <Skeleton key={i} variant='rounded' width={'100%'} height={40} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPageLoading