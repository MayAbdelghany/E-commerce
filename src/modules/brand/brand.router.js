import { Router } from "express";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import validation from "../../middleware/validation.js";
import * as brandController from './controller/brand.controller.js'
import * as brandValidation from './brand.validation.js'
const router = Router()
router.post('/',
    fileUpload(fileValidation.image).single('image'),
    validation(brandValidation.createBrandSchema),
    brandController.createBrand)
    .get('/', brandController.allBrands)
    .get('/:brandId',
        validation(brandValidation.oneBrandSchema)
        , brandController.oneBrand)
    .put('/:brandId',
        validation(brandValidation.updateBrandSchema),
        fileUpload(fileValidation.image).single('image'),
        brandController.updateBrand)
export default router
