import express from 'express';
const router = express.Router();
import noteController from '../api/noteController.js';

router.post('/create-notes',noteController.createNotes);
router.get('/getAll-notes',noteController.getAllNotes);
router.put('/update-notes/:id',noteController.UpdateAllNotes);
router.delete('/delete-notes/:id',noteController.deleteNotes);



export default router;