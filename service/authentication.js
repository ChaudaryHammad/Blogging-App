const JWT = require('jsonwebtoken');

const secret = "$uperMan@113"

function createTokenForUser(user){
    const payload = {
        _id:user._id,
        emil:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role
    };

    const token = JWT.sign(payload,secret,{expiresIn:'1d'});

    return token 
}


function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}


module.exports = {createTokenForUser,validateToken}