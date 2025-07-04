document.addEventListener('DOMContentLoaded', () => {
    loadBlogOptions();
});

function uploadBlogPost() {
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const imageInput = document.getElementById('blog-image').files[0];

    if (!title || !content) {
        alert('Title and content are required.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        const image = reader.result; // Base64 encoded image

        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const newBlog = {
            id: Date.now(),
            title,
            content,
            image,
        };

        blogs.unshift(newBlog);
        localStorage.setItem('blogs', JSON.stringify(blogs));

        createBlogFile(newBlog);
        alert('Blog post uploaded successfully.');
        loadBlogOptions();
    };

    if (imageInput) {
        reader.readAsDataURL(imageInput);
    } else {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const newBlog = {
            id: Date.now(),
            title,
            content,
            image: null,
        };

        blogs.unshift(newBlog);
        localStorage.setItem('blogs', JSON.stringify(blogs));

        createBlogFile(newBlog);
        alert('Blog post uploaded successfully.');
        loadBlogOptions();
    }
}

function removeBlogPost() {
    const select = document.getElementById('blog-select');
    const blogId = select.value;

    if (!blogId) {
        alert('Please select a blog post to remove.');
        return;
    }

    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs = blogs.filter(blog => blog.id != blogId);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    alert('Blog post removed successfully.');
    loadBlogOptions();
}

function loadBlogOptions() {
    const select = document.getElementById('blog-select');
    select.innerHTML = '';

    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.forEach(blog => {
        const option = document.createElement('option');
        option.value = blog.id;
        option.textContent = blog.title;
        select.appendChild(option);
    });

    if (blogs.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No blog posts available';
        select.appendChild(option);
    }
}

function createBlogFile(blog) {
    const blogContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${blog.title}</title>
            <link rel="stylesheet" href="../blog.css">
        </head>
        <body>
            <header class="blog-header">
                <div class="header-content">
                    <h1>${blog.title}</h1>
                    <a href="../index.html" class="back-link">Back to Blog</a>
                </div>
            </header>
            <main class="blog-content">
                <article class="blog-article">
                    ${blog.image ? `<img src="${blog.image}" alt="${blog.title}" class="blog-image">` : ''}
                    <div class="blog-body">
                        <p>${blog.content}</p>
                    </div>
                </article>
            </main>
        </body>
        </html>
    `;

    const blob = new Blob([blogContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `blogs_${blog.id}.html`;
    link.click();

    // Save image file if available
    if (blog.image) {
        const imageBlob = dataURLtoBlob(blog.image);
        const imageLink = document.createElement('a');
        imageLink.href = URL.createObjectURL(imageBlob);
        imageLink.download = `images/blog_${blog.id}.png`;
        imageLink.click();
    }
}

function dataURLtoBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const buffer = new ArrayBuffer(byteString.length);
    const data = new DataView(buffer);

    for (let i = 0; i < byteString.length; i++) {
        data.setUint8(i, byteString.charCodeAt(i));
    }

    return new Blob([buffer], { type: mimeString });
}