import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import ProductCard from '../components/Product Card/ProductCard'
import img from '../../static/img/antitheft.jpg'

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Product Card', module).add('Product Card', () => (
  <ProductCard
    features={'a short description'}
    productImage={img}
    price={'40.00'}
    productTitle={'Waterproof Backpack w/ Charger'}
  />
))
