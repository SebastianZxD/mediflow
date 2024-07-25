import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface StatCardProps {
  count: number
  label: string
  icon: string
  type: 'appointments' | 'pending' | 'cancelled'
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div className={clsx('stat-card', {
      'bg-appointments bg-yellow-950/20': type === 'appointments',
      'bg-pending bg-blue-950/20': type === 'pending',
      'bg-cancelled bg-red-950/20': type === 'cancelled'
    })}>
      <div className='flex items-center gap-4'>
        <Image
          src={icon}
          width={32}
          height={32}
          alt={label}
          className='size-8 w-fit'
        />
        <h2 className='text-32-bold text-white'>{count}</h2>
        <p className='text-14-regular'>{label}</p>
      </div>
    </div>
  )
}

export default StatCard