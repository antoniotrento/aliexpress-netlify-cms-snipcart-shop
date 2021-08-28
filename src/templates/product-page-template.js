import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Img from '../components/PreviewCompatibleImage'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper/Paper'
import styled from 'styled-components'
import { Box, Thumbnail, commonProps, Button } from '../styled'
import Layout from '../components/Layout'
import css from '@styled-system/css'

const FeaturedImage = styled(Img)`
  max-width: 360px;
`

const ThumbNailImage = styled(Img)`
  width: 48px;
`


const ProductDescription = styled(Box)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Raleway', serif;
    text-transform: uppercase;
    color: #292929;
  }
  h1 {
    font-size: 1.2em;
    margin-bottom: 16px;
  }
  text-align: center;
`

export const Gallery = ({
  images,
  selectedImage,
  setSelectedImage,
  productPage = true,
}) => {
  const galleryWidth = productPage === true ? [1, 2 / 3, 1 / 2] : 1;
  return (
    <Box
      width={galleryWidth}
      display={'flex'}
      justifyContent="center"
      alignContent={'center'}
      flexDirection={'column'}
    >
      <Box>
        {images && images.length && <FeaturedImage imageInfo={selectedImage} />}
      </Box>

      {/* todo add select on hover */}
      <Box width={[1]} height={1} display={'flex'}>
        {images &&
          images.map((image, i) => {
            return (
              <Thumbnail
                border={'2px groove'}
                m={1 / 4}
                p={2}
                width={1}
                onClick={() => setSelectedImage(image)}
                display={'inline-block'}
              >
                <ThumbNailImage imageInfo={image} />
              </Thumbnail>
            )
          })}
      </Box>
    </Box>
  )
}

export const ProductTemplate = ({
  id,
  title,
  description,
  tags,
  featuredImage,
  variants,
  options,
  images,
  helmet,
  selectedImage,
  setSelectedImage,
  price,
}) => {
  price = price || 99.99
  return (
      <Box
        width={[1]}
        display={['flex']}
        mt={[16,32]}
        flexDirection={['column', 'column', 'row']}
        justifyContent={'center'}
      >
        {helmet || ''}
        {/*<PostContent content={content} />*/}
        <Box width={[1,1,1/2]} mb={[8,16]} mt={[8,16]} display={'flex'} justifyContent={'center'}>
          <Gallery
            images={images}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
          />
        </Box>

        <ProductDescription width={[1,1,1/2]} minWidth={'300px'}>
          <h1>{title}</h1>
          {/*
                            variant options
                            price datas for variant
                          */}
          
        {description && <HTMLContent content={description.html} css={description.css}/>}

                  <br/>

          <Button
            className="snipcart-add-item"
            data-item-id={id}
            data-item-name={title}
            data-item-price={price}
            data-item-url={`https://cms-snipcart.netlify.com/products/${id}`}
            data-item-description={description}
            bg={'success'}
          >
            ${price.toFixed(2)} Add to cart
          </Button>
        </ProductDescription>
      </Box>
  )
}

ProductTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ProductPageTemplate = ({ data }) => {
  const { markdownRemark: post } = data
  const item = post.frontmatter

  const [selectedImage, setSelectedImage] = useState(item.images[0])
  return (
    <Layout>
      <ProductTemplate
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${item.title}`}</title>
            <meta name="description" content={`${item.description}`} />
          </Helmet>
        }
        {...item}
      />
    </Layout>
  )
}

ProductPageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
          ...productMatter
        }
    }
  }
`
