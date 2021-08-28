import React from 'react'
import styled from 'styled-components'
import {
  space,
  color,
  width,
  fontSize,
  display,
  padding,
  border,
  flex,
  justifyContent,
  justifyItems,
  justifySelf,
  background,
  flexDirection,
  flexWrap,
  size,
  height,
  compose,
  maxWidth,
  maxHeight,
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
  alignItems,
  alignContent,
  alignSelf
} from 'styled-system'

export const gridProps = compose(
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea
)
export const commonProps = compose(
  space,
  color,
  width,
  fontSize,
  display,
  padding,
  border,
  flexDirection,
  flexWrap,
  height,
  maxWidth,
  maxHeight,
  flex,
  alignItems,
  alignContent,
  alignSelf,

  justifyContent,
  justifyItems,
  justifySelf,
)

export const Grid = styled.div`
${gridProps}
`

export const Box = styled.div`
  ${commonProps} 
  height: fit-content
`



export const Thumbnail = styled.a`
  ${commonProps}
  width: 56px;
  justify-content: center;
`

export const Button = styled.button`
${commonProps} 
`
