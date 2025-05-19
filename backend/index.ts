import app from "./src/app.js";
import { connectToDatabase } from "./src/repo/connection.js";

// // Routing in express js using node
// app.get("/hello", (req, res, next) => { return res.send("Hello") });
// app.post("/hello", (req, res, next) => { return res.send(`Hello ${req.body.name}`) });
// app.delete("/user/:id", (req, res, ext) => { return res.send(`Hello ${req.params.id}`)});

//connections and listeners
const PORT = process.env.PORT || 8080;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server open and connected to database")
    );
  })
  .catch((err) => console.error(err));
