const dotenv = require('dotenv');

dotenv.config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "deaivh2un",
    api_key: "965575456667623",
    api_secret: "rComKl0ZFQ6TKdfGiGQyRgrj5Cs",
    secure: true
});

module.exports = {cloudinary};

