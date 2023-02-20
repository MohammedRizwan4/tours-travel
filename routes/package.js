import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import path from 'path';
import PackageModel from '../models/Package.js';
import ThemeModel from '../models/Theme.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/package')
    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/create-package", upload.array('images', 5), async (req, res) => {
    try {
        for (let i = 0; i < req.files.length; i++) {
            const uploadedFile = req.files[i];
            const uniqueFilename = uuidv4();
            fs.renameSync(uploadedFile.path, `uploads/package/${uniqueFilename}` + "." + `${uploadedFile.mimetype}`.split("/")[1])   // + "." + `${uploadedFile.mimetype}`.split("/")[1]
            const imagePath = 'uploads/package/' + uniqueFilename + "." + `${uploadedFile.mimetype}`.split("/")[1]
            req.body[`image${i + 1}`] = imagePath;
        }
        const destinations = req.body.destinations_covered.split(",");
        const accommodations = req.body.accommodations.split(",");
        const obj = {
            name: req.body.name,
            images: [req.body.image1, req.body.image2, req.body.image3, req.body.image4, req.body.image5],
            location: {
                city: req.body.city,
                state_name: req.body.state_name
            },
            destinations_covered: destinations,
            starting_point: req.body.starting_point,
            ending_point: req.body.ending_point,
            stars: req.body.stars,
            accommodations: accommodations,
            theme_id: req.body.theme_id
        }
        const saveImage = await PackageModel(obj)
        const saved = await saveImage.save();
        return res.status(201).json({ msg: "Successfull", saved })
    } catch (error) {
        console.log(error);
    }
})

router.get("/all-packages", async (req, res) => {
    try {
        const data = await PackageModel.find().sort({ updatedAt: -1 });
        const promises = data.map(async (data) => {
            const id = data.theme_id;
            const theme = await ThemeModel.findOne({ _id: id })
            return theme;
        })
        const themes = await Promise.all(promises);
        return res.status(200).json({ data, themes })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/delete-package", async (req, res) => {
    try {
        const id = req.body.id;
        const package1 = await PackageModel.findOne({ _id: id })

        const imagesPath = package1.images.map(image => image);

        for (let image of imagesPath) {
            fs.unlink(image, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted file: ${path}`);
                }
            })
        }

        await PackageModel.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Package Deleted Successfully" })
    } catch (error) {
        console.log(error);
    }
})

router.get("/fetch-single-package/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const package1 = await PackageModel.findOne({ _id: id });
        return res.status(200).json({ package1 })
    } catch (error) {
        console.log(error);
    }
})

router.put("/update-packagee", upload.array('images'), async (req, res) => {
    try {
        console.log(req.body.name);
        const packageId = req.body.id
        const package1 = await PackageModel.findById({ _id: packageId });
        if (!package1) {
            return res.status(404).json({ msg: "Package not found" });
        }

        let a = 0;
        for (let i = 0; i <= 5; i++) {
            if (req.body[`image${i + 1}path`]) {
                console.log("Hello ji onkonkonkonkonkonkonk", req.body[`image${i + 1}path`]);
                console.log(i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i,);
                const uploadedFile = req.files[a];
                const uniqueFilename = uuidv4();
                console.log(uploadedFile);
                console.log(uploadedFile.path);
                try {
                    fs.renameSync(uploadedFile.path, `uploads/package/${uniqueFilename}` + "." + `${uploadedFile.mimetype}`.split("/")[1])
                } catch (error) {
                    console.log(error);
                }
                const imagePath = 'uploads/package/' + uniqueFilename + "." + `${uploadedFile.mimetype}`.split("/")[1]
                fs.unlink(req.body[`image${i + 1}path`], (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`Deleted file: ${path}`);
                    }
                })
                req.body[`image${i + 1}`] = imagePath;
                a++;
            }
        }

        console.log(req.body);

        const destinations = req.body.destinations_covered ? req.body.destinations_covered.split(",") : package1.destinations_covered;
        const accommodations = req.body.accommodations ? req.body.accommodations.split(",") : package1.accommodations;

        const obj = {
            name: req.body.name || package1.name,
            images: [
                req.body.image1 || package1.images[0],
                req.body.image2 || package1.images[1],
                req.body.image3 || package1.images[2],
                req.body.image4 || package1.images[3],
                req.body.image5 || package1.images[4],
            ],
            location: {
                city: req.body.city || package1.location.city,
                state_name: req.body.state_name || package1.location.state_name,
            },
            destinations_covered: destinations,
            starting_point: req.body.starting_point || package1.starting_point,
            ending_point: req.body.ending_point || package1.ending_point,
            stars: req.body.stars || package1.stars,
            accommodations: accommodations,
            theme_id: req.body.theme_id || package1.theme_id,
        }

        console.log(packageId);
        const updatedPackage = await PackageModel.findByIdAndUpdate({ _id: packageId }, obj, { new: true });
        return res.status(200).json({ msg: "Successfully updated", updatedPackage });
    } catch (error) {
        console.log(error);
    }
})

// fetch-theme1-packages/${id}
router.get("/fetch-theme1-packages/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const packages = await PackageModel.find({ theme_id: id });
        return res.status(200).json({ packages })
    } catch (error) {
        console.log(error);
    }
})


export default router;


