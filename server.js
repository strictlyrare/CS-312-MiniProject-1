const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory "database"
let posts = []; // { id, author, title, content, category, createdAt }

// Middleware
app.use(express.urlencoded({ extended: true })); // form data
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helpers
function makeId() {
  return Math.random().toString(36).slice(2, 10);
}
function formatDate(d) {
  return new Date(d).toLocaleString();
}

// Routes

// Home (list + create form + category filter)
app.get('/', (req, res) => {
  const { category } = req.query;
  const categories = ['Tech', 'Lifestyle', 'Education'];
  const visiblePosts = category && category !== 'All'
    ? posts.filter(p => p.category === category)
    : posts;

  res.render('index', {
    posts: visiblePosts,
    categories,
    selectedCategory: category || 'All',
    formatDate
  });
});

// Create post
app.post('/posts', (req, res) => {
  const { author, title, content, category } = req.body;
  if (!author || !title || !content) {
    return res.redirect('/');
  }
  posts.unshift({
    id: makeId(),
    author,
    title,
    content,
    category: category || 'Uncategorized',
    createdAt: new Date().toISOString()
  });
  res.redirect('/');
});

// Show edit form
app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send('Post not found.');
  const categories = ['Tech', 'Lifestyle', 'Education'];
  res.render('edit', { post, categories });
});

// Submit edit
app.post('/posts/:id/edit', (req, res) => {
  const { author, title, content, category } = req.body;
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).send('Post not found.');
  posts[idx] = {
    ...posts[idx],
    author: author || posts[idx].author,
    title: title || posts[idx].title,
    content: content || posts[idx].content,
    category: category || posts[idx].category
  };
  res.redirect('/');
});

// Delete
app.post('/posts/:id/delete', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect('/');
});

// 404 fallback (optional)
app.use((req, res) => res.status(404).send('Page not found.'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
