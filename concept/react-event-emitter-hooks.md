# React Event Emitter with Hooks

```tsx
import React from 'react'
import { useEventEmitter, useEmitter, useListener } from 'react-event-hooks'

const ComponentA = () => {
  const value = useListener((type, value) => { 
    console.assert(type === 'fromB')
    return value
  })
  return (<div>{value}</div>)
}

const ComponentB = () => {
  // last parameter will always 'caller'
  const emitter = useEmitter((number, caller) => caller('fromB', value))
  return (
    <button onClick={(target) => emitter(target.value)}/>
  )
}

const SuperComponent = () => {
  const EventProvider = useEventEmitter()
  return (
    <EventProvider>
      <ComponentA/>
      <ComponentB/>
    </EventProvider>
  )
}
```
