const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Parse cookies
app.use(cookieParser());

// CSRF protection
app.use(csrf({ cookie: true }));

app.get('/', (req, res) => {
  // Pass the CSRF token to your view
  res.send('Hello World! <form action="/submit" method="POST"><input type="hidden" name="_csrf" value="' + req.csrfToken() + '"><input type="submit" value="Submit"></form>');
});

app.post('/submit', (req, res) => {
  res.send('Form submitted successfully!');
});

// Error handler
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403);
  res.send('Form tampered with');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
