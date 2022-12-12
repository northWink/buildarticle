// http-simple.js
import http from 'http'
import url from 'url'
import path  from 'path'
import fs from 'fs'
// const http = require('http');
// const url = require('url');

const server  = http.createServer((req,res)=>{
    // 绝对路径
    // 
    console.log(req.url)
    let filePath = path.resolve(path.dirname,path.join('www',url.fileURLToPath(`file://${req.url}`)));
    
    if(fs.existsSync(filePath)){
        const stats = fs.statSync(filePath);
        // 判断当前的这个路径文件是不是文件夹
        const isDir = stats.isDirectory();
        if(isDir){
            // 如果是文件夹路径，就继续拼接成index.html 形式
            filePath = path.join(filePath,'index.html');
        }
        if(!isDir || fs.existsSync(filePath)){
            const content = fs.readFileSync(filePath) // 读取文件内容
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            return res.end(content) // 返回文件内容
        }
    }
    res.writeHead(404,{'Content-Type': 'text/html'})
    res.end('<h1>Not Found</h1>');
})

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(8080, () => {
    console.log('opened sever on', server.address())
})

// const responsData = {
//     ID: '张三',
//     Name: '张三',
//     RegisterData: '2020年3月1日'
// }

// function toHTML(data) {
//     return `
//         <ul>
//             <li><span>账号：</span><span>${data.ID}</span></li>
//             <li><span>姓名：</span><span>${data.Name}</span></li>
//             <li><span>注册时间：</span><span>${data.RegisterData}</span></li>
//         </ul>
//     `
// }

// const server = http.createServer((req, res) => {
//     const { pathname } = url.parse(`http://${req.headers.host}${req.url}`);
//     if (pathname === '/') {
//         const accept = req.headers.accept; // 获取Accept信息
//         console.log(accept)
//         if (req.method === 'POST' ||accept.indexOf('application/json') >= 0) {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(responsData))
//         } else {
//             res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//             res.end(toHTML(responsData));
//         }

//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.end('<h1>Not Found</>');
//     }
// });

// server.on('clientError', (err, socket) => {
//     socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
// })

// server.listen(8080, () => {
//     console.log('opened sever on', server.address())
// })