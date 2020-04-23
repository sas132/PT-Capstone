const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authConfig = require("../src/auth_config.json");
const AuthenticationClient = require("auth0").AuthenticationClient;
const auth0 = new AuthenticationClient(authConfig)

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
});

const getUserData = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const userInfo = await auth0.getProfile(token);
    req.userData = {
      auth_id: userInfo.sub,
      name: userInfo.name,
      nickname: userInfo.nickname,
      email: userInfo.email,
      email_verified: userInfo.email_verified,
      picture: userInfo.picture
    };
    next();
  } catch(err) {
    console.warn(err)
    res.status(500).send()
  }
}

module.exports = {
  jwtCheck,
  getUserData
}