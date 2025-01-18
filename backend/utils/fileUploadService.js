const { S3 } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid'); // For generating unique file names

// Configure AWS S3
const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Function to upload file to S3
const uploadFile = async (file) => {
    const fileContent = Buffer.from(file.buffer, 'binary'); // Convert buffer to binary
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
        Key: `${uuidv4()}_${file.originalname}`, // Unique file name
        Body: fileContent,
        ContentType: file.mimetype, // Set the content type
    };

    try {
        const data = await s3.putObject(params); // Use putObject for v3
        return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`; // Return the URL of the uploaded file
    } catch (error) {
        throw new Error(`Error uploading file: ${error.message}`);
    }
};

module.exports = { uploadFile };