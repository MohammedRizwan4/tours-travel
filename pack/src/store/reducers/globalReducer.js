import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
    name: "global",
    initialState: {
        success: "",
        register: false,
        login: false,
        adult: 1,
        children: 0,
        room: 1,
        travelDetail: false,
        travellers: [{ email: "", name: "", mobile: "", gender: "", type: "adult" }],
        activeTraveller: 0,
        price: null,
        totalPrice: 0,
        goingTransfer: 1,
        returningTransfer: 1,
        goingFlight: 1,
        returningFlight: 1,
        actualPrice: 0
    },
    reducers: {
        setSuccess: (state, action) => {
            console.log(action.payload);
            state.success = action.payload;
        },
        clearMessage: (state) => {
            console.log("objectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobjectobject");
            state.success = null;
        },
        setLogin: (state, action) => {
            state.login = true;
        },
        closeLogin: (state, action) => {
            state.login = false;
        },
        setRegister: (state, action) => {
            state.register = true;
        },
        closeRegister: (state, action) => {
            state.register = false;
        },
        setAdult: (state, action) => {
            const totalGuests = state.children + state.adult + 1;
            let roomsNeeded = Math.ceil(totalGuests / 4);
            state.adult += 1;
            if (roomsNeeded > state.room) {
                state.room = roomsNeeded;
            }
        },
        decreaseAdult: (state, action) => {
            if (state.adult >= 2) {
                state.adult -= 1;
                const totalGuests = state.children + state.adult;
                let roomsNeeded = Math.ceil(totalGuests / 4);
                if (roomsNeeded < state.room) {
                    state.room = roomsNeeded;
                }
            } else {
                state.adult = 1;
            }
        },
        setChildren: (state, action) => {
            const totalGuests = state.children + state.adult + 1;
            let roomsNeeded = Math.ceil(totalGuests / 4);
            state.children += 1;
            if (roomsNeeded > state.room) {
                state.room = roomsNeeded;
            }
        },
        decreaseChildren: (state, action) => {
            if (state.children >= 1) {
                state.children -= 1;
                const totalGuests = state.children + state.adult;
                let roomsNeeded = Math.ceil(totalGuests / 4);
                if (roomsNeeded < state.room) {
                    state.room = roomsNeeded;
                }
            } else {
                state.children = 0;
            }
        },
        setRoom: (state, action) => {
            const totalGuests = state.children + state.adult + 1;
            let roomsNeeded = Math.ceil(totalGuests / 4);
            if (roomsNeeded > state.room) {
                state.room = roomsNeeded;
            } else if (roomsNeeded < state.room) {
                // reduce the number of rooms only if necessary
                const totalGuestsInPreviousRooms = (state.room - 1) * 4;
                if (totalGuests <= totalGuestsInPreviousRooms) {
                    state.room -= 1;
                }
            }
        },
        decreaseRoom: (state, action) => {
            const totalGuests = state.children + state.adult + 1;
            const roomsNeeded = Math.ceil(totalGuests / 4);
            if (state.room > 1 && roomsNeeded <= state.room - 1) {
                state.room -= 1;
            }
        },
        setTravelDetail: (state, action) => {
            state.travelDetail = true;
        },
        decreaseTravelDetail: (state, action) => {
            state.travelDetail = false;
        },
        addTravellers: (state, action) => {
            const { type } = action.payload;
            state.travellers.push({
                email: "",
                name: "",
                mobile: "",
                gender: "",
                type
            })
        },
        removeTraveller: (state, action) => {
            const { type } = action.payload;
            const index = state.travellers.findIndex((traveller) => traveller.type === type);
            const adultCount = state.travellers.filter((traveller) => traveller.type === "adult").length;
            const childrenCount = state.travellers.filter((traveller) => traveller.type === "children").length;

            if (type === "adult" && adultCount > 1) {
                if (index !== -1) {
                    state.travellers.splice(index, 1);
                }
            } else if (type === "children" && childrenCount > 0) {
                if (index !== -1) {
                    state.travellers.splice(index, 1);
                }
            }
        },
        updateTraveller: (state, action) => {
            const { index, email, name, mobile, gender } = action.payload;
            state.travellers[index].email = email;
            state.travellers[index].name = name;
            state.travellers[index].mobile = mobile;
            state.travellers[index].gender = gender;
        },
        setActiveTraveller: (state, action) => {
            const { index } = action.payload;
            state.activeTraveller = index;
        },
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        },
        setGoingTransfer: (state, action) => {
            state.goingTransfer = action.payload;
            if (action.payload === 0) {
                state.price = state.price - 200
            } else {
                state.price = state.price + 200
            }
        },
        setReturningTransfer: (state, action) => {
            state.returningTransfer = action.payload;
            if (action.payload === 0) {
                state.price = state.price - 200
            } else {
                state.price = state.price + 200
            }
        },
        setGoingFlight: (state, action) => {
            state.goingFlight = action.payload;
            if (action.payload === 0) {
                state.price = state.price - 1400
            } else {
                state.price = state.price + 1400
            }
        },
        setReturningFlight: (state, action) => {
            state.returningFlight = action.payload
            if (action.payload === 0) {
                state.price = state.price - 1400
            } else {
                state.price = state.price + 1400
            }
        },
    }
})

export const { setGoingFlight, setReturningFlight, setReturningTransfer, setGoingTransfer, setPrice, setTotalPrice, removeTraveller, setActiveTraveller, updateTraveller, addTravellers, setTravelDetail, decreaseTravelDetail, setChildren, decreaseChildren, setRoom, decreaseRoom, setAdult, decreaseAdult, setSuccess, clearMessage, setLogin, setRegister, closeLogin, closeRegister } = globalReducer.actions;

export default globalReducer.reducer;

