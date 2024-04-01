"use client"
import { DatePickerForm } from '@/components/giving/DatePicker'
import { columns } from '@/components/giving/GivingColumns'
import { DataTable } from '@/components/giving/GivingDataTable'
import { useState } from 'react'
const Page = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [dateId, setDateId] = useState<string | null>(null)
  const handleDate = (date: string | null, dateId: string | null) => {
    setSelectedDate(date)
    setDateId(dateId)
  }
  return (
    // <div className='flex mx-auto p-4'><DatePickerForm/></div>
    <div className="flex mx-auto mt-4 w-4/5">
      <div className="w-1/2">
        <DatePickerForm onDateSelect={handleDate} />
      </div>
      <div className="w-1/2">
        {selectedDate && <DataTable columns={columns} data={[]} selectedDate={selectedDate} dateId = {dateId}/>}
      </div>
    </div>
  );
}

export default Page