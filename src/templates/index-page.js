import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import { Box, Thumbnail, commonProps } from '../styled'
import Layout from '../components/Layout'
import Img from '../components/PreviewCompatibleImage'
import { Gallery } from '../templates/product-page-template'

const Page = ({ data }) => {
  console.log(data)
  const products = data.allMarkdownRemark.edges
  // allMarkdownRemark:
  // edges: Array(12)
  // 0:
  // node:
  // frontmatter: {title: "Mark Ryden Backpack Student Water Repellen Nylon B… Mochila Quality Brand Laptop Bag School Backpack", description: null, tags: Array(32), featuredimage: null, variants: Array(16), …}
  // id: "d7e

  return (
    <Layout>
      <Box mt={20} width={1} display={'flex'} flexWrap={'wrap'} alightContent={'stretch'} alignItems={'stretch'}>
        {products.map(edge => {
          const { frontmatter } = edge.node
          const [selectedImage, setSelectedImage] = useState(
            frontmatter.images[0]
          )
          return (
            <Box width={[1,1/2,1/2,1/2]} height={'fit-content'} display={'flex'} p={10} justifyContent={'center'} border={'2px solid black'} flexDirection={'column'}>

              <Link to={`/products/${frontmatter.id}`}>
                <h1>{frontmatter.title}</h1>
              </Link>
              <Gallery
                images={frontmatter.images}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
                productPage={false}
              />

            </Box>
          )
        })}
      </Box>
    </Layout>
  )
}
export default Page

export const pageQuery = graphql`
  
query {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products/"}}) {
    edges {
      node {
        id
        frontmatter {
          ...productMatter
        }
      }
    }
  }
}
`
