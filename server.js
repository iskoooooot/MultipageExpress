const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for different pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Serve blog page dynamically
app.get('/blog', (req, res) => {
    const postsPath = path.join(__dirname, 'data', 'posts.json');
    fs.readFile(postsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading blog posts');
            return;
        }
        const posts = JSON.parse(data);
        res.render('blog', { posts });
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

