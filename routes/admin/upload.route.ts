import { Router } from "express";
import multer from "multer";

import * as uploadCloud from "../../middlewares/admin/uploadToCloudinary.middleware";
import * as controller from "../../controllers/admin/upload.controller";

const router = Router();
const upload = multer();

//Upload ảnh từ tinymce lên cloundinary
router.post('/', upload.single("file"), uploadCloud.uploadSingle, controller.index);

export const uploadRoutes = router;