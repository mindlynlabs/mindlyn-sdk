import { LoaderCircleIcon } from '@/assets/icons/LoaderCircleIcon'

export function Spinner() {
  return (
    <div className='flex flex-1 h-full justify-center items-center'>
      <LoaderCircleIcon className='animate-spin text-muted-foreground' />
    </div>
  )
}
