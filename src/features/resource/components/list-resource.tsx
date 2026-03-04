import React from 'react'
import { Resource } from '../types/resource'
import { Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle, } from '@/shared/components/ui/item'
import { ShieldAlertIcon, StoneIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export default function ListResource({resource}:{resource: Resource[]}) {
  return (
    <>
    {resource && resource.length > 0 ? (
        <div className='max-w-sm flex flex-col gap-4 justify-center flex-auto'>
          {resource.map((res: any) => (
            <Item key={res.id} variant="outline">
                <ItemMedia variant="image">
                    <StoneIcon />
                </ItemMedia>
                <ItemContent>
              <ItemTitle className='text-xl'>{res.name}</ItemTitle>
              <ItemDescription>{res.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="destructive">
                    Delete
                </Button>
                </ItemActions>
            </Item>
          ))}
          </div>
      ) : (
        <p>No resources found.</p>
      )}
      </>
  )
  
}
