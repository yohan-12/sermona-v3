import EditForm from '@/components/people/form/edit-form';
import React from 'react'
import { fetchMemberById } from '@/lib/data';
import { notFound } from 'next/navigation';
const page = async ({params}: {params: {id: string}}) => {
    const id = params.id;
    const member = await fetchMemberById(id)
    if(!member){
      notFound();
    }
  return (
    <div className="relative mx-auto mt-10 space-y-6 p-6 text-center ">
      <EditForm member={member} />
    </div>
  );
}

export default page