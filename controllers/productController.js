const Product = require('../models/Product');
const categoryCtrl = require('../controllers/categoryController');

exports.createProduct = (req, res, next) => {
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json(product))
        .catch(error => res.status(400).json({ error }));
};

exports.getProduct = (req, res, next) => {

    if (!req.params?._id)
        Product.find()
            .then(async products => {
                for (const p of products) {
                    p.category = await categoryCtrl.getCategoryById(p.category);
                }
                res.status(200).json(products)
            })
            .catch(error => res.status(400).json({ error }));
    else

        Product.findOne({ _id: req.params._id })
            .then(product => res.status(200).json(product))
            .catch(error => res.status(404).json({ error }))
};

exports.updateProduct = (req, res, next) => {
    Product.updateOne({ _id: req.params._id }, { ...req.body, _id: req.params._id })
        .then( () => res.status(200).json({message:'updated successfully'}))
        .catch(() => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params._id })
        .then(() => res.status(200).json({ message: 'delete avec succes' }))
        .catch(error => res.status(400).json({ error }))
};

exports.verifyProducts = async (productsCmmd) => {
    const products = []
    let verified = true;
    for (const element of productsCmmd) {
        const product = await Product.findOne({ _id: element.idProduct });
        if (!product) {
            verified = false
            break;
        }
        else {
            if (element.qte > product.qte || product.status != 1) {
                verified = false
                break
            }
            else {
                product.qte = element.qte
                products.push(product);
            }
        }
    }
    return { verified, productsCmmd: products }
}

exports.listProducts = async (req, res, next) => {
    let id;
    const products = [];
    for (const element of req.body) {
        if (element.idProduct) {
            id=element.idProduct;
        } else {
            id=element._id
        }
        const prd = await Product.findOne({ _id: id });
        if (!prd) {
            return res.status(404)
        } else {
            products.push(prd);
        }
    }
    return res.status(200).json(products);
}


exports.sellProducts = async (products, res) => {
    for (const p of products) {
        const product = await Product.findOne({ _id: p._id });
        if (p.qte == product.qte) {
            Product.updateOne({ _id: p._id }, { qte: 0, status: 0 })
            .then( () => res.status(200).json({message:'updated successfully'}))
            .catch((error) => res.status(400).json({ error }));
        }
        else {
            Product.updateOne({ _id: p._id }, { qte: product.qte - p.qte, _id: p._id })
            .then( () => res.status(200).json({message:'updated successfully'}))
            .catch((error) => res.status(400).json({ error }));
        }
    }
}

exports.cancelSell = async (products) => {
    
    for (const p of products) {
        await Product.updateOne({ _id: p._id }, { $inc: { qte: p.qte }, $set: { status: 1 }})
    }
}