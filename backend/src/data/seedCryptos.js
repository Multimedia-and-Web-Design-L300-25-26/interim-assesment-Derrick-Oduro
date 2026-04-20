import Crypto from "../models/Crypto.js";

const defaultCryptos = [
  {
    slug: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 43250.5,
    image: "https://cryptoicons.org/api/icon/btc/200",
    change24h: 2.34,
    marketCap: 845000000000,
    volume: 28000000000,
    color: "bg-orange-500",
    description:
      "Bitcoin is a decentralized digital currency that can be transferred on a peer-to-peer network.",
  },
  {
    slug: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2890.75,
    image: "https://cryptoicons.org/api/icon/eth/200",
    change24h: 3.12,
    marketCap: 347000000000,
    volume: 15000000000,
    color: "bg-purple-500",
    description:
      "Ethereum is a decentralized platform that runs smart contracts and decentralized applications.",
  },
  {
    slug: "tether",
    name: "Tether",
    symbol: "USDT",
    price: 1,
    image: "https://cryptoicons.org/api/icon/usdt/200",
    change24h: 0.01,
    marketCap: 95000000000,
    volume: 45000000000,
    color: "bg-green-500",
    description: "Tether is a stablecoin pegged to the US dollar.",
  },
  {
    slug: "binance-coin",
    name: "BNB",
    symbol: "BNB",
    price: 315.8,
    image: "https://cryptoicons.org/api/icon/bnb/200",
    change24h: -1.45,
    marketCap: 48000000000,
    volume: 1200000000,
    color: "bg-yellow-500",
    description:
      "BNB is the cryptocurrency coin that powers the BNB Chain ecosystem.",
  },
  {
    slug: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 98.25,
    image: "https://cryptoicons.org/api/icon/sol/200",
    change24h: 5.67,
    marketCap: 42000000000,
    volume: 2100000000,
    color: "bg-indigo-500",
    description:
      "Solana is a high-performance blockchain platform for crypto apps.",
  },
  {
    slug: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    image: "https://cryptoicons.org/api/icon/ada/200",
    change24h: 1.23,
    marketCap: 20000000000,
    volume: 450000000,
    color: "bg-blue-500",
    description:
      "Cardano is a blockchain platform for changemakers and innovators.",
  },
  {
    slug: "ripple",
    name: "XRP",
    symbol: "XRP",
    price: 0.52,
    image: "https://cryptoicons.org/api/icon/xrp/200",
    change24h: -2.15,
    marketCap: 28000000000,
    volume: 1100000000,
    color: "bg-gray-600",
    description:
      "XRP is a digital asset for fast and low-cost global payments.",
  },
  {
    slug: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.085,
    image: "https://cryptoicons.org/api/icon/doge/200",
    change24h: 4.32,
    marketCap: 12000000000,
    volume: 680000000,
    color: "bg-yellow-600",
    description:
      "Dogecoin is a community-driven cryptocurrency originally created for fun.",
  },
];

export const seedCryptos = async () => {
  const existingCount = await Crypto.countDocuments();

  if (existingCount > 0) {
    return;
  }

  await Crypto.insertMany(defaultCryptos);
  console.log("Seeded default cryptocurrencies");
};
