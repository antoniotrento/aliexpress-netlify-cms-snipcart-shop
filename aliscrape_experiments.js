/*
    ideas: scrape reviews and / or rip images from reviews
*/

var AliexScrape = require('aliexscrape');
const fs = require('fs'),
  yaml = require('js-yaml'),
  request = require('request');




const download = (uri, filename, callback) => {
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename));
  });
};

function ensureDirSync (dirpath) {
  try {
    fs.mkdirSync(dirpath, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}
function getSum(total, num) {
  return total + num;
}
let getScaledPrice = (variants, scaler=0.1) => {
  let vars = variants.map(variant => (parseFloat(variant.pricing)))
  let sum = vars.reduce(getSum)

  return sum/vars.length*(scaler+1)
}
let save = id => {
  if (id.length > 15) {
    let parts = id.split('.html')[0].split('/')
    id = parts[parts.length-1]
  }
  AliexScrape(id) // 32853590425 is a productId
    .then(response =>
      {

        let parts = response.split("\"description\"")
        // todo regex image srcs out of description, maybe other stuff
        // description returns html block from ali
        // console.log(parts[1])
        let data = JSON.parse(
          parts[0].slice(0,-1) + "}")
        // var jsonPretty = JSON.stringify(data,null,2);
        // console.log(jsonPretty)
        let images = []

        // let productDir = 'products/'+data.productId + '/'
        let imageDir = 'static/img/'
        ensureDirSync('pages/products');
        ensureDirSync(imageDir);
        // gallery images
        data.pics.forEach((pic, i) => {
          let path = `${data.productId}_${i}${pic.split('/')[pic.split('/').length-1]}`
          download(pic, imageDir + path)
          images.push(`../../../static/img/${path}`)
        })

        // variant images
        console.log(data.productId)
        data.attributes.forEach((attributeType, i) => {
          attributeType.options.forEach((attribute, j) => {
            if (attribute.src){
              let pathsplit = attribute.src.split('.')
              let ext = pathsplit[pathsplit.length-1]
              let path = `${data.productId}_${attributeType.title}_${i}_${j}.${ext}`
              download(attribute.src, imageDir + path)
              data.attributes[i].options[j].src = `../../../static/img/${path}`
            }
          })
        })


        // populate tags from descriptions, can be optimized significantly
        let getTags = () => {
          tags = []
          data.properties
            .filter(item => (item.propertyDescription != 'No'))
            .map(item => {
              Object.values(item).forEach(val => tags.push(val))

            })
          return tags
        }
        // data.variations combine with data.attributes
        // for attribute in attributes create list grid, filter other attributes by variant where
        let prod = {
          templateKey: 'product-page-template',
          featuredImage: images.filter(item => (item !== null))[0],
          price: getScaledPrice(data.variations, 0.2),
          id:data.productId,
          title:data.productTitle,
          images:images,
          options: data.attributes,
          variants: data.variations,
          tags: getTags(),
          meta: {},
          description: ''
        }
        console.log('featured', images.filter(item => (item !== null))[0])
        yamldata = yaml.load(JSON.stringify(prod))
        // todo check if file already exists, maybe implement merge or "do you want to overwrite" prompt if lazy
        fs.writeFile('src/pages/products/' + data.productId+'.md',
          '---\n' + yaml.dump(yamldata) + '---',
          (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            console.log('product saved');
          });
        return data
      }
    )
    .catch(error => console.log(error));
}

let ids = [
  '32811386528',
  '32845363479',
  '32993992335',
  '33006553382',
  '32957656581',
  '32770463181',
  '32817753623',
  '32863212725',
  '32862038594',
  '32888020022',
  '32914217114',
  'https://www.aliexpress.com/item/10moons-10-6-Inch-Professional-Graphic-Tablet-8192-Levels-Digital-Drawing-Tablet-No-need-charge-Pen/32851786287.html?spm=a2g01.12827056.layer-vsf5pa.26.145a2234BsUFJg&gps-id=6547861&scm=1007.24566.128702.0&scm_id=1007.24566.128702.0&scm-url=1007.24566.128702.0&pvid=b569d1e1-9151-44ca-a134-55aca69190ff',

]
ids.map(id => save(id))
