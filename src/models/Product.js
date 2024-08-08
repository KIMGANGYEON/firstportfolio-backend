import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.Object,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: String,
  discount: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
  category: {
    type: Number,
    default: 1,
  },
  views: {
    type: Number,
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
