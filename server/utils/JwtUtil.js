// CLI: npm install jsonwebtoken --save
const jwt = require("jsonwebtoken");
const MyConstants = require("./MyConstants");

const JwtUtil = {
  genToken(username, password) {
    const token = jwt.sign(
      {
        username: username,
        password: password,
      },
      MyConstants.JWT_SECRET,
      {
        expiresIn: MyConstants.JWT_EXPIRES,
      },
    );
    return token;
  },
  checkToken(req, res, next) {
    try {
      let tokenRaw =
        req.headers["x-access-token"] || req.headers["authorization"];
      if (!tokenRaw) {
        return res
          .status(401)
          .json({ success: false, message: "Auth token is not supplied" });
      }

      // Support header value like: "Bearer <token>"
      if (
        typeof tokenRaw === "string" &&
        tokenRaw.toLowerCase().startsWith("bearer ")
      ) {
        tokenRaw = tokenRaw.slice(7).trim();
      }

      const token = tokenRaw;
      jwt.verify(token, MyConstants.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Token is not valid" });
        }

        req.decoded = decoded;
        next();
      });
    } catch (e) {
      console.error("checkToken error", e);
      return res
        .status(500)
        .json({ success: false, message: "Server error while checking token" });
    }
  },
};

module.exports = JwtUtil;
