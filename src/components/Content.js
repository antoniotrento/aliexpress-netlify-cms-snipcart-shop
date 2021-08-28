import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// import css from '@styled-system/css'
class StyledDiv extends React.Component {
  componentDidMount() {
    console.log(this.props.styleString)
    this.refs.theDiv.setAttribute('style', this.props.styleString);
  }

  componentDidUpdate() {
    this.refs.theDiv.setAttribute('style', this.props.styleString);
  }

  render() {
    return (
      <div ref="theDiv" />
    );
  }
}

export const HTMLContent = ({ content, css }) => {
  
  return (
    <>
    <style dangerouslySetInnerHTML={{__html: css}} />
      <div css={css} dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
