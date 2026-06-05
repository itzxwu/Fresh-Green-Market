const Product = require('../models/Product');

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts =
async(req,res)=>{
    try{
        const products =
        await Product.find();

        res.json(products);
    }
    catch(error){
        res.status(500)
        .json(error);
    }
};

exports.addProduct =
async(req,res)=>{
    try{
        const product =
        await Product.create(req.body);

        res.json(product);
    }
    catch(error){
        res.status(500)
        .json(error);
    }
};

exports.getSingleProduct =
async(req,res)=>{

try{

const product =
await Product.findById(
req.params.id
);

res.json(product);

}
catch(error){

res.status(500)
.json(error);

}

};