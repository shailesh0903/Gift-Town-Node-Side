const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Add cookie parser middleware
app.use(cookieParser());
