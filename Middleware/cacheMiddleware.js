// middleware/cache.js

const cacheMiddleware = async (req, res, next) => {
  console.log(req.user);
  const userId = req.user._id;
  try {
    const cachedData = await req.redisClient.get(`user:${userId}:products`);
    if (cachedData) {
      console.log("✅ Données servies depuis Redis");
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (err) {
    console.error("Redis error:", err);
    next(); // Continue quand même même en cas d’erreur Redis
  }
};

module.exports = cacheMiddleware;
