import { Router } from 'express'; 
const router: Router = Router();

import multer from "multer";

import * as controller from '../../controllers/admin/tour.controller';

import * as uploadCloud from "../../middlewares/admin/uploadToCloudinary.middleware";

const upload = multer();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post(
  "/create",
  upload.fields([
    { name: 'images', maxCount: 10 }
  ]),
  uploadCloud.uploadFields,
  controller.createPost
);

export const tourRoutes = router;