const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const mapCrypto = (crypto) => {
  if (!crypto) {
    return null;
  }

  return {
    ...crypto,
    id: crypto.slug || crypto.id || crypto._id,
    change: toNumber(crypto.change ?? crypto.change24h, 0),
    marketCap: toNumber(crypto.marketCap, 0),
    volume: toNumber(crypto.volume, 0),
    color: crypto.color || "bg-blue-500",
    description: crypto.description || "No description available.",
  };
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const payload = isJson ? await response.json() : {};

  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload;
};

export const authApi = {
  register: ({ name, email, password }) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  login: ({ email, password }) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),

  getProfile: () => request("/auth/profile"),
};

export const cryptoApi = {
  getAll: async () => {
    const data = await request("/crypto");
    return {
      ...data,
      cryptos: (data.cryptos || []).map(mapCrypto),
    };
  },

  getGainers: async () => {
    const data = await request("/crypto/gainers");
    return {
      ...data,
      cryptos: (data.cryptos || []).map(mapCrypto),
    };
  },

  getNewListings: async () => {
    const data = await request("/crypto/new");
    return {
      ...data,
      cryptos: (data.cryptos || []).map(mapCrypto),
    };
  },

  getById: async (id) => {
    const data = await request(`/crypto/${id}`);
    return {
      ...data,
      crypto: mapCrypto(data.crypto),
    };
  },

  create: async (payload) => {
    const data = await request("/crypto", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return {
      ...data,
      crypto: mapCrypto(data.crypto),
    };
  },
};
