import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";
import dotenv from "dotenv";
import foodModel from '../Models/foodModel.js'
dotenv.config(); // Load .env variables

const uploadImage = async (file) => {
    try {
        const filePath = path.resolve(file); // Ensure absolute path
        console.log("Uploading file:", filePath);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error("File not found before upload: " + filePath);
        }

        const formData = new FormData();
        formData.append("image", fs.createReadStream(filePath)); // Use readStream for file handling

        const apiKey = process.env.IMGUR_API_KEY;
        if (!apiKey) {
            throw new Error("IMGUR_API_KEY is not defined in .env file");
        }

        const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        console.log("API URL:", url);

        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders(), // Required for multipart/form-data
            },
        });

        console.log("Image uploaded successfully:", response.data);
        return response.data.data.url; // Return the image URL from ImgBB

    } catch (error) {
        console.error("Image upload error:", error.response?.data || error.message);
        throw new Error("Something went wrong with the image upload");
    }
};

// add food item: 

const addFood = async (req, res) => {
    try {
        let imageUrl = null;

        if (req.file) {
            const filePath = `uploads/${req.file.filename}`.replace(/\\/g, "/");

            // Check if the file actually exists
            if (!fs.existsSync(filePath)) {
                console.error("File does not exist:", filePath);
                return res.json({ success: false, message: "File not found before upload" });
            }

            // Attempt to upload the image
            imageUrl = await uploadImage(filePath);
        }

        // Create and save the new food item
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageUrl, // Store the uploaded image URL
        });

        await food.save();
        res.json({ success: true, message: 'Food Added' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error adding food item' });
    }
};



//list food: 

const listFood = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        if (category && category !== "All") {
            query.category = category; 
        }

        const foods = await foodModel.find(query).sort({ createdAt: -1 }); // Newest items first

        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error listing food items" });
    }
};



//remove food item:

const removeFood = async(req, res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}` , ()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success : true , message: "Food removed"})
    } catch (error) {
        console.log(error)
        res.json({success : false , message : "Error removing food item"})
    }
}

const updateFood = async (req, res) => {
    try {
        const { id, name, description, price, category } = req.body;

        const food = await foodModel.findById(id);
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        
        if (req.file) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("Error deleting old image:", err);
            });
            food.image = req.file.filename;
        }

        // Update fields
        food.name = name || food.name;
        food.description = description || food.description;
        food.price = price || food.price;
        food.category = category || food.category;

        await food.save();

        res.json({ success: true, message: "Food item updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food item" });
    }
};


export {
    addFood,
    listFood,
    removeFood,
    updateFood
};