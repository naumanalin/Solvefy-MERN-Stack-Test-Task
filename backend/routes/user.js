import express from 'express'
import { signup, login, user, logout, uploadProfilePicture, updateProfile, changePassword } from '../controllers/auth_Controller.js';
import { isLogedin } from '../middlewares/isLogedIn.js'
import upload from '../utils/Multer.js';

const router = express.Router();

router.post('/signup', signup ); // ✔ Checked 
router.post('/login', login); // ✔ Checked 
router.get('/dashboard', isLogedin, user) // ✔ Checked 
router.post('/change/password', isLogedin, changePassword ) // ✔ Checked 
router.post('/upload/picture', isLogedin, upload.single('picture'), uploadProfilePicture ) // ✔ Checked
router.post('/update/profile', isLogedin, updateProfile ) // ✔ Checked 
router.get('/logout', logout ) // ✔ Checked 


export default router;