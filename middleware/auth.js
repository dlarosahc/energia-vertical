const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userExtractor = async (request, response, next) => {
    try {
      const token = request.cookies?.accessToken;

      if (!token) {
        return response.sendStatus(401);
      }
      
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.id).populate('payments').populate({
        path: 'class.schedule',
       
      });
      console.log(user);
      request.user = user;
    } catch {
      return response.sendStatus(401);
    }
    next();
  };
  
  module.exports = { userExtractor };