const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;

    if (!username || !pass) {
        return res.status(400).json({ message: 'Username or password not provided' });
    }

    const existingUser = users.find((u) => u.username === username && u.password === password)
    if (!!existingUser) {
        return res.status(401).json({ message: 'User already exists' });
    }

    const newUser = { username: username, password: pass };
    users.push(newUser);
    return res.status(300).json({ message: 'User added succesfully', user: newUser });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    const booksPromise = new Promise((resole, reject) => {
        setTimeout(() => {
            resole(books)
        }, 3000)
    });

    booksPromise.then(books => res.status(300).json(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const _isbn = req.params.isbn;
    const singleBookPromise = new Promise((resole, reject) => {
        setTimeout(() => {
            resole(books[_isbn])
        }, 3000)
    });

    singleBookPromise.then(singleBook => res.status(300).json(singleBook))
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const _author = Object.values(books).find(b => b.author === author);
    const authorPromise = new Promise((resole, reject) => {
        setTimeout(() => {
            resole(_author)
        }, 3000)
    });

    authorPromise.then(a => res.status(300).json(a))
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const _title = Object.values(books).find(b => b.title === title);

    const titlePromise = new Promise((resole, reject) => {
        setTimeout(() => {
            resole(_title)
        }, 3000)
    });

    titlePromise.then(t => res.status(300).json(t))
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const _isbn = req.params.isbn;
    const singleBook = books[_isbn];
    const review = singleBook?.reviews;
    return res.status(300).json(review);
});

module.exports.general = public_users;
