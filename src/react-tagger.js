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

const _tagDeleteCSS = {
  display: 'inline-block'
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
      textIndent: 0,
      value: props.value
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

  deleteTag(target) {
    this.setState({
      value: this.state.value.filter(tag => tag !== target)
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

  render() {

    let inputCSS = Object.assign({}, _inputCSS, {
      textIndent: this.state.textIndent
    })

    return (
      <div className="react-tagger">
        <input type="text" style={inputCSS} />
        <div style={_tagsWrapperCSS} ref="tagWrapper">
          {this.renderValueTags()}
        </div>
      </div>
    )
  }

}

export default ReactTagger
