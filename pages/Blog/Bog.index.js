import { useRouter } from 'next/router'
import React from 'react'

export default function Bog_index() {
    var router = useRouter()
  return (
    <div className='p-[20%] bg-red-500' onClick={() => router.push('/')}>Bog.index</div>
  )
}
