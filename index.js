const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const corsOptions = require("./middleWare/corsOptions");
const { connection,connectToMySql } = require("./utils/connection");
const app = express();

// middlewares
app.use(cors());
app.use(cors(corsOptions));
app.use(bodyParser.json());


// routes
app.use("/api/applicant", require("./routes/applicantRoute"));
app.use("/api/education", require(".//routes/educationRoute"));
app.use("/api/employment", require("./routes/employment"));
app.use("/api/employment", require("./routes/employmentRoute"));
app.use("/api/formalTraining", require("./routes/formalTrainingRoute"));
app.use("/api/research", require("./routes/researchRoute"));
app.use("/api/researchPapers", require("./routes/researchPaperRoute"));
app.use("/api/countriesVisited", require("./routes/visitedContriesRoute"));
app.use("/api/references", require("./routes/referenceRoute"));
app.use("/api/user/", require("./routes/userRoute"));

// routes for checking
app.get("/", (req, res) => {
  res.send("it is working properly");
});

// port
app.listen(4001, async () => {
  console.log("listening in on port 4001");
   connectToMySql();
});
connection.sync({force : false})
  .then(()=>{
    console.log("sync done");
  }).catch(err =>{
    console.log(err);
  });