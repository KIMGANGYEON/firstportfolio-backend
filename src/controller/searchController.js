import Product from "../models/Product";

export const getUsed = async (req, res, next) => {
  const title = req.body.key;
  try {
    const product = await Product.find({
      title: { $regex: title, $options: "i" },
    });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
