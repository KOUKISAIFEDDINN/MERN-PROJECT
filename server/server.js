const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser');


app.use(express.json({ limit: '500mb' }), express.urlencoded({ extended: true, limit: '500mb' }));
// Use cors middleware with specific options
app.use(cors({ origin: 'http://localhost:5173', credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE'] }), cookieParser());

// app.use(cookieParser());
// app.use(express.static('public'));
require('dotenv').config()
const PORT = process.env.PORT

require('../server/config/mongoose.config')
require('../server/routes/product.routes')(app);
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);


app.listen(PORT, () => console.log(`Listenning on port ${PORT} for requests ✈️`));



// const express = require('express');
// const cors = require('cors');
// const app = express();
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken'); // Import jwt

// app.use(express.json({ limit: '500mb' }), express.urlencoded({ extended: true, limit: '500mb' }));
// app.use(cookieParser());

// // CORS middleware with specific options
// app.use(cors({
//     origin: 'http://localhost:5173', // Whitelist your client's origin
//     credentials: true, // Enable credentials
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allow specified HTTP methods
// }));

// require('dotenv').config();
// const PORT = process.env.PORT;

// require('../server/config/mongoose.config');
// require('../server/routes/product.routes')(app);
// require('./routes/user.routes')(app);
// require('./routes/post.routes')(app);

// // Add middleware to verify JWT token
// const JWT_SECRET = process.env.JWT_SECRET;

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//         }
//         req.user = decoded; // Attach decoded user information to request object
//         next();
//     });
// };

// // Protected route example
// app.get('/protected', verifyToken, (req, res) => {
//     res.json({ message: 'Access granted', user: req.user });
// });

// app.listen(PORT, () => console.log(`Listening on port ${PORT} for requests ✈️`));







// const express = require('express')
// const cors = require('cors')
// const app = express()
// const cookieParser = require('cookie-parser');
// const JWT_SECRET = "myjwt";



// app.use(express.json({ limit: '500mb' }), express.urlencoded({ extended: true, limit: '500mb' }));
// // Use cors middleware with specific options
// app.use(cors({ origin: 'http://localhost:5173', credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE'] }), cookieParser());

// // app.use(cookieParser());
// // app.use(express.static('public'));
// require('dotenv').config()
// const PORT = process.env.PORT

// require('../server/config/mongoose.config')
// require('../server/routes/product.routes')(app);
// require('./routes/user.routes')(app);
// require('./routes/post.routes')(app);
// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//         }
//         req.user = decoded; // Attach decoded user information to request object
//         next();
//     });
// };
// app.get('/protected', verifyToken, (req, res) => {
//     res.json({ message: 'Access granted', user: req.user });
// });


// app.listen(PORT, () => console.log(`Listenning on port ${PORT} for requests ✈️`));
