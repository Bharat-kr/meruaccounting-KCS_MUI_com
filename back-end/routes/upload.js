import path from "path";
import express from "express";
import multer from "multer";
import AWS from "aws-sdk";
import asyncHandler from "express-async-handler";
import fs from "fs";
const router = express.Router();

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const upload = asyncHandler(async (req, res) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    });
    const fileName = makeid(10) + "-" + new Date().getTime() + ".png";

    const params = {
      Bucket: "meru-screenshots",
      Key: `images/${fileName}`,
      Body: req.file.buffer,
      ACL: "public-read-write",
    };

    const data = await s3.upload(params).promise();

    res.json({
      status: "Succesfully Uploaded image to s3",
      data: { location: data.Location },
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/", multer().single("image"), upload);
// router.route("/").post(upload);

export default router;
