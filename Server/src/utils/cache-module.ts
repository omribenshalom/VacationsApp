// const dataMap = new Map() ;

// const get = (key) => {
//   return dataMap.get(key) ;
// };

// const set = (key, value) => {
//   dataMap.set(key, value) ;
//   return;
// };

// function clearCache(){
//   dataMap.clear();
// };

// function extractUserDataFromCache(req) {
//   let authorizationString = req.headers["authorization"] ;
//   let token = authorizationString.substring("Bearer ".length) ;
//   console.log("token - ", token);

//   let userData = dataMap.get(token) ;
//   // console.log("userData - ", userData);
  

//   return userData;
// };

// export default {
//   set,
//   get,
//   clearCache,
//   extractUserDataFromCache
// };
