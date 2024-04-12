import multer from 'multer'; 

// Configure storage settings for Multer
const storageConfig = multer.diskStorage({
  // Set the destination directory where uploaded files will be stored
  destination: (req, file, cb) => {
    cb(null, './public/images/'); // The images will be stored in './public/images/' directory
  },
  // Set the filename for uploaded files
  filename: (req, file, cb) => {
    // Generate a unique filename based on the current timestamp and the original filename
    const uniqueFileName = Date.now() + '-' + file.originalname;
    cb(null, uniqueFileName); // Pass the unique filename to Multer
  },
});

// Create an instance of Multer with the configured storage settings
export const uploadFile = multer({ storage: storageConfig });
