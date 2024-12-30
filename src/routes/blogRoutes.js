import express from 'express';
import { getPostBySlug } from '../controllers/blogController.js';

const router = express.Router();

router.get('/get-post/:slug', getPostBySlug);

export default router;
