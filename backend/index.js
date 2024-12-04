import express from "express";
import mongoose, { Types } from "mongoose";
import cors from "cors";
import params from "params";

const app = express();

app.use(cors());
app.use(express.json());

const DBConnect = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/collageRecord",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log(
      "Database connected:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
DBConnect();
const port = 5005;
app.listen(port, () => {
  console.log("server is running on port " + port);
});
function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const dateCode = parseInt(
    `${year}${month < 10 ? "0" + month : month + 1}${
      date < 10 ? "0" + date : date
    }`,
    10
  );
  return dateCode;
}
const csea = mongoose.Schema(
  {
    Semester: {
      type: String,
      required: [true, "Semester is required"],
    },
    branch: {
      type: String,
      required: [true, "branch is required"],
    },
    subject: {
      type: String,
      required: [true, "subject name is required"],
    },
    faculty: {
      type: String,
      required: [true, "faculty name is required"],
    },
    classCode: {
      type: String,
    },
    attendance: {
      type: [Number],
    },
  },
  {
    timestamps: true,
  }
);
const cseASchema = mongoose.model("csea", csea);

app.post("/collageapna/postrecord", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  try {
    const {
      faculty,
      subject,
      attendance,
      subCode,
      lectureNumber,
      branchCode,
      branchName,
      semCode,
      Semester,
    } = req.body;
    console.log("api run at backend");
    console.log(faculty);
    console.log(subject);

    if (
      !faculty ||
      !subject ||
      !attendance ||
      !subCode ||
      !lectureNumber ||
      !branchCode ||
      !branchName ||
      !semCode ||
      !Semester
    ) {
      console.log("all field are mandatory");
      return res.status(404).json({ message: "All field are mandatory" });
    }
    const dateCode = getToday();
    const classCode =
      dateCode + semCode + branchCode + subCode + "" + lectureNumber;
    console.log(semCode);
    console.log(classCode);
    console.log(branchName);
    console.log(subCode);
    if (semCode == 3) {
      if (branchCode == 1) {
        const oldRecord = await cseASchema.exists({ classCode: classCode });
        if (oldRecord) {
          console.log("This class has been done");
          return res.status(202).json({ message: "This class has been done" });
        }
        const newRecord = new cseASchema({
          Semester: Semester,
          branch: branchName,
          subject: subject,
          faculty: faculty,
          classCode: classCode,
          attendance: attendance,
        });
        await newRecord.save();
        console.log(newRecord);
        res.status(201).json({
          message: "record stored successfully",
          user: {
            faculty: newRecord.faculty,
            subject: newRecord.subject,
            attendance: newRecord.attendance,
          },
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
    console.log("Error api failed at backend");
  }
});

app.post("/collageapna/find/:classCode", async (req, res) => {
  try {
    console.log("find by code backend run");
    const { classCode } = req.params;
    console.log("Finding details for classCode:", classCode);

    const record = await cseASchema.findOne({ classCode: classCode });
    console.log(record);
    if (!record) {
      console.log("not found");
      return res.status(404).json({ message: "record (class) not found" });
    }
    return res.status(200).json(record);
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post(
  "/collageapna/classstatus/:semCode/:branchCode/:subCode/:lectureNumber",
  async (req, res) => {
    try {
      const dateCode = getToday();
      console.log(dateCode);
      
      const {semCode,branchCode,subCode,lectureNumber} = req.params;
      console.log("dateCode");
      const classCode =
      dateCode + semCode + branchCode + subCode + "" + lectureNumber;
      console.log(classCode);

      const result = await cseASchema.exists({ classCode: classCode });
      console.log(result);
      
      if(!result){
        res.status(200).json({message:"Class for this slot is available !!"})
        console.log("class to be ready for taken");
      }else{
        res.status(201).json({message:"Class for this slot has been done!!"})
        console.log("class done");
      }
    } catch (error) {
      res.status(404).json(error)
      console.log("error 404");
      
    }
  }
);
