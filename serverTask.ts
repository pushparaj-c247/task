import * as http from "http";
import { readFile } from "node:fs";
import { writeFile } from "node:fs";
import * as fs from "fs";
import { Duplex } from 'stream';



//  server created and read the file with get and write the file with post

const server = http
  .createServer((req, res) => {
    if (req.method === "GET") {
      readFile("data.txt", (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    } else if (req.method === "POST") {
      const content = "some content";
      writeFile("text.txt", content, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  })
  .listen(4000, () => {
    console.log("Server running On port 4000");
  });

// add one large file and read with stream

let stream = fs.createReadStream("data.txt");
stream.on("data", function (data) {
  let chunk = data.toString();
  // console.log(chunk);
});

// Read one large file using stream, manipulate data and store in new file using write stream and perform same action using Duplex stream also

let largeStream = fs.createReadStream("large.txt");
largeStream.on("large", function (large) {
  let chunk1 = large.tostring();
});
// now manuplating the data

function manipulateData(chunk2: String): String {
  return chunk2.toString().toUpperCase();
}

const inputFilePath = "data.txt";
const outputFilePath = "newData.txt";

const readStream = fs.createReadStream(inputFilePath);
const writeStream = fs.createWriteStream(outputFilePath);

readStream.on("data", (chunk2: String) => {
  const manipulatedChunk = manipulateData(chunk2);
  writeStream.write(manipulatedChunk);
});

// Using Duplex stream
const duplexStream = new Duplex({
  read() {},
  write(chunk2, encoding, callback) {
    const manipulatedChunk = manipulateData(chunk2);
    this.push(manipulatedChunk);
    callback();
  },
});

const writeStreamDuplex = fs.createWriteStream(outputFilePath);

duplexStream.pipe(writeStreamDuplex);

fs.createReadStream(inputFilePath).pipe(duplexStream);
