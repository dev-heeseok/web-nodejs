import express, { Errback } from "express";

const app = express();

app.use(express.static('./build'));

app.get("/", function (req, res) {
  res.sendfile(__dirname + "/build/index.html");
});

app.listen(4000, () => {
  console.log("server is running");
});
