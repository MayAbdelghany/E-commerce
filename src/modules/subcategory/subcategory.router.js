import { Router } from "express";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import * as subCategoryController from './controller/subCategory.controller.js'

const router = Router({ mergeParams: true })
router.post('/',
    fileUpload(fileValidation.image).single('image'),
    subCategoryController.createSubCategory)
    .get('/', subCategoryController.allSubCategories)
    .get('/:subCategoryId', subCategoryController.oneSubCategory)
    .put('/:subCategoryId', fileUpload(fileValidation.image).single('image'),
        subCategoryController.updateSubCategory)
export default router


// / subcategory


// / category / id / subcategory