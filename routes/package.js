import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import path from 'path';
import PackageModel from '../models/Package.js';
import ThemeModel from '../models/Theme.js';
import User from '../models/User.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/package')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/create-package", upload.array('images'), async (req, res) => {
    try {
        for (let i = 0; i < req.files.length; i++) {
            const uploadedFile = req.files[i];
            const uniqueFilename = uuidv4();
            fs.renameSync(uploadedFile.path, `uploads/package/${uniqueFilename}` + "." + `${uploadedFile.mimetype}`.split("/")[1])   // + "." + `${uploadedFile.mimetype}`.split("/")[1]
            const imagePath = 'uploads/package/' + uniqueFilename + "." + `${uploadedFile.mimetype}`.split("/")[1]
            req.body[`image${i + 1}`] = imagePath;
        }

        const destinations = req.body.destinations_covered.split(",");
        console.log(req.body.aname,
            req.body.nearby,
            req.body.aprice,
            req.body.aprice,
            req.body.atype);
        let obj1, obj2;
        if (!req.body.aname_1 && !req.body.aname_2) {
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
                date: req.body.selectedDate,
                details: [
                    {
                        price: req.body.price,
                        duration: "2N/3D",
                        transfer_price: req.body.transfer,
                        accommodations: [
                            {
                                name: req.body.aname,
                                nearby: req.body.nearby,
                                images: req.body.image6,
                                price: req.body.aprice,
                                stars: req.body.aprice,
                                acc_type: req.body.atype
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport,
                            destination_airport: req.body.dairport,
                            flightno: req.body.fno
                        }]
                    }
                ],
                theme_id: req.body.theme_id
            }
            const saveImage = await PackageModel(obj)
            const saved = await saveImage.save();
            return res.status(201).json({ msg: "Successfull", saved })
        }

        if (!req.body.aname_1 && req.body.aname_2) {
            obj2 = {
                price: req.body.price_2,
                duration: "5N/6D",
                transfer_price: req.body.transfer_2,
                accommodations: [
                    {
                        name: req.body.aname_2,
                        nearby: req.body.nearby_2,
                        images: req.body.image7,
                        price: req.body.aprice_2,
                        stars: req.body.aprice_2,
                        acc_type: req.body.atype_2
                    },
                ],
                flights: [{
                    airport: req.body.bairport_2,
                    destination_airport: req.body.dairport_2,
                    flightno: req.body.fno_2
                }]
            }
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
                date: req.body.selectedDate,
                details: [
                    {
                        price: req.body.price,
                        duration: "2N/3D",
                        transfer_price: req.body.transfer,
                        accommodations: [
                            {
                                name: req.body.aname,
                                nearby: req.body.nearby,
                                images: req.body.image6,
                                price: req.body.aprice,
                                stars: req.body.aprice,
                                acc_type: req.body.atype
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport,
                            destination_airport: req.body.dairport,
                            flightno: req.body.fno
                        }]
                    },
                    obj2,
                ],
                theme_id: req.body.theme_id
            }
            const saveImage = await PackageModel(obj)
            const saved = await saveImage.save();
            return res.status(201).json({ msg: "Successfull", saved })
        }

        if (req.body.aname_1 && !req.body.aname_2) {
            obj1 = {
                price: req.body.price_1,
                duration: "3N/4D",
                transfer_price: req.body.transfer_1,
                accommodations: [
                    {
                        name: req.body.aname_1,
                        nearby: req.body.nearby_1,
                        images: req.body.image7,
                        price: req.body.aprice_1,
                        stars: req.body.aprice_1,
                        acc_type: req.body.atype_1
                    },
                ],
                flights: [{
                    airport: req.body.bairport_1,
                    destination_airport: req.body.dairport_1,
                    flightno: req.body.fno_1
                }]
            }
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
                date: req.body.selectedDate,
                details: [
                    {
                        price: req.body.price,
                        duration: "2N/3D",
                        transfer_price: req.body.transfer,
                        accommodations: [
                            {
                                name: req.body.aname,
                                nearby: req.body.nearby,
                                images: req.body.image6,
                                price: req.body.aprice,
                                stars: req.body.aprice,
                                acc_type: req.body.atype
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport,
                            destination_airport: req.body.dairport,
                            flightno: req.body.fno
                        }]
                    },
                    obj1,
                ],
                theme_id: req.body.theme_id
            }
            const saveImage = await PackageModel(obj)
            const saved = await saveImage.save();
            return res.status(201).json({ msg: "Successfull", saved })
        }

        if (req.body.aname_2 && req.body.aname_1) {
            obj1 = {
                price: req.body.price_1,
                duration: "3N/4D",
                transfer_price: req.body.transfer_1,
                accommodations: [
                    {
                        name: req.body.aname_1,
                        nearby: req.body.nearby_1,
                        images: req.body.image7,
                        price: req.body.aprice_1,
                        stars: req.body.aprice_1,
                        acc_type: req.body.atype_1
                    },
                ],
                flights: [{
                    airport: req.body.bairport_1,
                    destination_airport: req.body.dairport_1,
                    flightno: req.body.fno_1
                }]
            }
            obj2 = {
                price: req.body.price_2,
                duration: "5N/6D",
                transfer_price: req.body.transfer_2,
                accommodations: [
                    {
                        name: req.body.aname_2,
                        nearby: req.body.nearby_2,
                        images: req.body.image8,
                        price: req.body.aprice_2,
                        stars: req.body.aprice_2,
                        acc_type: req.body.atype_2
                    },
                ],
                flights: [{
                    airport: req.body.bairport_2,
                    destination_airport: req.body.dairport_2,
                    flightno: req.body.fno_2
                }]
            }
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
                date: req.body.selectedDate,
                details: [
                    {
                        price: req.body.price,
                        duration: "2N/3D",
                        transfer_price: req.body.transfer,
                        accommodations: [
                            {
                                name: req.body.aname,
                                nearby: req.body.nearby,
                                images: req.body.image6,
                                price: req.body.aprice,
                                stars: req.body.aprice,
                                acc_type: req.body.atype
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport,
                            destination_airport: req.body.dairport,
                            flightno: req.body.fno
                        }]
                    },
                    obj1,
                    obj2,
                ],
                theme_id: req.body.theme_id
            }
            const saveImage = await PackageModel(obj)
            const saved = await saveImage.save();
            return res.status(201).json({ msg: "Successfull", saved })
        }
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
        const { id } = req.params;
        console.log(id);
        const package1 = await PackageModel.findOne({ _id: id });
        return res.status(200).json({ package1 })
    } catch (error) {
        console.log(error);
    }
})

router.put("/update-package", upload.array('images'), async (req, res) => {
    try {
        console.log(req.body.id);
        const packageId = req.body.id
        const package1 = await PackageModel.findById({ _id: packageId });
        if (!package1) {
            return res.status(404).json({ msg: "Package not found" });
        }

        let a = 0;
        for (let i = 0; i < 5; i++) {
            if (req.body[`image${i + 1}path`]) {
                fs.unlink(req.body[`image${i + 1}path`], (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`Deleted file: ${path}`);
                    }
                })
                const uploadedFile = req.files[a];
                const uniqueFilename = uuidv4();
                try {
                    fs.renameSync(uploadedFile.path, `uploads/package/${uniqueFilename}` + "." + `${uploadedFile.mimetype}`.split("/")[1])
                } catch (error) {
                    console.log(error);
                }
                const imagePath = 'uploads/package/' + uniqueFilename + "." + `${uploadedFile.mimetype}`.split("/")[1]
                req.body[`image${i + 1}`] = imagePath;
                a++;
            }
        }

        if (req.body['image6path']) {
            fs.unlink(req.body[`image6path`], (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted file: ${path}`);
                }
            })

            const uploadedFile = req.files[a];
            const uniqueFilename = uuidv4();
            try {
                fs.renameSync(uploadedFile.path, `uploads/package/${uniqueFilename}` + "." + `${uploadedFile.mimetype}`.split("/")[1])
            } catch (error) {
                console.log(error);
            }
            const imagePath = 'uploads/package/' + uniqueFilename + "." + `${uploadedFile.mimetype}`.split("/")[1]
            req.body[`image6`] = imagePath;
            a++;
        }

        if (req.body['image7path']) {
            fs.unlink(req.body[`image7path`], (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted file: ${path}`);
                }
            })

            const uploadedFile = req.files[a];
            const uniqueFilename = uuidv4();
            try {
                fs.renameSync(uploadedFile.path, `uploads/package/${uniqueFilename}` + "." + `${uploadedFile.mimetype}`.split("/")[1])
            } catch (error) {
                console.log(error);
            }
            const imagePath = 'uploads/package/' + uniqueFilename + "." + `${uploadedFile.mimetype}`.split("/")[1]
            req.body[`image7`] = imagePath;
            a++;
        }

        if (req.body['image8path']) {
            fs.unlink(req.body[`image8path`], (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted file: ${path}`);
                }
            })

            const uploadedFile = req.files[a];
            const uniqueFilename = uuidv4();
            try {
                fs.renameSync(uploadedFile.path, `uploads/package/${uniqueFilename}` + "." + `${uploadedFile.mimetype}`.split("/")[1])
            } catch (error) {
                console.log(error);
            }
            const imagePath = 'uploads/package/' + uniqueFilename + "." + `${uploadedFile.mimetype}`.split("/")[1]
            req.body[`image8`] = imagePath;
            a++;
        }

        const destinations = req.body.destinations_covered.split(",");

        if (!req.body.aname_1 && !req.body.aname_2) {
            const obj = {
                name: req.body.name,
                images: [req.body.image1 ? req.body.image1 : package1.images[0], req.body.image2 ? req.body.image2 : package1.images[1], req.body.image3 ? req.body.image3 : package1.images[2], req.body.image4 ? req.body.image4 : package1.images[3], req.body.image5 ? req.body.image5 : package1.images[4]],
                location: {
                    city: req.body.city,
                    state_name: req.body.state_name
                },
                destinations_covered: destinations,
                starting_point: req.body.starting_point,
                ending_point: req.body.ending_point,
                stars: req.body.stars,
                date: req.body.selectedDate,
                details: [
                    {
                        price: req.body.price,
                        duration: "2N/3D",
                        transfer_price: req.body.transfer,
                        accommodations: [
                            {
                                name: req.body.aname,
                                nearby: req.body.nearby,
                                images: req.body.image6 ? req.body.image6 : package1.details[0].accommodations[0].images,
                                price: req.body.aprice,
                                stars: req.body.aprice,
                                acc_type: req.body.atype
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport,
                            destination_airport: req.body.dairport,
                            flightno: req.body.fno
                        }]
                    }
                ],
                theme_id: req.body.theme_id
            }
            console.log(obj);
            const saveImage = await PackageModel.updateOne({ _id: packageId }, obj)
            console.log(saveImage);
            return res.status(201).json({ msg: "Successfull", saveImage })
        }

        if (req.body.aname_1 && req.body.aname_2) {
            const obj = {
                name: req.body.name,
                images: [req.body.image1 ? req.body.image1 : package1.images[0], req.body.image2 ? req.body.image2 : package1.images[1], req.body.image3 ? req.body.image3 : package1.images[2], req.body.image4 ? req.body.image4 : package1.images[3], req.body.image5 ? req.body.image5 : package1.images[4]],
                location: {
                    city: req.body.city,
                    state_name: req.body.state_name
                },
                destinations_covered: destinations,
                starting_point: req.body.starting_point,
                ending_point: req.body.ending_point,
                stars: req.body.stars,
                date: req.body.selectedDate,
                details: [
                    {
                        price: req.body.price,
                        duration: "2N/3D",
                        transfer_price: req.body.transfer,
                        accommodations: [
                            {
                                name: req.body.aname,
                                nearby: req.body.nearby,
                                images: req.body.image6 ? req.body.image6 : package1.details[0].accommodations[0].images,
                                price: req.body.aprice,
                                stars: req.body.aprice,
                                acc_type: req.body.atype
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport,
                            destination_airport: req.body.dairport,
                            flightno: req.body.fno
                        }]
                    },
                    {
                        price: req.body.price_1,
                        duration: "3N/4D",
                        transfer_price: req.body.transfer_1,
                        accommodations: [
                            {
                                name: req.body.aname_1,
                                nearby: req.body.nearby_1,
                                images: req.body.image7 ? req.body.image7 : package1.details[1].accommodations[0].images,
                                price: req.body.aprice_1,
                                stars: req.body.aprice_1,
                                acc_type: req.body.atype_1
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport_1,
                            destination_airport: req.body.dairport_1,
                            flightno: req.body.fno_1
                        }]
                    },
                    {
                        price: req.body.price_2,
                        duration: "5N/6D",
                        transfer_price: req.body.transfer_2,
                        accommodations: [
                            {
                                name: req.body.aname_2,
                                nearby: req.body.nearby_2,
                                images: req.body.image8 ? req.body.image8 : package1.details[0].accommodations[0].images,
                                price: req.body.aprice_2,
                                stars: req.body.aprice_2,
                                acc_type: req.body.atype_2
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport_2,
                            destination_airport: req.body.dairport_2,
                            flightno: req.body.fno_2
                        }]
                    }
                ],
                theme_id: req.body.theme_id
            }
            console.log(obj);
            const saveImage = await PackageModel.updateOne({ _id: packageId }, obj)
            console.log(saveImage);
            return res.status(201).json({ msg: "Successfull", saveImage })
        }

        if (!req.body.aname_1 && req.body.aname_2) {
            const obj = {
                name: req.body.name,
                images: [req.body.image1 ? req.body.image1 : package1.images[0], req.body.image2 ? req.body.image2 : package1.images[1], req.body.image3 ? req.body.image3 : package1.images[2], req.body.image4 ? req.body.image4 : package1.images[3], req.body.image5 ? req.body.image5 : package1.images[4]],
                location: {
                    city: req.body.city,
                    state_name: req.body.state_name
                },
                destinations_covered: destinations,
                starting_point: req.body.starting_point,
                ending_point: req.body.ending_point,
                stars: req.body.stars,
                date: req.body.selectedDate,
                details: [
                    {
                        price: req.body.price,
                        duration: "2N/3D",
                        transfer_price: req.body.transfer,
                        accommodations: [
                            {
                                name: req.body.aname,
                                nearby: req.body.nearby,
                                images: req.body.image6path ? req.body.image6 : package1.details[0].accommodations[0].images,
                                price: req.body.aprice,
                                stars: req.body.aprice,
                                acc_type: req.body.atype
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport,
                            destination_airport: req.body.dairport,
                            flightno: req.body.fno
                        }]
                    },
                    {
                        price: req.body.price_2,
                        duration: "5N/6D",
                        transfer_price: req.body.transfer_2,
                        accommodations: [
                            {
                                name: req.body.aname_2,
                                nearby: req.body.nearby_2,
                                images: req.body.image8path ? req.body.image8 : package1.details[1].accommodations[0].images,
                                price: req.body.aprice_2,
                                stars: req.body.aprice_2,
                                acc_type: req.body.atype_2
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport_2,
                            destination_airport: req.body.dairport_2,
                            flightno: req.body.fno_2
                        }]
                    }
                ],
                theme_id: req.body.theme_id
            }
            console.log(obj);
            const saveImage = await PackageModel.updateOne({ _id: packageId }, obj)
            console.log(saveImage);
            return res.status(201).json({ msg: "Successfull", saveImage })
        }

        if (req.body.aname_1 && !req.body.aname_2) {
            const obj = {
                name: req.body.name,
                images: [req.body.image1 ? req.body.image1 : package1.images[0], req.body.image2 ? req.body.image2 : package1.images[1], req.body.image3 ? req.body.image3 : package1.images[2], req.body.image4 ? req.body.image4 : package1.images[3], req.body.image5 ? req.body.image5 : package1.images[4]],
                location: {
                    city: req.body.city,
                    state_name: req.body.state_name
                },
                destinations_covered: destinations,
                starting_point: req.body.starting_point,
                ending_point: req.body.ending_point,
                stars: req.body.stars,
                date: req.body.selectedDate,
                details: [
                    {
                        price: req.body.price,
                        duration: "2N/3D",
                        transfer_price: req.body.transfer,
                        accommodations: [
                            {
                                name: req.body.aname,
                                nearby: req.body.nearby,
                                images: req.body.image6 ? req.body.image6 : package1.details[0].accommodations[0].images,
                                price: req.body.aprice,
                                stars: req.body.aprice,
                                acc_type: req.body.atype
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport,
                            destination_airport: req.body.dairport,
                            flightno: req.body.fno
                        }]
                    },
                    {
                        price: req.body.price_1,
                        duration: "3N/4D",
                        transfer_price: req.body.transfer_1,
                        accommodations: [
                            {
                                name: req.body.aname_1,
                                nearby: req.body.nearby_1,
                                images: req.body.image7 ? req.body.image7 : package1.details[0].accommodations[0].images,
                                price: req.body.aprice_1,
                                stars: req.body.aprice_1,
                                acc_type: req.body.atype_1
                            }
                        ],
                        flights: [{
                            airport: req.body.bairport_1,
                            destination_airport: req.body.dairport_1,
                            flightno: req.body.fno_1
                        }]
                    }
                ],
                theme_id: req.body.theme_id
            }
            console.log(obj);
            const saveImage = await PackageModel.updateOne({ _id: packageId }, obj)
            console.log(saveImage);
            return res.status(201).json({ msg: "Successfull", saveImage })
        }

        return res.status(200).json({ msg: "Successfully updated" });
    } catch (error) {
        console.log(error);
    }
})

// fetch-theme1-packages/${id}
router.get("/fetch-theme-packages/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const packages = await PackageModel.find({ theme_id: id });
        return res.status(200).json({ packages })
    } catch (error) {
        console.log(error);
    }
})

// fetch-all-packages
router.get("/fetch-all-packages", async (req, res) => {
    try {
        const packages = await PackageModel.find();
        return res.status(200).json({ packages })
    } catch (error) {
        console.log(error);
    }
})

router.get("/fetch-cities", async (req, res) => {
    try {
        const packages = await PackageModel.aggregate([
            {
                $group: {
                    _id: "$location.city",
                    image: { $first: "$images" },
                    count: { $sum: 1 }
                }
            }
        ]);
        return res.status(200).json({ packages })
    } catch (error) {
        console.log(error);
    }
})

export default router;


router.get("/liked-packages/:id", async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }

        const userLikes = user.likes;
        const packages = await PackageModel.find({
            _id: { $in: userLikes }
        });
        console.log(packages);
        return res.status(200).json({packages})
    } catch (error) {
        console.log(error);
    }
})

