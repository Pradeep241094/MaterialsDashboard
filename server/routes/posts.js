import express from 'express';

import { createMaterials, getMaterials, updateMaterials, deleteMaterials} from '../controllers/posts.js';


// api routes for all the crud operations
const router = express.Router();

router.get('/', getMaterials);
router.post('/', createMaterials);
router.patch('/:id', updateMaterials);
router.delete('/:id', deleteMaterials);

export default router;