# CS-312 Mini Project 1 – Blog Web Application

This is my mini project for **CS-312**. It’s a simple blog web application built with **Node.js**, **Express.js**, and **EJS**.  

The app lets users create, view, edit, and delete blog posts. Posts are stored in memory only (no database), so they reset when the server restarts. I also added categories so posts can be filtered by topic.

---

## Features
- Create new blog posts with:
  - Author’s name  
  - Title  
  - Content  
  - Category (Tech, Lifestyle, Education)  
  - Automatic creation time  
- View all posts on the homepage  
- Edit posts via a pre-filled form  
- Delete posts (anyone can delete since there are no accounts)  
- Filter posts by category  
- Responsive layout with **Bootstrap** styling  

---

## Technologies Used
- Node.js  
- Express.js  
- EJS (Embedded JavaScript templates)  
- Bootstrap 5  
- Custom CSS  

---

## How to Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/CS-312-MiniProject-1.git
   cd CS-312-MiniProject-1
   
2. Install dependencies:
   ```bash
   npm install

3. Start the server:
   ```bash
   node server.js

4. Open the app in browser
   ```bash
   http://localhost:3000
