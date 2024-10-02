const fs = require('fs');
const path = require('path');

// Define your static routes
const routes = [
    { path: '/', changefreq: 'monthly' },
    // Add other paths as needed
];

const generateSitemap = () => {
    const baseUrl = 'https://occissorr.github.io'; // Replace with your GitHub Pages URL

    const urls = routes.map(route => `
        <url>
            <loc>${baseUrl}${route.path}</loc>
            <changefreq>${route.changefreq}</changefreq>
        </url>
    `).join('');

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
        ${urls}
    </urlset>
    `;

    // Write the sitemap to the public folder
    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap.trim());
    console.log('Sitemap generated!');
};

generateSitemap();