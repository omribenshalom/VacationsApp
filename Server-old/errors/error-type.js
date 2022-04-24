let ErrorType = {
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "A problem accured. gerenal error.", isShowStackTrace: true},
    USER_NAME_ALREADY_EXIST : {id: 2, httpCode: 601, message : "User name already exists.", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 602, message : "Login failed, invalid user name or password.", isShowStackTrace: false}
};

module.exports = ErrorType;