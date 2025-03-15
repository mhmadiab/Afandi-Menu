import foodModel from '../Models/foodModel.js'
import fs from 'fs'

// add food item: 

const addFood = async(req, res)=>{


    let image_filename = `${req.file.filename}`
    
    const food = new foodModel({
        name: req.body.name,
        description : req.body.description,
        price: req.body.price,
        category : req.body.category,
        image: image_filename
    })

    try {
        await food.save()
        res.json({success : true , message : "Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success : false , message : "Error adding food item"})
    }
}


//list food: 

const listFood = async(req, res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success : true , data : foods})
    } catch (error) {
        console.log(error)
        res.json({success : false , message : "Error listing food items"})
    }
}


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