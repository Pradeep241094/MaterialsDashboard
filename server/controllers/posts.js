import express from 'express';

import MaterialModel from '../models/materialMessage.js';

const router = express.Router();

export const getMaterials = async (req, res) => { 
    try {
        const materialObj = await MaterialModel.find();
                
        res.status(200).json(materialObj);
    } catch (error) {

         // throw error if the objects are not able to fetch from db
        res.status(404).json({ message: error.message });
    }
}

export const createMaterials = async (req, res) => {
    const { id, name, volume, delivery_date, color, total, cost } = req.body;

    const newMaterialObject = new MaterialModel({ name, volume, delivery_date, color, total, cost })

    try {
        await newMaterialObject.save();

        res.status(201).json(newMaterialObject );
    } catch (error) {

        // throw error if the object is not added into db
        res.status(409).json({ message: error.message });
    }
}

export const updateMaterials = async (req, res) => {
    const { id } = req.params;
    const { name, volume, delivery_date, color, total, cost } = req.body;
    
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No material with id: ${id}`);

    const updatedObj = { name, volume, delivery_date, color, total, cost, _id: id };

    await MaterialModel.findByIdAndUpdate(id, updatedObj, { new: true });

    res.json(updatedObj);
}

export const deleteMaterials = async (req, res) => {
    const { id } = req.params;

    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No material with id: ${id}`);

    await MaterialModel.findByIdAndRemove(id);

    res.json({ message: "Material deleted successfully." });
}


export default router;