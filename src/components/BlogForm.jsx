// src/components/BlogForm.js
import { useState } from 'react';

const BlogForm = ({ initialData, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState(
    initialData || { title: '', content: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container animate-fade">
      <h2 className="form-title">
        {isEditing ? 'Edit Blog Post' : 'Create New Post'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="form-label">Header Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
          />
          {formData.image && (
            <div style={{ marginTop: '1rem' }}>
              <img 
                src={formData.image} 
                alt="Preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px', 
                  borderRadius: '4px' 
                }} 
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-textarea"
            required
            placeholder="Write your post content here..."
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          {isEditing ? 'Update Post' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;