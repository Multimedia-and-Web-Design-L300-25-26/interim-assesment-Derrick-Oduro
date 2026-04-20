import Crypto from "../models/Crypto.js";
import { createSlug } from "../utils/slugify.js";

export const getAllCryptos = async (req, res, next) => {
  try {
    const cryptos = await Crypto.find().sort({ marketCap: -1, name: 1 });
    return res.json({ cryptos });
  } catch (error) {
    return next(error);
  }
};

export const getTopGainers = async (req, res, next) => {
  try {
    const cryptos = await Crypto.find()
      .sort({ change24h: -1, name: 1 })
      .limit(10);
    return res.json({ cryptos });
  } catch (error) {
    return next(error);
  }
};

export const getNewCryptos = async (req, res, next) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    return res.json({ cryptos });
  } catch (error) {
    return next(error);
  }
};

export const getCryptoBySlug = async (req, res, next) => {
  try {
    const slug = String(req.params.slug).toLowerCase();
    const crypto = await Crypto.findOne({ slug });

    if (!crypto) {
      return res.status(404).json({ message: "Cryptocurrency not found." });
    }

    return res.json({ crypto });
  } catch (error) {
    return next(error);
  }
};

export const createCrypto = async (req, res, next) => {
  try {
    const {
      name,
      symbol,
      price,
      image,
      change24h,
      description,
      marketCap,
      volume,
      color,
    } = req.body;

    if (
      !name ||
      !symbol ||
      price === undefined ||
      !image ||
      change24h === undefined
    ) {
      return res.status(400).json({
        message: "Name, symbol, price, image, and change24h are required.",
      });
    }

    const parsedPrice = Number(price);
    const parsedChange24h = Number(change24h);
    const parsedMarketCap = marketCap === undefined ? 0 : Number(marketCap);
    const parsedVolume = volume === undefined ? 0 : Number(volume);

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a valid non-negative number." });
    }

    if (!Number.isFinite(parsedChange24h)) {
      return res
        .status(400)
        .json({ message: "change24h must be a valid number." });
    }

    if (!Number.isFinite(parsedMarketCap) || parsedMarketCap < 0) {
      return res
        .status(400)
        .json({ message: "marketCap must be a valid non-negative number." });
    }

    if (!Number.isFinite(parsedVolume) || parsedVolume < 0) {
      return res
        .status(400)
        .json({ message: "volume must be a valid non-negative number." });
    }

    const normalizedName = String(name).trim();
    const normalizedSymbol = String(symbol).trim().toUpperCase();
    const slug = createSlug(normalizedName);

    if (!slug) {
      return res
        .status(400)
        .json({ message: "Name produced an invalid slug." });
    }

    const existingCrypto = await Crypto.findOne({
      $or: [{ slug }, { symbol: normalizedSymbol }],
    });

    if (existingCrypto) {
      return res.status(409).json({
        message: "A cryptocurrency with this name or symbol already exists.",
      });
    }

    const crypto = await Crypto.create({
      slug,
      name: normalizedName,
      symbol: normalizedSymbol,
      price: parsedPrice,
      image: String(image).trim(),
      change24h: parsedChange24h,
      description: description ? String(description).trim() : undefined,
      marketCap: parsedMarketCap,
      volume: parsedVolume,
      color: color ? String(color).trim() : undefined,
    });

    return res.status(201).json({
      message: "Cryptocurrency created successfully.",
      crypto,
    });
  } catch (error) {
    return next(error);
  }
};
