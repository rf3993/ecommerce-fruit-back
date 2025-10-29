import express from 'express';
import Product from '../models/Product.js'
import multer from 'multer';
import stripeMethods from '../services/stripe.js'

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileName = `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`
      cb(null, fileName)
    }
  })

const upload = multer({ storage: storage })

router.post("/", upload.single("photo"), async (req, res) => {
    const {
        name, price, category
    } = req.body;
    //category pode ser: "fresh", "protein", "fruits"
    console.log("file", req.file);
    const stripeProduct = await stripeMethods.addProduct({
        name: name,
        default_price_data: {
            currency: 'BRL',
            unit_amount: parseInt(parseFloat(price) * 100)
        }
    })
    console.log(stripeProduct);
    const produto = await Product.create({
        name: name,
        price: price,
        category: category,
        photo: req.file.filename,
        stripe_id: stripeProduct.default_price
    })
    res.send(produto);
})

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

export default router;