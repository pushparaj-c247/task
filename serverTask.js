"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var node_fs_1 = require("node:fs");
var node_fs_2 = require("node:fs");
var fs = require("fs");
var stream_1 = require("stream");
//  server created and read the file with get and write the file with post
var server = http
    .createServer(function (req, res) {
    if (req.method === "GET") {
        (0, node_fs_1.readFile)("data.txt", function (err, data) {
            if (err)
                throw err;
            res.end(data);
        });
    }
    else if (req.method === "POST") {
        var content = "some content";
        (0, node_fs_2.writeFile)("text.txt", content, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
})
    .listen(4000, function () {
    console.log("Server running On port 4000");
});
// add one large file and read with stream
var stream = fs.createReadStream("data.txt");
stream.on("data", function (data) {
    var chunk = data.toString();
    // console.log(chunk);
});
// Read one large file using stream, manipulate data and store in new file using write stream and perform same action using Duplex stream also
var largeStream = fs.createReadStream("large.txt");
largeStream.on("large", function (large) {
    var chunk1 = large.tostring();
});
// now manuplating the data
function manipulateData(chunk2) {
    return chunk2.toString().toUpperCase();
}
var inputFilePath = "data.txt";
var outputFilePath = "newData.txt";
var readStream = fs.createReadStream(inputFilePath);
var writeStream = fs.createWriteStream(outputFilePath);
readStream.on("data", function (chunk2) {
    var manipulatedChunk = manipulateData(chunk2);
    writeStream.write(manipulatedChunk);
});
// Using Duplex stream
var duplexStream = new stream_1.Duplex({
    read: function () { },
    write: function (chunk, encoding, callback) {
        var manipulatedChunk = manipulateData(chunk);
        this.push(manipulatedChunk);
        callback();
    },
});
var createFilePath = "read.txt";
var newFilePath = "write.txt";
var writeStreamDuplex = fs.createWriteStream(newFilePath);
duplexStream.pipe(writeStreamDuplex);
fs.createReadStream(createFilePath).pipe(duplexStream);
