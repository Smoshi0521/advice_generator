import React from 'react'
import { BsPauseFill } from 'react-icons/bs'
function Divider() {
  return (
    <>
      <div className='w-full flex items-center gap-2 px-2 '>
        <span className='border border-slate-500 w-full'></span>
        <svg className='h-[16px] w-[70px] flex justify-center' fill='white'>
          <g className='translate-x-[5px]'>
            <rect width="6" height="16" rx="3" /><rect x="14" width="6" height="16" rx="3" />
          </g>
        </svg>
        <span className='border border-slate-500 w-full'></span>
      </div>
    </>
  )
}

export default Divider