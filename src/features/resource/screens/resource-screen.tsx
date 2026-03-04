'use client'
import React, { use } from 'react'
import CreateResourceDialog from '../components/create-resource-dialog'
import { Button } from '@/shared/components/ui/button'
import useResourcesQuery from '../hooks/use-resource-query'
import ListResource from '../components/list-resource'

export default function resourceScreen() {
const {data:resource, isPending} = useResourcesQuery();
  return (
    <div className='flex flex-col gap-4'>
      <CreateResourceDialog>
        <Button className='max-w-sm'>Create Resource</Button>
      </CreateResourceDialog>
      {isPending && <p>Loading...</p>}
      <ListResource resource={resource}/>
    </div>
  )
}
