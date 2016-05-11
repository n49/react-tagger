import React from 'react'
import { render } from 'react-dom'

import Tags from '../src/react-tagger'

let tags = [
  {
    id: 1,
    name: 'Programming'
  },
  {
    id: 2,
    name: 'Gaming'
  },
  {
    id: 3,
    name: 'Archery'
  }
]

render(
  <div>
    <Tags tags={tags} />
  </div>,
  document.getElementById('root')
)
