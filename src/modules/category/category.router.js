import { Router } from "express";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import subCategoryRouter from '../subcategory/subcategory.router.js'
import validation from "../../middleware/validation.js";
import * as categoryController from './controller/category.controller.js'
import * as categoryValidation from './category.validation.js'
const router = Router()
router.use('/:categoryId/subCategory', subCategoryRouter)
router.post('/',
    fileUpload(fileValidation.image).single('image'),
    validation(categoryValidation.createCategorySchema),
    categoryController.createCategory)
    .get('/', categoryController.allCategories)
    .get('/:categoryId',
        validation(categoryValidation.oneCategorySchema)
        , categoryController.oneCategory)
    .put('/:categoryId',
        validation(categoryValidation.updateCategorySchema),
        fileUpload(fileValidation.image).single('image'),
        categoryController.updateCategory)
export default router
