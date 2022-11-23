const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api', (req, res) => {
    res.json({ "users": ["user1", "user2"] })
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);