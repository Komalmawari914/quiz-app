// src/pages/EditPost.js
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlogForm from '../components/BlogForm';
import Header from '../components/Header';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const postToEdit = savedPosts.find(post => post.id === id);
    
    if (postToEdit) {
      setPost(postToEdit);
    } else {
      navigate('/');
    }
    setIsLoading(false);
  }, [id, navigate]);

  const handleSubmit = (updatedData) => {
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const updatedPosts = savedPosts.map(p => 
      p.id === id ? { ...p, ...updatedData, date: new Date().toISOString() } : p
    );
    
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    navigate('/', { state: { message: 'Post updated successfully!' } });
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        {post && <BlogForm initialData={post} onSubmit={handleSubmit} isEditing={true} />}
      </div>
    </div>
  );
};

export default EditPost;