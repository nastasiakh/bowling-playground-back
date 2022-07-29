import express, {Request, Response} from "express";
import functions from "firebase-functions";
import router from "./users/users";
import * as admin from "firebase-admin";

admin.initializeApp();
const app: express.Express = express();
// const port = 3000;

app.use("/signup/info", router);

app.get("/", (req: Request, res: Response) => {
  res.send("The app is running.");
});

exports.widgets = functions.https.onRequest(app);

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
