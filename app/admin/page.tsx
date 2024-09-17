import { DataTable } from '@/components/DataTable'
import StatCard from '@/components/StatCard'
import { columns } from '@/components/table/columns'
import { getRecentAppointmentsList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const Admin = async () => {

  const appointments = await getRecentAppointmentsList();
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href="/" className='cursor-pointer'>
        <div className="flex flex-row">
            <Image 
              src="/assets/icons/logo-icon.webp"
              height={1000}
              width={1000}
              alt="Patient"
              className="h-[2.5rem] w-fit rounded-[5px] border border-blue-500"
            />
            <h1 className="font-bold text-3xl ml-2">Medi Flow</h1>
          </div>
          <p className='text-16-semibold'>Admin Dashboard</p>
        </Link>
      </header>
      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome 👋🏼</h1>
          <p className='text-dark-700'>Start the day with managing new appointments</p>
        </section>
        <section className='admin-stat'>
          <StatCard 
            type='appointments'
            count={appointments.scheduledCount}
            label='Scheduled Appointments'
            icon='/assets/icons/appointments.svg'
          />
            <StatCard 
            type='pending'
            count={appointments.pendingCount}
            label='Pending Appointments'
            icon='/assets/icons/pending.svg'
          />
            <StatCard 
            type='cancelled'
            count={appointments.cancelledCount}
            label='Cancelled Appointments'
            icon='/assets/icons/cancelled.svg'
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  )
}

export default Admin