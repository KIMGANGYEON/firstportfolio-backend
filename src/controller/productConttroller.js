import Product from "../models/Product";
import multer from "multer";

export const postUpload = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

export const postImage = async (req, res, next) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        return req.status(500).send(err);
      }
      return res.json({ fileName: res.req.file.filename });
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const products = await Product.find().populate("writer");
    return res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

export const postUsedProduct = async (req, res, next) => {
  const { id } = req.body;
  try {
    const product = await Product.findOne({ _id: id });
    return res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};
