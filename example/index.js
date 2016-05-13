import React from 'react'
import { render } from 'react-dom'

import Tags from '../src/react-tagger'

let tags = [
  'Programming',
  'Other',
  'Sports'
]

render(
  <div>
    <Tags deleteIconURL='close.svg' value={tags} tags={['one', 'two', 'three', ...tags]} />
  </div>,
  document.getElementById('root')
)
