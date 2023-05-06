import express from 'express'
import theme from '../controllers/theme.js';
import fs from 'fs';
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import ThemeModel from '../models/Theme.js';
import { verifyUser } from '../services/validate.js';
import PackageModel from '../models/Package.js';

const router = express.Router();

router.post('/create-theme', async (req, res) => {
    try {
        const { name, description } = req.body;
        const image1 = req.files.image;

        const newTheme = new ThemeModel({
            name,
            image: {
                data: image1,
                contentType: image1.mimetype
            },
            description
        });

        const savedTheme = await newTheme.save();
        res.setHeader('Access-Control-Allow-Origin', '*'); // add this line to allow CORS
        res.status(201).json({ message: 'Theme created successfully', theme: savedTheme });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// // configure multer to store uploaded files in a specific folder
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/theme')
//     },
//     filename: function (req, file, cb) {
//         const uniqueFilename = uuidv4();
//         const fileExtension = file.originalname.split('.').pop();
//         const newFilename = `${uniqueFilename}.${fileExtension}`;
//         cb(null, newFilename);
//     }
// })

// const upload = multer({ storage: storage });

// // create a new theme
// router.post('/create-theme', upload.single('image'), async (req, res) => {
//     try {
//         // extract the data from the request body and file uploaded by Multer
//         const { name, description } = req.body;
//         const image = req.file.filename;

//         // create a new theme object and save it to the database
//         const theme = new ThemeModel({
//             name,
//             description,
//             image,
//         });
//         const savedTheme = await theme.save();

//         res.status(201).json({ message: 'Theme created successfully', theme: savedTheme });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = 'uploads/theme';
//         if (!fs.existsSync(uploadDir)){
//             fs.mkdirSync(uploadDir);
//         }
//         cb(null, uploadDir)
//     },
//     filename: (req, file, cb) => {
//         console.log(file.originalname)
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

// router.post("/create-theme", upload.single('image'), async (req, res) => {
//     try {
//         const file = req.file.filename;
//         const uniqueFilename = uuidv4();
//         const uploadedFile = req.file;
//         uploadedFile.filename = uniqueFilename;
//         fs.renameSync(uploadedFile.path, `uploads/theme/${uploadedFile.filename}` + "." + `${uploadedFile.mimetype}`.split("/")[1]);
//         const imagePath = file ? 'uploads/theme/' + uploadedFile.filename + "." + `${uploadedFile.mimetype}`.split("/")[1] : null;
//         req.body.image = imagePath
//         console.log(req.body)

//         const saveImage = await ThemeModel(req.body)
//         const saved = await saveImage.save();
//         return res.status(201).json({ msg: "Theme Added Successfully ", saved })
//     } catch (error) {
//         return res.status(400).json(error.message)
//     }
// })

router.put("/update-theme", upload.single('image'), async (req, res) => {
    try {
        const id = req.body.id;
        console.log(id);
        const file = req.file.filename;
        const uniqueFilename = uuidv4();
        const uploadedFile = req.file;
        uploadedFile.filename = uniqueFilename;
        fs.renameSync(uploadedFile.path, `uploads/theme/${uploadedFile.filename}` + "." + `${uploadedFile.mimetype}`.split("/")[1]);
        const imagePath = file ? 'uploads/theme/' + uploadedFile.filename + "." + `${uploadedFile.mimetype}`.split("/")[1] : null;
        req.body.image = imagePath
        console.log(req.body)
        const fileName = req.body.deleteFilePath;
        fs.unlink(fileName, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        }
        )

        const filter = { _id: id };
        const update = {
            $set: {
                image: req.body.image,
                description: req.body.description
            }
        }
        const saveImage = await ThemeModel.updateOne(filter, update)
        return res.status(201).json({ msg: "Theme Added Successfully ", saveImage })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/delete-theme", async (req, res) => {
    try {
        const id = req.body.id;
        const fileName = req.body.deleteFilePath;
        fs.unlink(fileName, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        }
        )
        console.log(id);
        await ThemeModel.findByIdAndDelete(id);

        await PackageModel.deleteMany({ theme_id: id })
        return res.status(200).json({ msg: "Theme Deleted Successfully" })
    } catch (error) {
        console.log(error);
    }
})

router.put("/update-theme-name", async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.id;
        const filter = { _id: id };
        const update = {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        }
        const saveImage = await ThemeModel.updateOne(filter, update)
        console.log(saveImage);
        return res.status(201).json({ msg: "Theme Added Successfully ", saveImage })
    } catch (error) {
        console.log(error);
    }
})

router.get("/allthemes", async (req, res) => {
    try {
        const data = await ThemeModel.find().sort({ updatedAt: 1 });
        return res.status(200).json({ data })
    } catch (error) {
        console.log(error);
    }
})

router.get('/all', async (req, res) => {
    try {
        ThemeModel.find({}).then(data => res.json(data)).catch(err => res.json(err))
    } catch (error) {
        console.log(error);
    }
})

router.get('/fetchOne/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const theme = await ThemeModel.find({ _id: id });
        console.log(theme);
        return res.status(200).json({ theme })
    } catch (error) {
        console.log(error);
    }
})

router.get('/fetch-theme/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const theme = await ThemeModel.findOne({ _id: id })
        console.log(theme);
        return res.status(200).json({ theme })
    } catch (error) {
        console.log(error);
    }
})

export default router;

