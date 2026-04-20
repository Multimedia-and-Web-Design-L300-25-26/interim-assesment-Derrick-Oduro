import User from "../models/User.js";
import {
  attachTokenCookie,
  generateToken,
  getCookieOptions,
} from "../utils/token.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with this email already exists." });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password,
    });

    const token = generateToken(user._id);
    attachTokenCookie(res, token);

    return res.status(201).json({
      message: "Registration successful.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordIsValid = await user.comparePassword(password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user._id);
    attachTokenCookie(res, token);

    return res.json({
      message: "Login successful.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

export const getProfile = async (req, res) => {
  return res.json({ user: sanitizeUser(req.user) });
};

export const logoutUser = async (req, res) => {
  const cookieOptions = getCookieOptions();

  res.clearCookie("token", {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
  });

  return res.json({ message: "Logged out successfully." });
};
