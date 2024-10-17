const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputFilePath = path.join(__dirname, 'index.html');

fs.readdir(imagesDir, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image Slideshow</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f0f0;
            }
            .slideshow {
                position: relative;
                width: 80%;
                max-width: 800px;
                height: 60%;
                overflow: hidden;
            }
            .slide {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0;
                transition: opacity 1s;
            }
            .active {
                opacity: 1;
            }
        </style>
    </head>
    <body>

    <div class="slideshow" id="slideshow"></div>

    <script>
        const slideshow = document.getElementById('slideshow');
        const images = ${JSON.stringify(imageFiles.map(file => `/images/${file}`))};

        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.className = 'slide' + (index === 0 ? ' active' : '');
            img.src = image;
            img.alt = 'Image ' + (index + 1);
            slideshow.appendChild(img);
        });

        let currentIndex = 0;
        const slides = document.querySelectorAll('.slide');

        function showSlide(index) {
            slides[currentIndex].classList.remove('active');
            currentIndex = (index + slides.length) % slides.length;
            slides[currentIndex].classList.add('active');
        }

        setInterval(() => {
            showSlide(currentIndex + 1);
        }, 2000); // Change slide every 2 seconds
    </script>

    </body>
    </html>
    `;

    fs.writeFileSync(outputFilePath, htmlContent, 'utf8');
    console.log('index.html generated successfully!');
});
