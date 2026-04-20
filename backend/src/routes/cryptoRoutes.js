import { Router } from "express";
import {
  createCrypto,
  getAllCryptos,
  getCryptoBySlug,
  getNewCryptos,
  getTopGainers,
} from "../controllers/cryptoController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllCryptos);
router.get("/gainers", getTopGainers);
router.get("/new", getNewCryptos);
router.get("/:slug", getCryptoBySlug);
router.post("/", requireAuth, createCrypto);

export default router;
