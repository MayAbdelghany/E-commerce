import { Router } from "express";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import validation from "../../middleware/validation.js";
import * as subCategoryController from './controller/subCategory.controller.js'
import * as subCategoryValidation from './subcategory.validation.js'
const router = Router({ mergeParams: true })
router.post('/',
    fileUpload(fileValidation.image).single('image'),
    validation(subCategoryValidation.createSubCategorySchema),
    subCategoryController.createSubCategory)


    .get('/', subCategoryController.allSubCategories)


    .get('/:subCategoryId',
        validation(subCategoryValidation.oneSubCategorySchema),
        subCategoryController.oneSubCategory)


    .put('/:subCategoryId',
        fileUpload(fileValidation.image).single('image'),
        validation(subCategoryValidation.updateSubCategorySchema),
        subCategoryController.updateSubCategory)
export default router


// / subcategory


// / category / id / subcategory