const express = require('express');
let books = require("./booksdb.js");
const { doesExist } = require('./auth_users.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
 
  let { username, password } = req.body;
  if (!doesExist(username)) {
    
    if (isValid(username)) {
      users.push({ username, password });
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      return res.status(400).json({ message: "Invalid username" });
    }
  }
  return res.status(400).json({ message: "User already exists" });

});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  let promise = new Promise((resolve, reject) => {
    if (books && books.length > 0) {
      resolve(books);
    } else {
      reject("No books available");
    }
  });

  promise
    .then((books) => {
      return res.status(200).json({
        message: "Books available",
        data: books
      });
    })
    .catch((error) => {
      return res.status(404).json({
        message: error
      });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const {isbn}=req.params;
  let promise = new Promise((resolve, reject) => {
    const Books = JSON.parse(JSON.stringify(books))
    isbnbook = null;
    for (let key in Books) {
      if (Books[key].isbn === isbn) {
        isbnBook = Books[key];
        break;
      }
    }
    if (isbnBook) {
      resolve(isbnBook);
    } else {
      reject("No books found for this ISBN");
    }
   
  });

  promise
    .then((books) => {
      
      return res.status(200).json({
        message: "Books found",
        data: books
      });
    })
    .catch((error) => {
     
      return res.status(404).json({
        message: error
      });
    });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  
  const {author}=req.params;
  let promise = new Promise((resolve, reject) => {
    const Books = JSON.parse(JSON.stringify(books))
    authorbook = null;
    for (let key in Books) {
      if (Books[key].author === author) {
        authorBook = Books[key];
        break;
      }
    }
    if (authorBook) {
      resolve(authorBook);
    } else {
      reject("No books found for this author");
    }
   
  });

  promise
    .then((books) => {
      
      return res.status(200).json({
        message: "Books found",
        data: books
      });
    })
    .catch((error) => {
     
      return res.status(404).json({
        message: error
      });
    });
  
});


// Get book details based on title
public_users.get('/title/:title', function (req, res) {
  
  const {title}=req.params;
  let promise = new Promise((resolve, reject) => {
    const Books = JSON.parse(JSON.stringify(books))
    titlebook = null;
    for (let key in Books) {
      if (Books[key].title === title) {
        titleBook = Books[key];
        break;
      }
    }
    if (titleBook) {
      resolve(titleBook);
    } else {
      reject("No books found for this title");
    }
   
  });

  promise
    .then((books) => {
      
      return res.status(200).json({
        message: "Books found",
        data: books
      });
    })
    .catch((error) => {
     
      return res.status(404).json({
        message: error
      });
    });
});

// Get all books based on title


module.exports.general = public_users;
