import express from "express";
import FslModel from "../models/fsl.js";
import { uploadImages } from "../utilty/cloudinaryService.js";
import generatePassword from "../utilty/generatePassword.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
// const nodemailer = require("nodemailer");

export async function createFsl(req, res) {
   try {
      const file = req.files
      const uploadData = await uploadImages(file);
      const aadharFront = uploadData[0].url
      const aadharBack = uploadData[1].url

      let data = req.body
      data.aadharFront = aadharFront
      data.aadharBack = aadharBack

      const password = generatePassword()
      data.password = password;

      const createnewFsl = new FslModel(data);
      await createnewFsl.save();
      await sendEmail(createnewFsl, password);
      res.status(201).json({
         message: 'Fsl created successfully',
         data: createnewFsl
         // password: password   
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to Add Fsl' })
   }
}

export async function getUserFsls(req, res) {
   try {
      const Fsls = await FslModel.find();
      res.status(200).json(Fsls);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to Add Fsl' })
   }
}

export async function getOneUserFsls(req, res) {
   const Fsls = await FslModel.findById(req.params.id)
   console.log(Fsls)
   res.status(200).json(Fsls);
}

export async function putOneFsls(req, res) {
   try {
      const updateOneFsls = await BorrowerModel.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true } 
      );
      if (!updateOneFsls)
         return res.status(404).json({ error: 'Borrower not found' });
         res.status(200).json(updateOneFsls);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update single data', details: err.message });
   }
}  


export async function deleteFsl(req, res) {
   const deleteFsl = await FslModel.findByIdAndDelete(req.params.id);
   console.log(deleteFsl);
   if (deleteFsl) {
      res.status(200).json({ message: 'Fsl deleted successfully' });
   } else {
      res.status(404).json({ message: 'Fsl not found' });
   }
}




// Function to send the email using Nodemailer
async function sendEmail(fslData, password) {
   try {
      // Create a transporter object using your email provider (Ethereal used here for testing)
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         secure: true, // Set to true if using port 465 (SSL)
         auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
         },
      });

      // Define the email content (use the data from the FSL creation)
      const emailContent = `
       <h3>FSL Creation Confirmation</h3>
       <p><strong>Name:</strong> ${fslData.name}</p>
       <p><strong>Aadhar Front:</strong> <a href="${fslData.aadharFront}" target="_blank">View Aadhar Front</a></p>
       <p><strong>Aadhar Back:</strong> <a href="${fslData.aadharBack}" target="_blank">View Aadhar Back</a></p>
       <p><strong>Password:</strong> ${password}</p>
     `;


      // Send the email
      const info = await transporter.sendMail({
         from: process.env.EMAIL_USER, // Sender's email address (replace with your own)
         to: 'sidharth3634@gmail.com', // Recipient's email from the FSL data
         subject: "FSL Created Successfully ✔", // Subject of the email
         text: `FSL Created Successfully.`, // Plain text version
         html: emailContent, // HTML version of the email
      });


      console.log("Email sent: %s", info.messageId);
   } catch (error) {
      console.error("Error sending email:", error);
   }
}

