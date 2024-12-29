const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean

  let valid = false;
  let pattern = /^[a-zA-Z0-9_]+$/;
  if (username.match(pattern)) {
    valid = true;
  }
  return valid;
}

const authenticatedUser = (username, password) => { //returns boolean

  let user = users.find(user => user.username == username);

  if (user && user.password == password) {
    return true;

  
  } else {
    return false;
  }
}


 const doesExist = (username) => { //returns boolean

  userisFound = false;

  let foundedUser = users.find(user => user.username == username);
  if(foundedUser){
    userisFound = true;
  }
  return userisFound;

}


//only registered users can login
regd_users.post("/login", (req,res) => {
 
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.doesExist = doesExist;
module.exports.authenticatedUser = authenticatedUser;
