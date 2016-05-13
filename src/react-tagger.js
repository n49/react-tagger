import React, { Component, PropTypes } from 'react'
import Fuse from 'fuse.js'


class ReactTagger extends Component {

  constructor(props) {
    super(props)
    this.state = {
      textIndent: 0,
      value: props.value,
      tags: props.tags,
      suggestions: [],
      searchIndex: null,
      activeSuggestion: 0
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
    if(offsetWidth === textIndent) return
    this.setState({
      textIndent: this.refs.tagWrapper.offsetWidth
    })
  }

  deleteTag(target) {
    this.setState({
      value: this.state.value.filter(tag => target !== tag)
    })
  }

  isInTags(target) {
    target = target.toLowerCase()
    let found = this.state.tags.filter(tag => target === tag.toLowerCase())
    return !!found[0]
  }

  shouldAddTagFromType(e) {
    let { value } = e.target
    let lastChar = value.substr(value.length - 1, 1)
    if(lastChar === ',' || lastChar === ' ') {
      value = value.substr(0, value.length - 1)
      if(!this.isInTags(value)) return false
      this.setState({
        value: [...this.state.value, value]
      })
      this.flushSuggestions()
      return true
    }
    return false
  }

  renderValueTags() {
    return this.state.value.map((tag) => {
      return <div key={tag} className="react-tagger-tag">
        <div className="react-tagger-delete-tag"
          onClick={this.deleteTag.bind(this, tag)}>
          <img src={this.props.deleteIconURL}
            width='13'
            height='13'
          />
        </div>
        {tag}
      </div>
    })
  }

  handleKeyUp(e) {
    this.controlSuggestionsWithKeys(e)
    if(this.shouldAddTagFromType(e)) this.flushInput()
    this.suggest(e)
  }

  suggest(e) {
    const { searchIndex } = this.state
    const suggestions = this.flatten(searchIndex.search(e.target.value))
    // remove that are already in use
    this.setState({
      suggestions: suggestions.filter(tag => {
        return this.state.value.indexOf(tag) === -1
      })
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

  controlSuggestionsWithKeys(e) {
    const { activeSuggestion, suggestions } = this.state
    // if(activeSuggestion === null && suggestions.length !== 0) {
    //   this.setState({
    //     activeSuggestion: 0
    //   })
    //   return
    // }
    if(e.key === 'Enter') {
      this.selectSuggestedTag(suggestions[activeSuggestion])
    }
    if(e.key === 'ArrowUp') {
      let newActive = activeSuggestion - 1
      if(newActive < 0) return
      this.setState({
        activeSuggestion: newActive
      })
    }
    if(e.key === 'ArrowDown') {
      let newActive = activeSuggestion + 1
      if(suggestions.length <= newActive) return
      this.setState({
        activeSuggestion: newActive
      })
    }
  }

  setSuggestionActive(key) {
    this.setState({
      activeSuggestion: key
    })
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
      suggestions: [],
      activeSuggestion: 0
    })
  }

  renderSuggestedTags() {
    let defaultClass = 'react-tagger-suggestion'
    return this.state.suggestions.map((tag, i) => {
      let className = defaultClass
      if(i === this.state.activeSuggestion) {
        className += ' react-tagger-suggestion-active'
      }
      return <div key={i}
        className={className}
        onMouseOver={this.setSuggestionActive.bind(this, i)}
        onClick={this.selectSuggestedTag.bind(this, tag)}>
        {tag}
      </div>
    })
  }

  componentDidUpdate() {
    this.setTextIndent()
  }

  render() {
    const inputCSS = { textIndent: this.state.textIndent }
    const suggestionWrapCSS = { left: this.state.textIndent }
    return (
      <div className="react-tagger">
        <input type="text"
          className="react-tagger-input"
          onKeyUp={this.handleKeyUp.bind(this)}
          onKeyDown={this.shouldDeletePrevTag.bind(this)}
          ref="inputField"
          style={inputCSS}
        />
        <div className="react-tagger-tag-wrapper" ref="tagWrapper">
          {this.renderValueTags()}
        </div>
        {this.state.suggestions.length !== 0 ?
          <div className="react-tagger-suggestions-wrapper" style={suggestionWrapCSS}>
            {this.renderSuggestedTags()}
          </div>
        : ''}
      </div>
    )
  }

}

export default ReactTagger
