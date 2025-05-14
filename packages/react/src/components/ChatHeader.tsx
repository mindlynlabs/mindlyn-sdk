import { useState } from 'react'

import { EllipsisVerticalIcon } from '@/assets/icons/EllipsisVerticalIcon'
import { TrashIcon } from '@/assets/icons/TrashIcon'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { useChatContext } from '@/contexts/chat'
import { useConfigContext } from '@/contexts/config'

export function ChatHeader() {
  const { deleteChat } = useChatContext()
  const { header } = useConfigContext()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false)

  const handleDeleteClick = () => {
    deleteChat()
    setOpenDeleteDialog(false)
  }

  return (
    <div className='flex shrink-0 items-center border-b p-2 sm:p-3 justify-between'>
      <div>{header?.logo}</div>

      <div className='flex items-center gap-2'>
        {header?.right}
        <DropdownMenu open={openDropdownMenu} onOpenChange={setOpenDropdownMenu}>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='ghost' className='rounded-full' onClick={() => setOpenDropdownMenu(true)}>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          {openDropdownMenu && (
            <DropdownMenuContent align='end' side='bottom'>
              <DropdownMenuItem variant='destructive' onClick={() => setOpenDeleteDialog(true)}>
                <TrashIcon />
                Delete Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Delete Chat?</DialogTitle>
              <DialogDescription className='sr-only'>This will delete all data in chat</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant='outline' onClick={() => setOpenDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant='destructive' onClick={handleDeleteClick}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
