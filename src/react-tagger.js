import React, { Component, PropTypes } from 'react'
import Fuse from 'fuse.js'

const _inputCSS = {
  display: 'block',
  width: '100%',
  height: '24px',
  border: '1px solid #ddd',
  font: '15px Helvetica',
  outline: 'none'
}

const _tagCSS = {
  display: 'inline-block',
  textAlign: 'center',
  backgroundColor: 'yellow',
  borderRadius: '4px',
  marginRight: '5px'
}

const _tagDeleteCSS = {
  display: 'inline-block'
}

const _tagsWrapperCSS = {
  display: 'inline-block',
  position: 'relative',
  top: '-24px'
}

const _suggestionWrapCSS = {
  position: 'relative',
  width: '200px',
  border: '1px solid #ddd',
  top: '-20px'
}

class ReactTagger extends Component {

  constructor(props) {
    super(props)
    this.state = {
      textIndent: 0,
      value: props.value,
      tags: props.tags,
      suggestions: [],
      searchIndex: null
    }
  }

  componentDidMount() {
    this.setTextIndent()
    this.indexTags(this.state.tags)
  }

  indexTags(tags) {
    tags = tags.map((tag) => {
      return { name: tag }
    })
    this.state.searchIndex = new Fuse(tags, {
      keys: ['name']
    })
  }

  flatten(array) {
    return array.map(item => item.name)
  }

  setTextIndent() {
    const { offsetWidth } = this.refs.tagWrapper
    const { textIndent } = this.state
    if(offsetWidth === textIndent) return;
    this.setState({
      textIndent: this.refs.tagWrapper.offsetWidth
    })
  }

  deleteTag(target) {
    this.setState({
      value: this.state.value.filter(tag => target !== tag)
    })
  }

  renderValueTags() {
    return this.state.value.map((tag) => {
      return <div style={_tagCSS} key={tag}>
        <div style={_tagDeleteCSS}
          onClick={this.deleteTag.bind(this, tag)}>x</div>
        {tag}
      </div>
    })
  }

  handleKeyUp(e) {
    if(this.shouldDeletePrevTag(e)) return;
    this.suggest(e)
  }

  suggest(e) {
    const { searchIndex } = this.state
    const suggestions = this.flatten(searchIndex.search(e.target.value))
    this.setState({
      suggestions: suggestions
    })
  }

  shouldDeletePrevTag(e) {
    if(e.key === 'Backspace' && e.target.value.length === 0) {
      this.deleteTag(this.state.value[this.state.value.length - 1])
      this.flushSuggestions()
      return true
    }
    return false
  }

  selectSuggestedTag(tag) {
    this.setState({
      value: [...this.state.value, tag]
    })
    this.flushInput()
    this.flushSuggestions()
  }

  flushInput() {
    this.refs.inputField.value = ''
  }

  flushSuggestions() {
    this.setState({
      suggestions: []
    })
  }

  renderSuggestedTags() {
    return this.state.suggestions.map((tag, i) => {
      return <div key={i} onClick={this.selectSuggestedTag.bind(this, tag)}>{tag}</div>
    })
  }

  componentDidUpdate() {
    this.setTextIndent()
  }

  render() {

    let inputCSS = Object.assign({}, _inputCSS, {
      textIndent: this.state.textIndent
    })

    let suggestionWrapCSS = Object.assign({}, _suggestionWrapCSS, {
      left: this.state.textIndent
    })

    return (
      <div className="react-tagger">
        <input type="text"
          style={inputCSS}
          onKeyUp={this.suggest.bind(this)}
          onKeyDown={this.shouldDeletePrevTag.bind(this)}
          ref="inputField"
        />
        <div style={_tagsWrapperCSS} ref="tagWrapper">
          {this.renderValueTags()}
        </div>
        {this.state.suggestions.length !== 0 ?
          <div style={suggestionWrapCSS}>
            {this.renderSuggestedTags()}
          </div>
        : ''}
      </div>
    )
  }

}

export default ReactTagger
