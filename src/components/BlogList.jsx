// src/components/BlogList.js
import BlogPost from './BlogPost';

const BlogList = ({ posts, onDelete, onEdit }) => {
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogPost
          key={post.id}
          post={post}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default BlogList;