import imagekit from "../configs/imageKit.js";
import Car from '../models/Car.js';
import User from "../models/User.js";
import fs from 'fs';

export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you can list cars"})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Api to list car
export const addCar = async (req, res) => {
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // upload image to image kit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        });

        // For URL Generation, works for both images and videos
        var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {width: '1280'},
                {quality: 'auto'},
                {format: 'webp'},
            ]
        });
        const image = optimizedImageUrl;
        await Car.create({...car, owner: _id, image})
        
        res.json({success: true, message: "car added"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Api to list owner cars
export const getOwnerCars = async(req, res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id})
        res.json({success: true, cars})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// api to toggle car availability
export const toggleCarAvailability = async(req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId)

        // checking if the car belongs to the owner
        if(car.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "unauthorized"})
        }

        car.isAvailable = !car.isAvailable;
        await car.save();

        res.json({success: true, cars})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// api to delete a car
export const deleteCar = async(req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId)

        // checking if the car belongs to the owner
        if(car.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "unauthorized"})
        }

        car.owner = null;
        car.isAvailable = false;

        await car.save();

        res.json({success: true, message: "Availability Toggled"})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// api to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const {_id, role} = req.user;
        if(role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"});
        }
        const cars = await Car.find({owner: _id})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
