import slugify from "slugify"
import couponModel from "../../../../DB/model/Coupon.model.js"
import cloudinary from "../../../utils/cloudinary.js"
import { asyncHandler } from "../../../utils/errorHandling.js"
//(1) check if name is not exist 
//(2) upload image
//(3) add coupon

//add new coupon
export const createCoupon = asyncHandler(
    async (req, res, next) => {
        const name = req.body.name.toLowerCase()
        if (await couponModel.findOne({ name })) {
            return next(new Error(`Dublicated coupon name ${name}`, { cause: 409 }))
        }
        if (req.file) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/coupon` })
            req.body.image = { public_id, secure_url }
        }
        const coupon = await couponModel.create(req.body)
        return res.status(201).json({ message: "Done", coupon })
    }

)


//(1) check if coupon id is exist
//(2) if update exist name -->if name is old name
//                         -->if name is exist

//(3) if update image --> upload new image then delete old image
//(4) update coupon

//update coupon
export const updateCoupon = asyncHandler(
    async (req, res, next) => {
        const { couponId } = req.params
        const coupon = await couponModel.findById({ _id: couponId })
        if (!coupon) {
            return next(new Error(`invalid coupon id ${couponId}`, { cause: 400 }))
        }
        if (req.body.name) {
            req.body.name = req.body.name.toLowerCase()
            if (coupon.name == req.body.name) {
                return next(new Error(`can't update coupon name with same old name ${coupon.name}`, { cause: 400 }))
            }
            if (await couponModel.findOne({ name: req.body.name })) {
                return next(new Error(`Dublicated coupon name ${req.body.name}`, { cause: 409 }))
            }
        }
        if (req.file) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/coupon` })
            if (coupon.image) {
                await cloudinary.uploader.destroy(coupon.image.public_id)
            }
            req.body.image = { public_id, secure_url }
        }
        const updatedcoupon = await couponModel.findByIdAndUpdate({ _id: couponId }, req.body, { new: true })
        return res.status(200).json({ message: "Done", coupon: updatedcoupon })
    }
)
//find all coupons exist in system


//get all coupons
export const getAllCoupons = asyncHandler(
    async (req, res, next) => {
        const coupons = await couponModel.find()
        return res.status(200).json({ message: "Done", couponList: coupons })
    }
)