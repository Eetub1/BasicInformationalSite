const http = require("http")
const path = require("path")
const fs = require("fs")

const server = http.createServer((req, res) => {
    let resource = ""
    switch (req.url) {
        case '/about':
            resource = "about.html"
            break
        case '/contact-me':
            resource = 'contact-me.html'
            break
        case '/':
            resource = "index.html"
            break
        default:
            resource = "404.html"
            break
    }
    let filePath = path.join(__dirname, resource)
    let contentType = 'text/html'

    fs.readFile(filePath, (err, content) => {
        if(err){
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('Internal Server Error')
        } else {
            res.writeHead(200, {"Content-Type": contentType})
            res.end(content, "utf8")
        }
    })
})

const PORT = 8080
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

