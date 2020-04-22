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

const getUserData = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  auth0.getProfile(token, function (err, userInfo) {
    if (err) {
      console.warn(err)
    }

    req.userData = {
      auth_id: userInfo.sub,
      name: userInfo.name,
      nickname: userInfo.nickname,
      email: userInfo.email,
      email_verified: userInfo.email_verified,
      picture: userInfo.picture
    };

    next();
  });
}

module.exports = {
  jwtCheck,
  getUserData
}