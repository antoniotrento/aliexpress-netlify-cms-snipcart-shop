import React from 'react'
import { Card } from '@material-ui/core'

import CardHeader from '@material-ui/core/CardHeader/CardHeader'
import CardActionArea from '../../../node_modules/@material-ui/core/CardActionArea/CardActionArea'
import CardContent from '../../../node_modules/@material-ui/core/CardContent/CardContent'
import Typography from '../../../node_modules/@material-ui/core/Typography/Typography'
import Button from '../../../node_modules/@material-ui/core/Button/Button'
import CardActions from '../../../node_modules/@material-ui/core/CardActions/CardActions'
import CardMedia from '../../../node_modules/@material-ui/core/CardMedia/CardMedia'
import Img from 'gatsby-image'

const ProductCard = ({
  productImage,
  features,
  price,
  productURI,
  productTitle,
}) => {
  return (
    <Card style={{ maxWidth: '300px' }}>
      <CardMedia
        component="img"
        alt={productTitle}
        height="160"
        image={productImage}
        title={productTitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {productTitle}
        </Typography>
        <Typography component="p">{features}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color={'success'}>
          ${price} Buy Now
        </Button>
        <Button size="small" color="info">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
