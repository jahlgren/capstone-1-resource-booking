'use client'
import React, { use } from 'react'
import CreateResourceDialog from '../components/create-resource-dialog'
import { Button } from '@/shared/components/ui/button'
import useResourcesQuery from '../hooks/use-resource-query'

export default function resourceScreen() {
const {data:resource, isPending} = useResourcesQuery();
  return (
    <div>
      <CreateResourceDialog>
        <Button>Create Resource</Button>
      </CreateResourceDialog>
      {isPending && <p>Loading...</p>}
      {resource && resource.length > 0 ? (
        <ul>
          {resource.map((res: any) => (
            <li key={res.id}>
              <h3>{res.name}</h3>
              <p>{res.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
  )
}
