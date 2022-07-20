const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  const calcTax = (salary) => {
    let tax;
    if (salary >= 100000 && salary < 200000) {
      tax = (salary * 10) / 100;
    } else if (salary >= 200000 && salary < 300000) {
      tax = (salary * 15) / 100;
    } else if (salary >= 300000 && salary < 400000) {
      tax = (salary * 20) / 100;
    } else if (salary >= 400000) {
      tax = (salary * 25) / 100;
    } else if (salary < 100000) {
      tax = 0;
    }
    return tax;
  };
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>");
    res.write("Learn Nodejs - Lec 1");
    res.write("</title>");
    res.write("</head>");
    res.write("<body>");
    res.write('<form action="message" method="POST">');
    res.write('<input type="text" name="message" />');
    res.write("<button>Send</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      // console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const salary = Buffer.concat(body).toString().split("=")[1];
      // console.log(salary);
      fs.writeFile("message.txt", calcTax(salary), (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }

  //   console.log("server is running");
  //   res.write("server is running at 500");
};
module.exports = requestHandler;
