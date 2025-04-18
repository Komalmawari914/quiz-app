// src/pages/AddPost.js
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import Header from '../components/Header';

const AddPost = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    const newPost = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const updatedPosts = [...existingPosts, newPost];
    
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    navigate('/', { state: { message: 'Post created successfully!' } });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <BlogForm onSubmit={handleSubmit} isEditing={false} />
      </div>
    </div>
  );
};

export default AddPost;