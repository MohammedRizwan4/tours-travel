const newPackage = new PackageModel({
    name: 'Amazing Adventure',
    images: ['uploads/package/1da9f31c-db72-48b7-b7e9-658ee15a3a0b.jpeg', 'uploads/package/1da9f31c-db72-48b7-b7e9-658ee15a3a0b.jpeg'],
    location: {
        city: 'Mumbai',
        state_name: 'Maharstra'
    },
    destinations_covered: ['Elliss Bridge', 'Riverfront'],
    starting_point: 'Santaruz',
    ending_point: 'Ahmedabad',
    stars: 4,
    date: 'Sat Apr 01 2023 16:16:42 GMT+0530 (India Standard Time)',
    details: [{
        price: 3500,
        duration: '2N/3D',
        transfer_price: 200,
        accommodations: [{
            name: 'Luxury Resort',
            nearby: 'Nehru Bridge, Lal darwaja',
            images: 'uploads/package/1da9f31c-db72-48b7-b7e9-658ee15a3a0b.jpeg',
            price: 700,
            stars: 5
        }],
        flights: [{
            airport: 'Chatrapati Shivaji airport',
            destination_airport: 'Sardar Vallabbhai airport',
            flightno: 'G8-123',
            startTime: '09:00',
            endTime: '11:30'
        }]
    }],
    theme_id: 'adventure'
});


