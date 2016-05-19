import React from 'react'
import { render } from 'react-dom'

import Tags from '../src/react-tagger'

const fixedWidthLayout = {
  width: '600px',
  margin: '20px auto'
}

let tags = [
  'javascript',
  'c++',
  'java',
  'scala',
  'pascal',
  'brainfuck',
  'go',
  'python'
]


let selectedTags = []
const tagsChanged = (tags) => {
  console.log(tags)
}

render(
  <div style={fixedWidthLayout}>
    <Tags
      deleteIconURL='close.svg'
      tags={tags}
      onChange={tagsChanged}
    />
    <Tags
      deleteIconURL='close.svg'
      tags={tags}
      onChange={tagsChanged}
      readonly={true}
      value={['javascript', 'c++']}
    />
  </div>,
  document.getElementById('root')
)
