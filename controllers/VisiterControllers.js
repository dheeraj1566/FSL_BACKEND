import express from "express";
import VisiterModel from "../models/visiterModule.js";


export async function createVisiter(req, res) {
   try {
      console.log(req.body)
      const createnewVisiter = new VisiterModel(req.body);
      await createnewVisiter.save();
      res.status(201).json(createnewVisiter)
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to Add Visiter' })
   }
}

export async function getVisiters(req, res) {
   try {
      const Visiters = await VisiterModel.find();
      res.status(200).json(Visiters);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to Add Visiter' })
   }
}

export async function getOneIdVisiters(req, res) {
      console.log("is working")
      const Visiters = await VisiterModel.findById(req.params.id)
      console.log(Visiters)
      res.status(200).json(Visiters);
}

// export async function putOneVisiters(req, res) {
//    try {
//       const updateOneVisiters = await BorrowerModel.findByIdAndUpdate(
//          req.params.id,
//          req.body,
//          { new: true } 
//       );
//       if (!updateOneVisiters)
//          return res.status(404).json({ error: 'Borrower not found' });
//          res.status(200).json(updateOneVisiters);
//    } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to update single data', details: err.message });
//    }
// }

export async function deleteVisiter(req, res) {
   const deleteVisiter = await VisiterModel.findByIdAndDelete(req.params.id);
   console.log(deleteVisiter);
   if (deleteVisiter) {
      res.status(200).json({ message: 'Visiter deleted successfully' });
   } else {
      res.status(404).json({ message: 'Visiter not found' });
   }
}

