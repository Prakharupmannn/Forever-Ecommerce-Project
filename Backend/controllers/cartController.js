
import userModel from "../models/userModel.js"
// add products to user cart

const addToCart = async (req,res) => {
    try {
        
        const {userId, itemId, size} = req.body;
        const ItemID = itemId || req.body.ItemId;
        console.log()

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[ItemID]) {
            if(cartData[ItemID][size]) {
                cartData[ItemID][size] += 1
            } 
            else{
                cartData[ItemID][size] = 1
            }
        } else {
            cartData[ItemID] = {}
            cartData[ItemID][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success: true , message: "Added to Cart"})

    } catch (error) {
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

// update  user cart

const updateCart = async (req,res) => {
    try {
        
        const {userId , itemId , size , quantity} = req.body;
        const ItemID = itemId || req.body.ItemId;

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[ItemID][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true , message: "Cart Updated"})


    } catch (error) {
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

// get user cart data

const getUserCart = async (req, res) => {
    try {
        
        const {userId} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

export { addToCart, updateCart, getUserCart }