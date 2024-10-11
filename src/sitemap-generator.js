const fs = require('fs');
const path = require('path');

// Define your static routes
const routes = [
    { path: '/', changefreq: 'monthly' }, // Main Page
    { path: '/valorant', changefreq: 'weekly' }, // Valorant Guides Page
    { path: '/recent-articles', changefreq: 'monthly' }, // Recent Articles Page
    // Add other paths as needed
];

const generateSitemap = () => {
    const baseUrl = 'https://occisors-den.onrender.com'; // Replace with your actual base URL

    // Generate XML for each route
    const urls = routes.map(route => `
        <url>
            <loc>${baseUrl}${route.path}</loc>
            <changefreq>${route.changefreq}</changefreq>
        </url>
    `).join('');

    // Create the final sitemap
    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
    </urlset>
    `;

    // Write the sitemap to the public folder
    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap.trim());
    console.log('Sitemap generated successfully!');
};

// Call the function to generate the sitemap
generateSitemap();
