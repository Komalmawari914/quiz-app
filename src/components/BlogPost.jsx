// src/components/BlogPost.js
import { Link } from 'react-router-dom';

const BlogPost = ({ post, onDelete }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const sampleImages = [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  ];

  // Select image based on post ID or use default
  const postImage = post.image || sampleImages[post.id.charCodeAt(0) % sampleImages.length];
  // Generate a unique gradient based on post ID
  

  return (
    <article className="blog-post animate-fade">
      <div 
        className="post-image"
        style={{ 
          backgroundImage: `url(${postImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">
          {post.content.length > 100 
            ? `${post.content.substring(0, 100)}...` 
            : post.content}
        </p>
        <p className="post-date">Posted on {formattedDate}</p>
        <div className="post-actions">
          <Link to={`/edit/${post.id}`} className="btn btn-edit">
            Edit
          </Link>
          <button 
            onClick={() => onDelete(post.id)} 
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;