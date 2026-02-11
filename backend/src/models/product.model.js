const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    category: {
      type: String,
      required: true,
      enum: ['epabx', 'phones', 'surveillance', 'ip speakers'],
    },

    specifications: [
      {
        title: {
          type: String,
          trim: true,
        },
        info: {
          type: String,
          trim: true,
        }
      }
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;