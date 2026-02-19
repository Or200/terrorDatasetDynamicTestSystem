import express from "express";
import cors from "cors";
import * as fs from "fs";
import csv from "csv-parser";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/loadcsv", async (req, res) => {
  const results = [];

  function readCSV(filepath) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filepath)
        .pipe(csv())
        .on("data", (data) => {
          results.push(data);
        })
        .on("error", (error) => reject(results))
        .on("end", () => {
          resolve(results);
        });
    });
  }

  const csvFilePath = "terrorData.csv";

  (async () => {
    const output = await readCSV(csvFilePath);
    const slicedArray = output.slice(0, 50);
    res.send(slicedArray);
  })();
});

app.post("/saveplayerresult", async (req, res) => {
  const { playerScore } = req.body;
  if (!playerScore) {
    return res.status(401).json({ error: "Unauthorized: Missing credentials" });
  }
  try {
    const createdAt = new Date();
    const pScore = {
      createdAt: createdAt,
      playerScore: playerScore,
    };

    let scoreJson = fs.readFileSync("scores.json", "utf-8");
    let pScores = JSON.parse(scoreJson);
    pScores.scores.push(pScore);
    pScores = JSON.stringify(pScores);
    fs.writeFileSync("scores.json", pScores, "utf-8");

    res.status(200).json({ message: "Message added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
