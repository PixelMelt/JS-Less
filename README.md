# JS-Less: Hiding Data in Image Descriptions

This project presents a unique method of data transport: storing data within image descriptions and retrieving it.

This can be used as a way to send data in a way that is not easily detected through using the browser devtools.

The only client side dependency is the `piexifjs` library, which could be renamed and made to look like another popular library like `jQuery` to further obfuscate the use of this method.

### Project Structure

This project includes:
- The Node.js server reads a piece of text, divides the string into chunks that would fit within an image's EXIF description, base64 encode the strings, then it inserts each chunk into the ImageDescription tag of an image's EXIF data.
- With a GET request on the `/image` endpoint, the server delivers each individual image, one per each request.
- The client side is a simple HTML page that fetches each image in a sequence. It decodes the data stored in the image's description metadata and appends it to an array until the entire original text file has been reconstructed and can be run through `eval()`.

### Limitations

Embedding data in image EXIF metadata has limitations:

- This method is relatively inefficient in terms of both data storage and transmission times.
- Browser implementations for reading EXIF data are inconsistent, so this method might not work reliably across all browsers or platforms.

### Usage

 The `index.js` contains the Node.js server setup, and `index.html` contains the HTML for client side. To use this project, first ensure that you have Node.js and npm installed. Then follow the steps below:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install dependencies for the server.
4. Run `node index.js` to start the server.
5. Visit `localhost:3000` in your browser to see the client side in action.

As you observe the client, you will see it fetching images from the server and retrieving the Image Descriptions from the images that were originally from a js file.

### Contributions

Contributions to this project are welcome! Please feel free to submit a pull request with your changes. If you encounter any bugs or issues, you can also open an issue on this project's GitHub page. 

### Acknowledgements

The libraries used in this project include: `piexifjs`, `express`, and `fs`.

### License
This project is made available under the MIT License.