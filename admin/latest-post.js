document.addEventListener('DOMContentLoaded', () => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const latestPostsContainer = document.getElementById('latest-posts');

    blogs.slice(0, 3).forEach(blog => {
        const blogLink = document.createElement('a');
        blogLink.href = `../blogs/blogs_${blog.id}.html`;
        blogLink.textContent = blog.title;
        latestPostsContainer.appendChild(blogLink);
        latestPostsContainer.appendChild(document.createElement('br'));
    });
});
