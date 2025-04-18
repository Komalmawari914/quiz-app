// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import Header from '../components/Header';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
      setPosts(savedPosts);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };
  // In src/pages/Home.jsx - update the samplePosts array
const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces. Learn the basics of components, props, and state.',
    date: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '2',
    title: 'Understanding React Hooks',
    content: 'Hooks allow you to use state and other React features without writing classes. The most common hooks are useState and useEffect.',
    date: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
  },
  // Add images to other sample posts...
];

  return (
    <div>
      <Header />
      <div className="container">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3 className="empty-text">No blog posts yet</h3>
            <Link to="/add" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Create Your First Post
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1>Latest Posts</h1>
              <Link to="/add" className="btn btn-primary">
                + New Post
              </Link>
            </div>
            <BlogList posts={posts} onDelete={handleDelete} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;