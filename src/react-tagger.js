import React, { Component, PropTypes } from 'react'

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

const _tagsWrapperCSS = {
  display: 'inline-block',
  position: 'relative',
  top: '-24px'
}

class ReactTagger extends Component {

  constructor(props) {
    super(props)
    this.state = {
      textIndent: 0
    }
  }

  componentDidMount() {
    this.setTextIndent()
  }

  componentWillReceiveProps() {

  }

  setTextIndent() {
    this.setState({
      textIndent: this.refs.tagWrapper.offsetWidth
    })
  }

  renderTags() {
    return this.props.tags.map((tag) => {
      return <div style={_tagCSS} key={tag.id}>{tag.name}</div>
    })
  }

  render() {

    let inputCSS = Object.assign({}, _inputCSS, {
      textIndent: this.state.textIndent
    })

    return (
      <div className="react-tagger">
        <input type="text" style={inputCSS} />
        <div style={_tagsWrapperCSS} ref="tagWrapper">
          {this.renderTags()}
        </div>
      </div>
    )
  }

}

export default ReactTagger
