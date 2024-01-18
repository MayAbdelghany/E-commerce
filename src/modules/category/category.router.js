import { Router } from "express";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import subCategoryRouter from '../subcategory/subcategory.router.js'
import * as categoryController from './controller/category.controller.js'

const router = Router()
router.use('/:categoryId/subCategory', subCategoryRouter)
router.post('/',
    fileUpload(fileValidation.image).single('image'),
    categoryController.createCategory)
    .get('/', categoryController.allCategories)
    .get('/:categoryId', categoryController.oneCategory)
    .put('/:categoryId', fileUpload(fileValidation.image).single('image'),
        categoryController.updateCategory)
export default router
