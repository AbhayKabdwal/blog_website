document.addEventListener('DOMContentLoaded', () => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogLinksContainer = document.getElementById('blog-links');

    blogs.slice(0, 3).forEach(blog => {
        const blogPreview = document.createElement('div');
        blogPreview.className = 'blog-preview';

        const blogTitle = document.createElement('h2');
        blogTitle.textContent = blog.title;
        blogPreview.appendChild(blogTitle);

        const blogContent = document.createElement('p');
        const contentPreview = blog.content.split(' ').slice(0, 20).join(' ') + '...';
        blogContent.textContent = contentPreview;
        blogPreview.appendChild(blogContent);

        const blogLink = document.createElement('a');
        blogLink.href = `blogs/blogs_${blog.id}.html`;
        blogLink.textContent = 'Read more';
        blogPreview.appendChild(blogLink);

        blogLinksContainer.appendChild(blogPreview);
    });

    document.getElementById('login-button').addEventListener('click', () => {
        window.location.href = 'login.html';
    });
});
