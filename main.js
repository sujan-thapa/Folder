// const fs = require('fs');
const fs = require('fs').promises;
const path = require('path');

// Read the file names from the current directory
let files = fs.readdir('./');

// Loop through each file in the current directory
files.forEach(file => {
    // Get the file extension
    let ext = path.extname(file);

    // Remove the dot from the extension (e.g., '.js' -> 'js')
    let folderName = ext.substring(1);

    if (folderName === '') {
        // Skip files without an extension
        return;
    }

    // Check if the folder already exists synchronously (blocking)
    if (fs.existsSync(folderName)) {
        // console.log(`Folder already exists: ${folderName}`);
        return; // Exit the

    } else {

        if (folderName === 'js') {
            // Skip the 'js' folder
            return; // Exit the loop for this file and continue with the next file
            
        }else{
            // recursive: true creates parent directories if they don't exist
            fs.mkdir(folderName, { recursive: true }, (err) => { 
                if (err) {
                    console.log('Error creating folder:', err);
                } else {
                    console.log(`Folder created: ${folderName}`);
                    moveFile("folderName", "file");

                }
            });
        }
    }
});

async function moveFile(folderName, file) {

    const sourceFolder = path.join(__dirname, './');
    const destinationFolder = path.join(__dirname, 'folderName');
    const fileName = 'file.txt';

    const sourcePath = path.join("./", file);
    const destinationPath = path.join(folderName, file);

    try {
        // Ensure the destination folder exists
        await fs.mkdir(folderName, { recursive: true });

        // Copy the file to the destination folder asynchronously (non-blocking)
        await fs.copyFile(sourcePath, destinationPath);
        console.log('File copied successfully!');

        // Delete the original file asynchronously (non-blocking)
        await fs.unlink(sourcePath);
        console.log('Original file deleted successfully!');
    } catch (err) {
        console.log('Error moving file:', err);
    }
}


