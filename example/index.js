import React from 'react'
import { render } from 'react-dom'

import Tags from '../src/react-tagger'

const fixedWidthLayout = {
  width: '600px',
  margin: '20px auto'
}

let tags = [
  'Programming',
  'Other',
  'Sports'
]

render(
  <div style={fixedWidthLayout}>
    <Tags deleteIconURL='close.svg' value={tags} tags={['one', 'two', 'three', ...tags]} />
  </div>,
  document.getElementById('root')
)
