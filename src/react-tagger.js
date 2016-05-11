import React, { Component, PropTypes } from 'react'
import Fuse from 'fuse.js'

const _inputCSS = {
  display: 'block',
  width: '100%',
  height: '24px',
  border: '1px solid #ddd',
  font: '15px Helvetica'
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

  componentWillReceiveProps() {

  }

  setTextIndent() {
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

  suggest(e) {
    const { searchIndex } = this.state
    const suggestions = this.flatten(searchIndex.search(e.target.value))
    this.setState({
      suggestions: suggestions
    })
  }

  selectSuggestedTag(tag) {
    this.setState({
      value: [...this.state.value, tag]
    })
  }

  renderSuggestedTags() {
    return this.state.suggestions.map((tag, i) => {
      return <div key={i} onClick={this.selectSuggestedTag.bind(this, tag)}>{tag}</div>
    })
  }

  render() {

    let inputCSS = Object.assign({}, _inputCSS, {
      textIndent: this.state.textIndent
    })

    return (
      <div className="react-tagger">
        <input type="text" style={inputCSS} onKeyUp={this.suggest.bind(this)} />
        <div style={_tagsWrapperCSS} ref="tagWrapper">
          {this.renderValueTags()}
        </div>
        <div style={_suggestionWrapCSS}>
          {this.renderSuggestedTags()}
        </div>
      </div>
    )
  }

}

export default ReactTagger
