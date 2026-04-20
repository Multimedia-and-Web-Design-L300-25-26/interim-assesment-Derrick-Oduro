import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    change24h: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "No description available.",
    },
    marketCap: {
      type: Number,
      default: 0,
      min: 0,
    },
    volume: {
      type: Number,
      default: 0,
      min: 0,
    },
    color: {
      type: String,
      default: "bg-blue-500",
    },
  },
  {
    timestamps: true,
  },
);

const Crypto = mongoose.model("Crypto", cryptoSchema);

export default Crypto;
