import React, { useEffect, useRef, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./PackageDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import {
    setIsLogin,
    setIsPackagePhoto,
} from "../../store/reducers/toggleReducer";
import Activity from "./Activity/Activity";
import DayPlan from "./DayPlan/DayPlan";
import location from "./location.jpg";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ClearIcon from "@mui/icons-material/Clear";
import FlightIcon from "@mui/icons-material/Flight";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import img1 from "../../../public/car.jpg";
import img2 from "../../../public/hotel.jpg";
import img3 from "../../../public/assets/topdestination/G8.png";
import img4 from "../../../public/assets/cardemo.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LuggageIcon from "@mui/icons-material/Luggage";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Link, useLocation, useParams } from "react-router-dom";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import {
    useUserDisLikePackageMutation,
    useUserLikePackageMutation,
} from "../../store/services/authService";
import { useGetSingleUserQuery } from "../../store/services/adminUserService";
import {
    addTravellers,
    clearMessage,
    decreaseAdult,
    decreaseChildren,
    decreaseRoom,
    removeTraveller,
    setActiveTraveller,
    setAdult,
    setChildren,
    setGoingFlight,
    setGoingTransfer,
    setLogin,
    setPrice,
    setReturningFlight,
    setReturningTransfer,
    setRoom,
    setSuccess,
    updateTraveller,
} from "../../store/reducers/globalReducer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { toast, Toaster } from "react-hot-toast";

const PackageDetail = ({ data }) => {
    const {
        price,
        totalPrice,
        goingTransfer,
        returningTransfer,
        goingFlight,
        returningFlight,
    } = useSelector((state) => state.globalReducer);

    const handleFlightRemove = (type) => {
        if (type === "starting") {
            goingFlight === 0
                ? dispatch(setGoingFlight(1))
                : dispatch(setGoingFlight(0));
        } else if (type === "ending") {
            returningFlight === 0
                ? dispatch(setReturningFlight(1))
                : dispatch(setReturningFlight(0));
        }
    };

    const handleTransferRemove = (type) => {
        if (type === "starting") {
            goingTransfer === 0
                ? dispatch(setGoingTransfer(1))
                : dispatch(setGoingTransfer(0));
        } else if (type === "ending") {
            returningTransfer === 0
                ? dispatch(setReturningTransfer(1))
                : dispatch(setReturningTransfer(0));
        }
    };

    const searchParams = new URLSearchParams(useLocation().search);
    const { id: packId } = useParams();
    const myParam = searchParams.get("myParams");
    const skipDays = parseInt(myParam) - 1;
    console.log(skipDays);
    const days = myParam?.slice(-2, -1);

    const singleDetail = data.details.find(
        (detail) => detail.duration === myParam
    );

    const myArray = Array.from(
        { length: parseInt(days) },
        (_, index) => index + 1
    );

    const daysArray = Array.from(
        { length: parseInt(skipDays) },
        (_, index) => index + 1
    );

    const startDate = new Date(data?.date); // First date
    const endDate = new Date(
        startDate.getTime() + (myArray.length - 1) * 24 * 60 * 60 * 1000
    ); // Last date

    const firstDate = `${startDate.getDate()} ${getMonthName(
        startDate.getMonth()
    )}`; // Format the first date as "DD Month"
    const lastDate = `${endDate.getDate()} ${getMonthName(endDate.getMonth())}`; // Format the last date as "DD Month"

    const firstDateWhole = startDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    }); // Format the first date as "ddd Mon DD"
    const lastDateWhole = endDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    }); // Format the last date as "ddd Mon DD"

    function getMonthName(monthIndex) {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return monthNames[monthIndex];
    }

    const { adult, children, room } = useSelector((state) => state.globalReducer);
    const adultPrice = price; // actual price for adults
    const childPrice = price * 0.85; // actual price minus 15% for children
    const totalPrice1 = (adultPrice * adult) + (childPrice * children)
    console.log({ price });

    useEffect(() => {
        if (data && myParam) {
            let price1 = data?.details?.find(
                (detail) => detail.duration === myParam
            )?.price;
            price1 = price1 - (price1 * 4) / 100;
            console.log("price: ", price1);
            dispatch(setPrice(price === null ? price1 : price));
        }
    }, [data, myParam]);

    const { user } = useSelector((state) => state.authReducer);
    const { travellers } = useSelector((state) => state.globalReducer);

    const { data: userData, isFetching } = useGetSingleUserQuery(user?.id);
    const [like, setLike] = useState(false);

    useEffect(() => {
        setLike(userData?.user[0]?.likes?.includes(packId));
    }, [userData]);

    console.log(userData);

    const [likePackage, response] = useUserLikePackageMutation();
    const [dislikePackage, response1] = useUserDisLikePackageMutation();

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(setSuccess("Package Liked Successfully"));
    }, [response]);

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(setSuccess("Package DisLiked Successfully"));
    }, [response1]);


    const [photosSelect, setPhotosSelect] = useState(1);
    const [singlePhoto, setSinglePhoto] = useState(0);

    const [options, setOptions] = useState(1);
    const [itineraryOptions, setItineraryOptions] = useState(1);

    const [dayPlan, setDayPlan] = useState(0);

    console.log(
        "hellllooooooooooooooooooo",
        userData?.user[0]?.likes?.includes(packId)
    );
    console.log(like);
    const { isPackagePhoto } = useSelector((state) => state.toggleReducer);
    const dispatch = useDispatch();

    const Itinerary = () => {
        return (
            <div className="itinerary">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
                    doloribus! Enim aspernatur fugit, tempore labore vel adipisci aliquam
                    officia fugiat, error iste quaerat?
                </p>
            </div>
        );
    };

    const [arrow, setArrow] = useState(0);
    const [menu, setMenu] = useState(1);

    return createPortal(
        <Section
            menu={menu}
            isPackagePhoto={isPackagePhoto}
            singlePhoto={singlePhoto}
            itineraryOptions={itineraryOptions}
            dayPlan={dayPlan}
        >
            <div className="mainPackage">
                <div className="mainDiv">
                    <div className="header">
                        <div className="left">
                            <div className="package">
                                <h3>{data?.name}</h3>
                                <div className="info">
                                    <div className="timeLimit">{myParam}</div>
                                    <div className="flexPackage">Flexi Package</div>
                                    <div className="timeCity">
                                        {myParam?.slice(0, 2)} {data.ending_point}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="stars">
                                {Array.from({ length: data?.stars }, (_, i) => (
                                    <StarIcon
                                        style={{
                                            fontSize: "var(--r1-5)",
                                            color: "var(--starColor)",
                                        }}
                                    />
                                ))}
                            </div>
                            {like ? (
                                <FavoriteIcon
                                    onClick={() => {
                                        const id = user.id;
                                        dislikePackage({ id, packId });
                                        setLike(!like);
                                    }}
                                    className="icon"
                                />
                            ) : (
                                <FavoriteBorderIcon
                                    className="icon"
                                    onClick={() => {
                                        if (user) {
                                            const id = user.id;
                                            likePackage({ id, packId });
                                            setLike(!like);
                                        } else {
                                            dispatch(setLogin());
                                        }
                                    }}
                                />
                            )}
                            <ShareIcon className="icon" />
                            <button className="bookingTitle">Book Now</button>
                        </div>
                    </div>
                    <div
                        className="images"
                        // style={{ width: chatWidth }}
                        onClick={() => dispatch(setIsPackagePhoto(true))}
                    >
                        {console.log(data)}
                        {Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className={`image${index + 1}`}>
                                <img
                                    src={`http://localhost:7800/${data?.images[index]}`}
                                    alt="image1"
                                    className="image"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="menu">
                        <div
                            className="singleTitle"
                            style={{
                                borderBottom: options === 1 ? ".4rem solid #008cff" : "0",
                            }}
                            onClick={() => setOptions(1)}
                        >
                            Itinerary
                        </div>
                        <div
                            className="singleTitle"
                            style={{
                                borderBottom: options === 2 ? ".4rem solid #008cff" : "0",
                            }}
                            onClick={() => setOptions(2)}
                        >
                            Policies
                        </div>
                        <div
                            className="singleTitle"
                            style={{
                                borderBottom: options === 3 ? ".4rem solid #008cff" : "0",
                            }}
                            onClick={() => setOptions(3)}
                        >
                            Summary
                        </div>
                    </div>
                </div>
                <div className="restWholeDiv">
                    <div className="restDiv" id="menu-bar">
                        {options === 1 && (
                            <div className="itinerary">
                                <div className="menu">
                                    <div className="item" onClick={() => setItineraryOptions(1)}>
                                        <div
                                            className="roll"
                                            style={{
                                                backgroundColor:
                                                    itineraryOptions === 1 ? "white" : "#ecf7ff",
                                                border:
                                                    itineraryOptions === 1 ? "1px solid #35a8ff" : "none",
                                                color: itineraryOptions === 1 ? "#0a8cff" : "black",
                                                fontWeight: itineraryOptions === 1 ? "500" : "100",
                                            }}
                                        >
                                            <span
                                                style={{ fontWeight: itineraryOptions ? "500" : "100" }}
                                            >
                                                {parseInt(myParam?.slice(0, 1)) + 1}
                                            </span>
                                            <h1
                                                style={{
                                                    fontWeight: itineraryOptions === 1 ? "900" : "100",
                                                }}
                                            >
                                                day plan
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="item" onClick={() => setItineraryOptions(2)}>
                                        <div
                                            className="roll"
                                            style={{
                                                backgroundColor:
                                                    itineraryOptions === 2 ? "white" : "#ecf7ff",
                                                border:
                                                    itineraryOptions === 2 ? "1px solid #35a8ff" : "none",
                                                color: itineraryOptions === 2 ? "#0a8cff" : "black",
                                                fontWeight: itineraryOptions === 2 ? "500" : "100",
                                            }}
                                        >
                                            <span
                                                style={{ fontWeight: itineraryOptions ? "500" : "100" }}
                                            >
                                                1
                                            </span>
                                            <h1
                                                style={{
                                                    fontWeight: itineraryOptions === 2 ? "900" : "100",
                                                }}
                                            >
                                                Hotel
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="item" onClick={() => setItineraryOptions(3)}>
                                        <div
                                            className="roll"
                                            style={{
                                                backgroundColor:
                                                    itineraryOptions === 3 ? "white" : "#ecf7ff",
                                                border:
                                                    itineraryOptions === 3 ? "1px solid #35a8ff" : "none",
                                                color: itineraryOptions === 3 ? "#0a8cff" : "black",
                                                fontWeight: itineraryOptions === 3 ? "500" : "100",
                                            }}
                                        >
                                            <span
                                                style={{ fontWeight: itineraryOptions ? "500" : "100" }}
                                            >
                                                3
                                            </span>
                                            <h1
                                                style={{
                                                    fontWeight: itineraryOptions === 3 ? "900" : "100",
                                                }}
                                            >
                                                Activity
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="item" onClick={() => setItineraryOptions(4)}>
                                        <div
                                            className="roll"
                                            style={{
                                                backgroundColor:
                                                    itineraryOptions === 4 ? "white" : "#ecf7ff",
                                                border:
                                                    itineraryOptions === 4 ? "1px solid #35a8ff" : "none",
                                                color: itineraryOptions === 4 ? "#0a8cff" : "black",
                                                fontWeight: itineraryOptions === 4 ? "500" : "100",
                                            }}
                                        >
                                            <span
                                                style={{ fontWeight: itineraryOptions ? "500" : "100" }}
                                            >
                                                {goingTransfer + returningTransfer == 0
                                                    ? "No"
                                                    : goingTransfer + returningTransfer}
                                            </span>
                                            <h1
                                                style={{
                                                    fontWeight: itineraryOptions === 4 ? "900" : "100",
                                                }}
                                            >
                                                Transfers
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="item" onClick={() => setItineraryOptions(5)}>
                                        <div
                                            className="roll"
                                            style={{
                                                backgroundColor:
                                                    itineraryOptions === 5 ? "white" : "#ecf7ff",
                                                border:
                                                    itineraryOptions === 5 ? "1px solid #35a8ff" : "none",
                                                color: itineraryOptions === 5 ? "#0a8cff" : "black",
                                                fontWeight: itineraryOptions === 5 ? "500" : "100",
                                            }}
                                        >
                                            <span
                                                style={{ fontWeight: itineraryOptions ? "500" : "100" }}
                                            >
                                                {goingFlight + returningFlight == 0
                                                    ? "No"
                                                    : goingFlight + returningFlight}
                                            </span>
                                            <h1
                                                style={{
                                                    fontWeight: itineraryOptions === 5 ? "900" : "100",
                                                }}
                                            >
                                                Flights
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {options === 1 && (
                            <div className="dayPlanDetails">
                                <div className="left">
                                    <h1>Day Plan</h1>
                                    <div className="box">
                                        {myArray.map((data1, index) => {
                                            const date = new Date(data?.date);
                                            date?.setDate(date.getDate() + index);
                                            return (
                                                <div className="item">
                                                    <ul>
                                                        <li
                                                            onClick={() => setDayPlan(index)}
                                                            style={{
                                                                backgroundColor:
                                                                    dayPlan === index
                                                                        ? "rgb(74, 74, 74)"
                                                                        : "white",
                                                                color:
                                                                    dayPlan === index
                                                                        ? "white"
                                                                        : "rgb(74, 74, 74)",
                                                            }}
                                                        >
                                                            {date.toDateString().slice(0, 10)}
                                                        </li>
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="right">
                                    {itineraryOptions === 1 && (
                                        <>
                                            <div className="title">
                                                <div className="left1">
                                                    <h1>
                                                        Day 1 - Arrival in {data.starting_point} -{" "}
                                                        {singleDetail?.flights[0]?.airport}
                                                    </h1>
                                                </div>
                                                <div className="right1">
                                                    <div className="item">INCLUDED</div>
                                                    <div className="item">
                                                        <FlightIcon />
                                                        <span>
                                                            {goingFlight + returningFlight == 0
                                                                ? "No"
                                                                : goingFlight + returningFlight}{" "}
                                                            Flights
                                                        </span>
                                                    </div>
                                                    <h2>|</h2>
                                                    <div className="item">
                                                        <HouseSidingIcon />
                                                        <span>1 Hotel</span>
                                                    </div>
                                                    <h2>|</h2>
                                                    <div className="item">
                                                        <TimeToLeaveIcon />
                                                        <span>
                                                            {goingTransfer + returningTransfer == 0
                                                                ? "No"
                                                                : goingTransfer + returningTransfer}{" "}
                                                            Transfer
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {goingFlight ? (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.starting_point} to{" "}
                                                                {data.location.city} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("starting")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content2">
                                                        <div className="left2">
                                                            <div className="image">
                                                                <img src={img3} alt="" />
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].flightno}
                                                                </label>
                                                            </div>
                                                            <div className="contentLeft">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].startTime}
                                                                </label>
                                                                <h4>{firstDateWhole}</h4>
                                                                <h5>{data.starting_point}</h5>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="contentRight">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].endTime}
                                                                </label>
                                                                <h4>{firstDateWhole}</h4>
                                                                <h5>
                                                                    {data.location.city} -{" "}
                                                                    {data.details[0].flights[0].airport}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="right2">
                                                            <h1>Private Transfer</h1>
                                                            <div className="downContent">
                                                                <div className="item">
                                                                    <ShoppingBagIcon className="icon" />
                                                                    <span>Cabin: </span>
                                                                    <h4>7 Kgs ( 1 peice only )</h4>
                                                                </div>
                                                                <div className="item">
                                                                    <LuggageIcon className="icon" />
                                                                    <span>Check In: </span>
                                                                    <h4>15 Kg</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.starting_point} to{" "}
                                                                {data.location.city} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("starting")}
                                                            >
                                                                Add Flight
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <hr />
                                            {goingTransfer ? (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Airport to hotel in{" "}
                                                                {data.ending_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("starting")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <div className="left">
                                                            <img src={img4} alt="" />
                                                        </div>
                                                        <div className="right">
                                                            <h1>Private Transfer</h1>
                                                            <p>
                                                                Travel comfortably in a private vehicle from Goa
                                                                Airport to your hotel in Goa. Note: The pick-up
                                                                timing is subject to your flight arrival and
                                                                shall be communicated to you by the local
                                                                vendor. There will be non stop-overs allowed
                                                                during this transfer
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Airport to hotel in{" "}
                                                                {data.ending_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("starting")}
                                                            >
                                                                Add transfer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <hr />
                                            <div className="car1">
                                                <div className="title">
                                                    <div className="east">
                                                        <h1>
                                                            Check-in to Hotel in {data.ending_point} @ 2 PM
                                                        </h1>
                                                    </div>
                                                    <div className="west">
                                                        <button>Change</button>
                                                    </div>
                                                </div>
                                                <div className="content1">
                                                    <div className="left">
                                                        <img src={img2} alt="" />
                                                    </div>
                                                    <div className="south">
                                                        <div className="label">Resort</div>
                                                        <h1>Evoke Lifestyle Candolim</h1>
                                                        <h3>North Pattaya</h3>
                                                        <p>120 m from Pattaya Beach</p>
                                                        <div className="date">
                                                            <CalendarTodayIcon
                                                                style={{ fontSize: "1.3rem" }}
                                                            />
                                                            <p>Thu, 30 Mar 2023 - Mon, 3 Apr 2023</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="endofday">
                                                <div className="content">
                                                    <span> End Of Day - &nbsp;</span> Spend time at
                                                    Leisure or add an activity to your day
                                                </div>
                                            </div>
                                            {daysArray.map((day, index) => {
                                                return (
                                                    <>
                                                        <div className="title">
                                                            <div className="left1">
                                                                <h1>Day {index + 2} - Arrival in Agra</h1>
                                                            </div>
                                                        </div>
                                                        <div className="daymeal">
                                                            <div className="east">
                                                                <RestaurantIcon className="icon" />
                                                                <span>Day Meals</span>
                                                            </div>
                                                            <div className="west">
                                                                {/* <CheckIcon className="icon"/> */}
                                                                <span>Breakfast: </span>
                                                                <p>
                                                                    {" "}
                                                                    Included at{" "}
                                                                    {data.details?.map((detail, index) => {
                                                                        return detail.duration === myParam
                                                                            ? data.details[index].accommodations[0]
                                                                                .name
                                                                            : "";
                                                                    })}{" "}
                                                                    , {data.ending_point}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="endofday">
                                                            <div className="content">
                                                                <span> End Of Day - &nbsp;</span> Spend time at
                                                                Leisure or add an activity to your day
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                            {returningTransfer ? (
                                                <>
                                                    <div className="title">
                                                        <div className="left1">
                                                            <h1>Day {myArray.length} - Arrival in Agra</h1>
                                                        </div>
                                                    </div>
                                                    <div className="car">
                                                        <div className="title">
                                                            <div className="east">
                                                                <h1>
                                                                    Transfer from Hotel to Airport in{" "}
                                                                    {data.starting_point} - 30 minutes
                                                                </h1>
                                                            </div>
                                                            <div className="west">
                                                                <button
                                                                    onClick={() => handleTransferRemove("ending")}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="content">
                                                            <div className="left">
                                                                <img src={img1} alt="" />
                                                            </div>
                                                            <div className="right">
                                                                <h1>Private Transfer</h1>
                                                                <p>
                                                                    Travel comfortably in a private vehicle from Goa
                                                                    Airport to your hotel in Goa. Note: The pick-up
                                                                    timing is subject to your flight arrival and
                                                                    shall be communicated to you by the local
                                                                    vendor. There will be non stop-overs allowed
                                                                    during this transfer
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Hotel to Airport in{" "}
                                                                {data.starting_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("ending")}
                                                            >
                                                                Add Transfer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {returningFlight ? (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.location.city} to{" "}
                                                                {data.starting_point} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("ending")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content2">
                                                        <div className="left2">
                                                            <div className="image">
                                                                <img src={img3} alt="" />
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].flightno}
                                                                </label>
                                                            </div>
                                                            <div className="contentLeft">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].startTime}
                                                                </label>
                                                                <h4>{lastDateWhole}</h4>
                                                                <h5>{data.location.city}</h5>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="contentRight">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].endTime}
                                                                </label>
                                                                <h4>{lastDateWhole}</h4>
                                                                <h5>
                                                                    {data.starting_point} -{" "}
                                                                    {
                                                                        data.details[0].flights[0]
                                                                            .destination_airport
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="right2">
                                                            <h1>Private Transfer</h1>
                                                            <div className="downContent">
                                                                <div className="item">
                                                                    <ShoppingBagIcon className="icon" />
                                                                    <span>Cabin: </span>
                                                                    <h4>7 Kgs ( 1 peice only )</h4>
                                                                </div>
                                                                <div className="item">
                                                                    <LuggageIcon className="icon" />
                                                                    <span>Check In: </span>
                                                                    <h4>15 Kg</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.location.city} to{" "}
                                                                {data.starting_point} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("ending")}
                                                            >
                                                                Add Flight
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="endofday">
                                                <div className="content">
                                                    <span> End Of Day - &nbsp;</span> Spend time at
                                                    Leisure or add an activity to your day
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {itineraryOptions === 2 && (
                                        <>
                                            <div className="car1">
                                                <div className="title">
                                                    <div className="east">
                                                        <h1>
                                                            Check-in to Hotel in {data.ending_point} @ 2 PM
                                                        </h1>
                                                    </div>
                                                    <div className="west">
                                                        <button>Change</button>
                                                    </div>
                                                </div>
                                                <div className="content1">
                                                    <div className="left">
                                                        <img src={img2} alt="" />
                                                    </div>
                                                    <div className="south">
                                                        <div className="label">Resort</div>
                                                        <h1>Evoke Lifestyle Candolim</h1>
                                                        <h3>North Pattaya</h3>
                                                        <p>120 m from Pattaya Beach</p>
                                                        <div className="date">
                                                            <CalendarTodayIcon
                                                                style={{ fontSize: "1.3rem" }}
                                                            />
                                                            <p>Thu, 30 Mar 2023 - Mon, 3 Apr 2023</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {itineraryOptions == 4 && (
                                        <>
                                            {goingTransfer ? (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Airport to hotel in{" "}
                                                                {data.ending_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("starting")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <div className="left">
                                                            <img src={img4} alt="" />
                                                        </div>
                                                        <div className="right">
                                                            <h1>Private Transfer</h1>
                                                            <p>
                                                                Travel comfortably in a private vehicle from Goa
                                                                Airport to your hotel in Goa. Note: The pick-up
                                                                timing is subject to your flight arrival and
                                                                shall be communicated to you by the local
                                                                vendor. There will be non stop-overs allowed
                                                                during this transfer
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Airport to hotel in{" "}
                                                                {data.ending_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("starting")}
                                                            >
                                                                Add transfer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {returningTransfer ? (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Hotel to Airport in{" "}
                                                                {data.starting_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("ending")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <div className="left">
                                                            <img src={img1} alt="" />
                                                        </div>
                                                        <div className="right">
                                                            <h1>Private Transfer</h1>
                                                            <p>
                                                                Travel comfortably in a private vehicle from Goa
                                                                Airport to your hotel in Goa. Note: The pick-up
                                                                timing is subject to your flight arrival and
                                                                shall be communicated to you by the local
                                                                vendor. There will be non stop-overs allowed
                                                                during this transfer
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Hotel to Airport in{" "}
                                                                {data.starting_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("ending")}
                                                            >
                                                                Add Transfer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {itineraryOptions === 5 && (
                                        <>
                                            {goingFlight ? (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.starting_point} to{" "}
                                                                {data.location.city} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("starting")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content2">
                                                        <div className="left2">
                                                            <div className="image">
                                                                <img src={img3} alt="" />
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].flightno}
                                                                </label>
                                                            </div>
                                                            <div className="contentLeft">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].startTime}
                                                                </label>
                                                                <h4>{firstDateWhole}</h4>
                                                                <h5>{data.starting_point}</h5>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="contentRight">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].endTime}
                                                                </label>
                                                                <h4>{firstDateWhole}</h4>
                                                                <h5>
                                                                    {data.location.city} -{" "}
                                                                    {data.details[0].flights[0].airport}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="right2">
                                                            <h1>Private Transfer</h1>
                                                            <div className="downContent">
                                                                <div className="item">
                                                                    <ShoppingBagIcon className="icon" />
                                                                    <span>Cabin: </span>
                                                                    <h4>7 Kgs ( 1 peice only )</h4>
                                                                </div>
                                                                <div className="item">
                                                                    <LuggageIcon className="icon" />
                                                                    <span>Check In: </span>
                                                                    <h4>15 Kg</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.starting_point} to{" "}
                                                                {data.location.city} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("starting")}
                                                            >
                                                                Add Flight
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {returningFlight ? (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.location.city} to{" "}
                                                                {data.starting_point} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("ending")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content2">
                                                        <div className="left2">
                                                            <div className="image">
                                                                <img src={img3} alt="" />
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].flightno}
                                                                </label>
                                                            </div>
                                                            <div className="contentLeft">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].startTime}
                                                                </label>
                                                                <h4>{lastDateWhole}</h4>
                                                                <h5>{data.location.city}</h5>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="contentRight">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].endTime}
                                                                </label>
                                                                <h4>{lastDateWhole}</h4>
                                                                <h5>
                                                                    {data.starting_point} -{" "}
                                                                    {
                                                                        data.details[0].flights[0]
                                                                            .destination_airport
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="right2">
                                                            <h1>Private Transfer</h1>
                                                            <div className="downContent">
                                                                <div className="item">
                                                                    <ShoppingBagIcon className="icon" />
                                                                    <span>Cabin: </span>
                                                                    <h4>7 Kgs ( 1 peice only )</h4>
                                                                </div>
                                                                <div className="item">
                                                                    <LuggageIcon className="icon" />
                                                                    <span>Check In: </span>
                                                                    <h4>15 Kg</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.location.city} to{" "}
                                                                {data.starting_point} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("ending")}
                                                            >
                                                                Add Flight
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        {options === 3 && (
                            <div className="dayPlanDetails">
                                <div className="left">
                                    <h1>Day Plan</h1>
                                    <div className="box">
                                        {myArray.map((data1, index) => {
                                            const date = new Date(data?.date);
                                            date?.setDate(date.getDate() + index);
                                            return (
                                                <div className="item">
                                                    <ul>
                                                        <li
                                                            onClick={() => setDayPlan(index)}
                                                            style={{
                                                                backgroundColor:
                                                                    dayPlan === index
                                                                        ? "rgb(74, 74, 74)"
                                                                        : "white",
                                                                color:
                                                                    dayPlan === index
                                                                        ? "white"
                                                                        : "rgb(74, 74, 74)",
                                                            }}
                                                        >
                                                            {date.toDateString().slice(0, 10)}
                                                        </li>
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="right">
                                    {itineraryOptions === 1 && (
                                        <>
                                            <div className="title">
                                                <div className="left1">
                                                    <h1>
                                                        Day 1 - Arrival in {data.starting_point} -{" "}
                                                        {singleDetail?.flights[0]?.airport}
                                                    </h1>
                                                </div>
                                                <div className="right1">
                                                    <div className="item">INCLUDED</div>
                                                    <div className="item">
                                                        <FlightIcon />
                                                        <span>
                                                            {goingFlight + returningFlight == 0
                                                                ? "No"
                                                                : goingFlight + returningFlight}{" "}
                                                            Flights
                                                        </span>
                                                    </div>
                                                    <h2>|</h2>
                                                    <div className="item">
                                                        <HouseSidingIcon />
                                                        <span>1 Hotel</span>
                                                    </div>
                                                    <h2>|</h2>
                                                    <div className="item">
                                                        <TimeToLeaveIcon />
                                                        <span>
                                                            {goingTransfer + returningTransfer == 0
                                                                ? "No"
                                                                : goingTransfer + returningTransfer}{" "}
                                                            Transfer
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {goingFlight ? (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.starting_point} to{" "}
                                                                {data.location.city} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("starting")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content2">
                                                        <div className="left2">
                                                            <div className="image">
                                                                <img src={img3} alt="" />
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].flightno}
                                                                </label>
                                                            </div>
                                                            <div className="contentLeft">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].startTime}
                                                                </label>
                                                                <h4>{firstDateWhole}</h4>
                                                                <h5>{data.starting_point}</h5>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="contentRight">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].endTime}
                                                                </label>
                                                                <h4>{firstDateWhole}</h4>
                                                                <h5>
                                                                    {data.location.city} -{" "}
                                                                    {data.details[0].flights[0].airport}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="right2">
                                                            <h1>Private Transfer</h1>
                                                            <div className="downContent">
                                                                <div className="item">
                                                                    <ShoppingBagIcon className="icon" />
                                                                    <span>Cabin: </span>
                                                                    <h4>7 Kgs ( 1 peice only )</h4>
                                                                </div>
                                                                <div className="item">
                                                                    <LuggageIcon className="icon" />
                                                                    <span>Check In: </span>
                                                                    <h4>15 Kg</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.starting_point} to{" "}
                                                                {data.location.city} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("starting")}
                                                            >
                                                                Add Flight
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <hr />
                                            {goingTransfer ? (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Airport to hotel in{" "}
                                                                {data.ending_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("starting")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <div className="left">
                                                            <img src={img4} alt="" />
                                                        </div>
                                                        <div className="right">
                                                            <h1>Private Transfer</h1>
                                                            <p>
                                                                Travel comfortably in a private vehicle from Goa
                                                                Airport to your hotel in Goa. Note: The pick-up
                                                                timing is subject to your flight arrival and
                                                                shall be communicated to you by the local
                                                                vendor. There will be non stop-overs allowed
                                                                during this transfer
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Airport to hotel in{" "}
                                                                {data.ending_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("starting")}
                                                            >
                                                                Add transfer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <hr />
                                            <div className="car1">
                                                <div className="title">
                                                    <div className="east">
                                                        <h1>
                                                            Check-in to Hotel in {data.ending_point} @ 2 PM
                                                        </h1>
                                                    </div>
                                                    <div className="west">
                                                        <button>Change</button>
                                                    </div>
                                                </div>
                                                <div className="content1">
                                                    <div className="left">
                                                        <img src={img2} alt="" />
                                                    </div>
                                                    <div className="south">
                                                        <div className="label">Resort</div>
                                                        <h1>Evoke Lifestyle Candolim</h1>
                                                        <h3>North Pattaya</h3>
                                                        <p>120 m from Pattaya Beach</p>
                                                        <div className="date">
                                                            <CalendarTodayIcon
                                                                style={{ fontSize: "1.3rem" }}
                                                            />
                                                            <p>Thu, 30 Mar 2023 - Mon, 3 Apr 2023</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="endofday">
                                                <div className="content">
                                                    <span> End Of Day - &nbsp;</span> Spend time at
                                                    Leisure or add an activity to your day
                                                </div>
                                            </div>
                                            {daysArray.map((day, index) => {
                                                return (
                                                    <>
                                                        <div className="title">
                                                            <div className="left1">
                                                                <h1>Day {index + 2} - Arrival in Agra</h1>
                                                            </div>
                                                        </div>
                                                        <div className="daymeal">
                                                            <div className="east">
                                                                <RestaurantIcon className="icon" />
                                                                <span>Day Meals</span>
                                                            </div>
                                                            <div className="west">
                                                                {/* <CheckIcon className="icon"/> */}
                                                                <span>Breakfast: </span>
                                                                <p>
                                                                    {" "}
                                                                    Included at{" "}
                                                                    {data.details?.map((detail, index) => {
                                                                        return detail.duration === myParam
                                                                            ? data.details[index].accommodations[0]
                                                                                .name
                                                                            : "";
                                                                    })}{" "}
                                                                    , {data.ending_point}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="endofday">
                                                            <div className="content">
                                                                <span> End Of Day - &nbsp;</span> Spend time at
                                                                Leisure or add an activity to your day
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                            {returningTransfer ? (
                                                <>
                                                    <div className="title">
                                                        <div className="left1">
                                                            <h1>Day {myArray.length} - Arrival in Agra</h1>
                                                        </div>
                                                    </div>
                                                    <div className="car">
                                                        <div className="title">
                                                            <div className="east">
                                                                <h1>
                                                                    Transfer from Hotel to Airport in{" "}
                                                                    {data.starting_point} - 30 minutes
                                                                </h1>
                                                            </div>
                                                            <div className="west">
                                                                <button
                                                                    onClick={() => handleTransferRemove("ending")}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="content">
                                                            <div className="left">
                                                                <img src={img1} alt="" />
                                                            </div>
                                                            <div className="right">
                                                                <h1>Private Transfer</h1>
                                                                <p>
                                                                    Travel comfortably in a private vehicle from Goa
                                                                    Airport to your hotel in Goa. Note: The pick-up
                                                                    timing is subject to your flight arrival and
                                                                    shall be communicated to you by the local
                                                                    vendor. There will be non stop-overs allowed
                                                                    during this transfer
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Hotel to Airport in{" "}
                                                                {data.starting_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("ending")}
                                                            >
                                                                Add Transfer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {returningFlight ? (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.location.city} to{" "}
                                                                {data.starting_point} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("ending")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content2">
                                                        <div className="left2">
                                                            <div className="image">
                                                                <img src={img3} alt="" />
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].flightno}
                                                                </label>
                                                            </div>
                                                            <div className="contentLeft">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].startTime}
                                                                </label>
                                                                <h4>{lastDateWhole}</h4>
                                                                <h5>{data.location.city}</h5>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="contentRight">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].endTime}
                                                                </label>
                                                                <h4>{lastDateWhole}</h4>
                                                                <h5>
                                                                    {data.starting_point} -{" "}
                                                                    {
                                                                        data.details[0].flights[0]
                                                                            .destination_airport
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="right2">
                                                            <h1>Private Transfer</h1>
                                                            <div className="downContent">
                                                                <div className="item">
                                                                    <ShoppingBagIcon className="icon" />
                                                                    <span>Cabin: </span>
                                                                    <h4>7 Kgs ( 1 peice only )</h4>
                                                                </div>
                                                                <div className="item">
                                                                    <LuggageIcon className="icon" />
                                                                    <span>Check In: </span>
                                                                    <h4>15 Kg</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.location.city} to{" "}
                                                                {data.starting_point} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("ending")}
                                                            >
                                                                Add Flight
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="endofday">
                                                <div className="content">
                                                    <span> End Of Day - &nbsp;</span> Spend time at
                                                    Leisure or add an activity to your day
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {itineraryOptions === 2 && (
                                        <>
                                            <div className="car1">
                                                <div className="title">
                                                    <div className="east">
                                                        <h1>
                                                            Check-in to Hotel in {data.ending_point} @ 2 PM
                                                        </h1>
                                                    </div>
                                                    <div className="west">
                                                        <button>Change</button>
                                                    </div>
                                                </div>
                                                <div className="content1">
                                                    <div className="left">
                                                        <img src={img2} alt="" />
                                                    </div>
                                                    <div className="south">
                                                        <div className="label">Resort</div>
                                                        <h1>Evoke Lifestyle Candolim</h1>
                                                        <h3>North Pattaya</h3>
                                                        <p>120 m from Pattaya Beach</p>
                                                        <div className="date">
                                                            <CalendarTodayIcon
                                                                style={{ fontSize: "1.3rem" }}
                                                            />
                                                            <p>Thu, 30 Mar 2023 - Mon, 3 Apr 2023</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {itineraryOptions == 4 && (
                                        <>
                                            {goingTransfer ? (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Airport to hotel in{" "}
                                                                {data.ending_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("starting")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <div className="left">
                                                            <img src={img4} alt="" />
                                                        </div>
                                                        <div className="right">
                                                            <h1>Private Transfer</h1>
                                                            <p>
                                                                Travel comfortably in a private vehicle from Goa
                                                                Airport to your hotel in Goa. Note: The pick-up
                                                                timing is subject to your flight arrival and
                                                                shall be communicated to you by the local
                                                                vendor. There will be non stop-overs allowed
                                                                during this transfer
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Airport to hotel in{" "}
                                                                {data.ending_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("starting")}
                                                            >
                                                                Add transfer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {returningTransfer ? (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Hotel to Airport in{" "}
                                                                {data.starting_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("ending")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <div className="left">
                                                            <img src={img1} alt="" />
                                                        </div>
                                                        <div className="right">
                                                            <h1>Private Transfer</h1>
                                                            <p>
                                                                Travel comfortably in a private vehicle from Goa
                                                                Airport to your hotel in Goa. Note: The pick-up
                                                                timing is subject to your flight arrival and
                                                                shall be communicated to you by the local
                                                                vendor. There will be non stop-overs allowed
                                                                during this transfer
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car">
                                                    <div className="title">
                                                        <div className="east">
                                                            <h1>
                                                                Transfer from Hotel to Airport in{" "}
                                                                {data.starting_point} - 30 minutes
                                                            </h1>
                                                        </div>
                                                        <div className="west">
                                                            <button
                                                                onClick={() => handleTransferRemove("ending")}
                                                            >
                                                                Add Transfer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {itineraryOptions === 5 && (
                                        <>
                                            {goingFlight ? (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.starting_point} to{" "}
                                                                {data.location.city} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("starting")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content2">
                                                        <div className="left2">
                                                            <div className="image">
                                                                <img src={img3} alt="" />
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].flightno}
                                                                </label>
                                                            </div>
                                                            <div className="contentLeft">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].startTime}
                                                                </label>
                                                                <h4>{firstDateWhole}</h4>
                                                                <h5>{data.starting_point}</h5>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="contentRight">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].endTime}
                                                                </label>
                                                                <h4>{firstDateWhole}</h4>
                                                                <h5>
                                                                    {data.location.city} -{" "}
                                                                    {data.details[0].flights[0].airport}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="right2">
                                                            <h1>Private Transfer</h1>
                                                            <div className="downContent">
                                                                <div className="item">
                                                                    <ShoppingBagIcon className="icon" />
                                                                    <span>Cabin: </span>
                                                                    <h4>7 Kgs ( 1 peice only )</h4>
                                                                </div>
                                                                <div className="item">
                                                                    <LuggageIcon className="icon" />
                                                                    <span>Check In: </span>
                                                                    <h4>15 Kg</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.starting_point} to{" "}
                                                                {data.location.city} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("starting")}
                                                            >
                                                                Add Flight
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {returningFlight ? (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.location.city} to{" "}
                                                                {data.starting_point} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("ending")}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="content2">
                                                        <div className="left2">
                                                            <div className="image">
                                                                <img src={img3} alt="" />
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].flightno}
                                                                </label>
                                                            </div>
                                                            <div className="contentLeft">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].startTime}
                                                                </label>
                                                                <h4>{lastDateWhole}</h4>
                                                                <h5>{data.location.city}</h5>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="contentRight">
                                                                <label htmlFor="">
                                                                    {singleDetail?.flights[0].endTime}
                                                                </label>
                                                                <h4>{lastDateWhole}</h4>
                                                                <h5>
                                                                    {data.starting_point} -{" "}
                                                                    {
                                                                        data.details[0].flights[0]
                                                                            .destination_airport
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="right2">
                                                            <h1>Private Transfer</h1>
                                                            <div className="downContent">
                                                                <div className="item">
                                                                    <ShoppingBagIcon className="icon" />
                                                                    <span>Cabin: </span>
                                                                    <h4>7 Kgs ( 1 peice only )</h4>
                                                                </div>
                                                                <div className="item">
                                                                    <LuggageIcon className="icon" />
                                                                    <span>Check In: </span>
                                                                    <h4>15 Kg</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="car2">
                                                    <div className="title2">
                                                        <div className="east2">
                                                            <h1>
                                                                Flight from {data.location.city} to{" "}
                                                                {data.starting_point} -{" "}
                                                                {singleDetail?.flights[0].airport} 02h 45m
                                                            </h1>
                                                        </div>
                                                        <div className="west2">
                                                            <button
                                                                onClick={() => handleFlightRemove("ending")}
                                                            >
                                                                Add Flight
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {options === 1 && <div className="secondSection">
                        <div className="newWholeDiv">
                            <div className="firstDiv">
                                <div className="leftclass">
                                    <h5>
                                        ₹
                                        {
                                            data.details.find((detail) => detail.duration === myParam)
                                                ?.price
                                        }
                                    </h5>
                                    <div className="merge">
                                        <h4>{"₹" + Math.floor(totalPrice1).toLocaleString("en-IN")}</h4>
                                        <h6>&nbsp;per person*</h6>
                                    </div>
                                    <h3>*Excluding Applicable taxes</h3>
                                </div>
                                <div className="rightclass">
                                    <div className="off">4% OFF</div>
                                </div>
                            </div>
                            <div className="secondDiv">
                                <CalendarMonthIcon
                                    style={{ fontSize: "2rem", color: "rgb(74, 74, 74)" }}
                                />
                                <h4>
                                    {firstDate} - {lastDate}
                                </h4>
                            </div>
                            <div className="thirdDiv">
                                <h2>Details</h2>
                                <h3>Travellers</h3>
                                <div className="travellerDiv">
                                    <h3>Adult</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseAdult())
                                                dispatch(removeTraveller({ type: "adult" }));
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{adult}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setAdult())
                                                dispatch(addTravellers({ type: "adult" }));
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="travellerDiv">
                                    <h3>Children</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseChildren());
                                                dispatch(removeTraveller({ type: "children" }));
                                                console.log("hsbchjsdbchjsdbcnsdc shjdv hsjd v");
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{children}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setChildren());
                                                dispatch(addTravellers({ type: "children" }));
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="travellerDiv">
                                    <h3>Room</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseRoom());
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{room}</div>
                                        <div className="one" onClick={() => dispatch(setRoom())}>
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="newWholeDiv1">
                            {/* <div className="thirdDiv">
                                <h2>Details</h2>
                                <h3>Travellers</h3>
                                <div className="travellerDiv">
                                    <h3>Adult</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseAdult());
                                                dispatch(removeTraveller({ type: "adult" }));
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{adult}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setAdult());
                                                dispatch(addTravellers({ type: "adult" }));
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="travellerDiv">
                                    <h3>Children</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseChildren());
                                                dispatch(removeTraveller({ type: "children" }));
                                                console.log("hsbchjsdbchjsdbcnsdc shjdv hsjd v");
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{children}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setChildren());
                                                dispatch(addTravellers({ type: "children" }));
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="travellerDiv">
                                    <h3>Room</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseRoom());
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{room}</div>
                                        <div className="one" onClick={() => dispatch(setRoom())}>
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="fourthDiv">
                                <Link to={`/booking/${packId}?myParam=${myParam}`}>
                                    <button>Proceed to Book Online</button>
                                </Link>
                            </div>
                        </div>
                    </div>}
                    {options === 3 && <div className="secondSection">
                        <div className="newWholeDiv">
                            <div className="firstDiv">
                                <div className="leftclass">
                                    <h5>
                                        ₹
                                        {
                                            data.details.find((detail) => detail.duration === myParam)
                                                ?.price
                                        }
                                    </h5>
                                    <div className="merge">
                                        <h4>{"₹" + Math.floor(totalPrice1).toLocaleString("en-IN")}</h4>
                                        <h6>&nbsp;per person*</h6>
                                    </div>
                                    <h3>*Excluding Applicable taxes</h3>
                                </div>
                                <div className="rightclass">
                                    <div className="off">4% OFF</div>
                                </div>
                            </div>
                            <div className="secondDiv">
                                <CalendarMonthIcon
                                    style={{ fontSize: "2rem", color: "rgb(74, 74, 74)" }}
                                />
                                <h4>
                                    {firstDate} - {lastDate}
                                </h4>
                            </div>
                            <div className="thirdDiv">
                                <h2>Details</h2>
                                <h3>Travellers</h3>
                                <div className="travellerDiv">
                                    <h3>Adult</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseAdult());
                                                dispatch(removeTraveller({ type: "adult" }));
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{adult}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setAdult());
                                                dispatch(addTravellers({ type: "adult" }));
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="travellerDiv">
                                    <h3>Children</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseChildren());
                                                dispatch(removeTraveller({ type: "children" }));
                                                console.log("hsbchjsdbchjsdbcnsdc shjdv hsjd v");
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{children}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setChildren());
                                                dispatch(addTravellers({ type: "children" }));
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="travellerDiv">
                                    <h3>Room</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseRoom());
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{room}</div>
                                        <div className="one" onClick={() => dispatch(setRoom())}>
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="newWholeDiv1">
                            <div className="thirdDiv">
                                <h2>Details</h2>
                                <h3>Travellers</h3>
                                <div className="travellerDiv">
                                    <h3>Adult</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseAdult());
                                                dispatch(removeTraveller({ type: "adult" }));
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{adult}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setAdult());
                                                dispatch(addTravellers({ type: "adult" }));
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="travellerDiv">
                                    <h3>Children</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseChildren());
                                                dispatch(removeTraveller({ type: "children" }));
                                                console.log("hsbchjsdbchjsdbcnsdc shjdv hsjd v");
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{children}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setChildren());
                                                dispatch(addTravellers({ type: "children" }));
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className="travellerDiv">
                                    <h3>Room</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseRoom());
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{room}</div>
                                        <div className="one" onClick={() => dispatch(setRoom())}>
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fourthDiv">
                                <Link to={`/booking/${packId}?myParam=${myParam}`}>
                                    <button>Proceed to Book Online</button>
                                </Link>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            {isPackagePhoto && (
                <>
                    <Opacity />{" "}
                    {/*   onClick={() => dispatch(setIsPackagePhoto(false))}  */}
                    <div className="whole fade">
                        <div className="icons">
                            <ClearIcon
                                className="icon"
                                onClick={() => dispatch(setIsPackagePhoto(false))}
                            />
                        </div>
                        <div className="slider">
                            <div className="text">
                                <div className="left">
                                    <h2>Amazing Goa Flight Inclusive Deal 4N</h2>
                                    <p>6 Photos</p>
                                    <div className="flex">
                                        <div
                                            className={photosSelect === 1 ? "blue single" : "single"}
                                            onClick={() => setPhotosSelect(1)}
                                        >
                                            All Photos
                                        </div>
                                        <div
                                            className={photosSelect === 2 ? "blue single" : "single"}
                                            onClick={() => setPhotosSelect(2)}
                                        >
                                            Day 1 - goa
                                        </div>
                                        <div
                                            className={photosSelect === 3 ? "blue single" : "single"}
                                            onClick={() => setPhotosSelect(3)}
                                        >
                                            Day 2 - goa
                                        </div>
                                        <div
                                            className={photosSelect === 4 ? "blue single" : "single"}
                                            onClick={() => setPhotosSelect(4)}
                                        >
                                            Day 3 - goa
                                        </div>
                                        <div
                                            className={photosSelect === 5 ? "blue single" : "single"}
                                            onClick={() => setPhotosSelect(5)}
                                        >
                                            Day 4 - goa
                                        </div>
                                    </div>
                                </div>
                                <div className="right">
                                    <button>Book package</button>
                                </div>
                            </div>
                            <div className="middle">
                                <img
                                    src={`http://localhost:7800/${data?.images[singlePhoto]}`}
                                    alt="image1"
                                    className="image"
                                />
                            </div>
                            <div className="right">
                                <img
                                    src={`http://localhost:7800/${data?.images[0]}`}
                                    className="img1"
                                    alt=""
                                    onClick={() => setSinglePhoto(0)}
                                />
                                <img
                                    src={`http://localhost:7800/${data?.images[1]}`}
                                    className="img2"
                                    alt=""
                                    onClick={() => setSinglePhoto(1)}
                                />
                                <img
                                    src={`http://localhost:7800/${data?.images[2]}`}
                                    className="img3"
                                    alt=""
                                    onClick={() => setSinglePhoto(2)}
                                />
                                <img
                                    src={`http://localhost:7800/${data?.images[3]}`}
                                    className="img4"
                                    alt=""
                                    onClick={() => setSinglePhoto(3)}
                                />
                                <img
                                    src={`http://localhost:7800/${data?.images[4]}`}
                                    className="img5"
                                    alt=""
                                    onClick={() => setSinglePhoto(4)}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Section>,
        document.getElementById("images")
    );
};

export default PackageDetail;

const Opacity = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1999;
  /* background-color: rgba(0, 0, 0, 0.8); */
`;

const Section = styled.section`
  height: max-content;
  width: 100%;
  margin: auto;
  box-shadow: 0 2px 30px 0px rgb(0, 0, 0, 0.1);
  background-color: #f2f2f2;
  position: relative;
  .whole {
    width: 100%;
    height: 100vh;
    top: 0;
    position: absolute;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .icons {
      position: fixed;
      top: 2rem;
      right: 2rem;
      color: white;
      z-index: 99999999999;
      .icon {
        font-size: 2.5rem;
        cursor: pointer;
      }
    }
    .slider {
      height: 100%;
      width: 100%;
      max-width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      margin-top: 3rem;
      gap: 3rem;
      z-index: 900999999;
      .text {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 0.5rem;
          width: 100%;
          h2 {
            font-size: 2.5rem;
            font-weight: 900;
            color: white;
          }
          p {
            color: white;
            font-size: 1.3rem;
            padding: 0;
          }
          .flex {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
            margin-top: 2rem;
            .single {
              padding: 0.6rem 1rem;
              color: white;
              border: 1px solid white;
              font-size: 1.4rem;
              text-transform: uppercase;
              cursor: pointer !important;
              border-radius: 0.4rem;
            }
            .blue {
              background-color: rgb(0, 140, 255);
              border: 1px solid rgb(0, 140, 255);
            }
          }
        }
        .right {
          margin: 0;
          button {
            background-image: linear-gradient(93deg, #53b2fe, #065af3),
              linear-gradient(93deg, #53b2fe, #065af3);
            padding: 0.7rem 2rem;
            color: white;
            font-size: 1.7rem;
            text-transform: uppercase;
            font-weight: 900;
            width: 18rem;
            border-radius: 2rem;
          }
        }
      }
      .middle {
        z-index: 2999;
        img {
          width: 60rem;
          height: 35rem;
          object-fit: cover;
          border-radius: 0.5rem;
          filter: brightness(110%);
        }
      }
      .right {
        margin-top: 3rem;
        display: flex;
        gap: 0.7rem;
        .img1 {
          opacity: ${(props) => (props.singlePhoto === 0 ? "1" : ".4")};
        }
        .img2 {
          opacity: ${(props) => (props.singlePhoto === 1 ? "1" : ".4")};
        }
        .img3 {
          opacity: ${(props) => (props.singlePhoto === 2 ? "1" : ".4")};
        }
        .img4 {
          opacity: ${(props) => (props.singlePhoto === 3 ? "1" : ".4")};
        }
        .img5 {
          opacity: ${(props) => (props.singlePhoto === 4 ? "1" : ".4")};
        }
        img {
          width: 9rem;
          height: 7rem;
          border-radius: 0.7rem;
          object-fit: cover;
          cursor: pointer;
          opacity: 0.4;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
  .mainPackage {
    height: max-content;
    width: 100%;
    background-color: white;
    background-color: rgb(229, 229, 229);

    .mainDiv {
      width: 100%;
      background-color: white;
      height: 60vh;
      box-shadow: 0 2px 30px 0px rgb(0, 0, 0, 0.1);
      .header {
        width: 100%;
        max-width: ${(props) => (props.isPackagePhoto ? "100%" : "80%")};
        margin: auto;
        padding: 2rem 2rem;
        height: 10rem;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        background-color: white;
        .left {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          .stars {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .package {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 0.4rem;
            h3 {
              font-size: 3rem;
              color: var(--bgDarkAdmin);
              font-weight: 700;
            }
            .info {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 0.5rem;
              .timeLimit {
                padding: 0.3rem 0.5rem;
                background-color: #26b5a9;
                color: white;
                font-weight: 900;
                border-radius: 0.3rem;
              }
              .flexPackage {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.2rem;
                padding: 0.3rem 0.5rem;
                background-color: black;
                border-radius: 0.3rem;
                color: white;
                font-weight: 900;
              }
              .timeCity {
                font-size: 1.7rem;
                font-weight: 700;
                color: rgb(74, 74, 74);
              }
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          .icon {
            font-size: 2.3rem;
            color: black;
            opacity: 0.7;
            cursor: pointer;
          }
          .bookingTitle {
            padding: 1rem 2rem;
            cursor: pointer;
            font-size: 1.7rem;
            outline: none;
            border: none;
            background-image: linear-gradient(93deg, #53b2fe, #065af3),
              linear-gradient(93deg, #53b2fe, #065af3);
            color: white;
            font-weight: 600;
            border-radius: 2rem;
          }
        }
      }
      .is-sticky {
        position: fixed;
        top: 10px;
        z-index: 999;
        animation: 500ms ease-in-out 0s normal none 1 running fadeInDown;
      }
      .images {
        width: 100%;
        max-width: ${(props) => (props.isPackagePhoto ? "100%" : "80%")};
        margin: 0 auto;
        /* margin-bottom: 1rem; */
        cursor: pointer;
        display: grid;
        height: 35vh;
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: 50% 50%;
        grid-template-areas:
          "image1 image2 image3"
          "image1 image4 image5";
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
        img {
          border-radius: 0.3rem;
        }
        .image1 {
          .image {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          grid-area: image1;
          height: 100%;
          width: 100%;
        }
        .image2 {
          grid-area: image2;

          .image {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .image3 {
          grid-area: image3;

          .image {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-top-right-radius: 0.5rem;
          }
        }
        .image4 {
          grid-area: image4;

          .image {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .image5 {
          grid-area: image5;

          .image {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-bottom-right-radius: 0.5rem;
          }
        }
      }
      .menu {
        width: 100%;
        max-width: ${(props) => (props.isPackagePhoto ? "100%" : "80%")};
        margin: 0 auto;
        height: max-content;
        display: flex;
        margin-top: 1.5rem;
        align-items: center;
        justify-content: flex-start;
        .singleTitle {
          padding: 2rem 3rem;
          font-size: 1.7rem;
          color: #008cff;
          cursor: pointer;
          border-bottom: 0.4rem solid white;
          text-transform: uppercase;
          font-weight: 900;
        }
      }
    }
    .restWholeDiv {
      display: flex;
      width: calc(100% - 10%);
      gap: 4rem;
      .restDiv {
        flex: 2.4;
        margin-left: 11%;
        margin-top: 3rem;
        background-color: white;
        margin-bottom: 5rem;
        height: max-content;
        display: flex;
        flex-direction: column;
        .dayPlanDetails {
          width: 100%;
          height: max-content;
          display: flex;
          box-shadow: 0 20px 30px 0px rgb(0, 0, 0, 0.1);
          padding-bottom: 4rem;
          border-radius: 1rem;
          .left {
            flex: 0.7;
            width: 100%;
            height: 100%;
            width: 15rem;
            padding: 0.5rem 1rem;
            h1 {
              font-size: 2rem;
              color: rgb(74, 74, 74);
              font-weight: 900;
              margin-left: 1.6rem;
            }
            .box {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
              gap: 0.6rem;
              margin-top: 2rem;
              .item {
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: flex-start;
                ul {
                  /* margin-left: 1.6rem; */
                  width: 100%;
                  li {
                    font-size: 1.4rem;
                    list-style-type: none;
                    color: rgb(74, 74, 74);
                    font-weight: 500;
                    padding: 0.4rem 2rem;
                    cursor: pointer;
                    border-radius: 0.3rem;
                    border-bottom-right-radius: 2rem;
                    border-top-right-radius: 2rem;
                  }
                }
              }
            }
          }
          .right {
            width: 100%;
            height: 100%;
            border-left: 1px solid rgba(74, 74, 74, 0.1);
            flex: 3;
            hr {
              margin: 0;
              width: 100%;
              color: rgba(74, 74, 74, 0.1);
              opacity: 0.1;
            }
            .title {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              .left1 {
                width: max-content;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                h1 {
                  background-color: #f4d1ca;
                  font-size: 1.5rem;
                  padding: 1rem 2rem;
                  border-top-right-radius: 0.6rem;
                  border-bottom-right-radius: 0.6rem;
                  font-weight: 700;
                }
              }
              .right1 {
                width: max-content;
                margin-top: 0.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.6rem 1rem;
                gap: 0.7rem;
                color: rgb(74, 74, 74);
                .item {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: 500;
                  h2 {
                    font-size: 1rem;
                    font-weight: medium;
                  }
                }
              }
            }
            .daymeal {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 4rem;
              padding: 2rem 5rem;
              .east {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 0.6rem;
                .icon {
                  color: #979797;
                }
                span {
                  color: rgb(74, 74, 74);
                  font-weight: 900;
                  font-size: 1.5rem;
                }
              }
              .west {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 0.6rem;
                .icon {
                  color: #979797;
                }
                span {
                  font-weight: 900;
                  font-size: 1.2rem;
                  color: rgb(74, 74, 74);
                }
                p {
                  font-weight: 100;
                  color: rgb(74, 74, 74);
                  padding: 0;
                  font-size: 1.2rem;
                }
              }
            }
            .endofday {
              width: 100%;
              padding: 2rem;
              border-top: 1px solid rgba(74, 74, 74, 0.1);
              border-bottom: 1px solid rgba(74, 74, 74, 0.1);
              .content {
                width: 100%;
                border-radius: 0.5rem;
                background-image: linear-gradient(
                  259deg,
                  rgba(204, 245, 242, 0.5019607843),
                  rgba(212, 225, 158, 0.5019607843)
                );
                padding: 2rem 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3rem;
                color: rgb(74, 74, 74);
                font-style: italic;
                span {
                  color: rgb(74, 74, 74);
                  font-size: 1.4rem;
                  font-weight: 900;
                }
              }
            }
            .car {
              &:hover {
                background-color: rgb(0, 140, 255, 0.04);
                transition: all 0.2s ease-in-out;
                cursor: pointer;
              }
              width: 100%;
              height: max-content;
              padding: 2rem 1rem;
              .title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .east {
                  h1 {
                    padding: 1rem 2rem;
                    opacity: 0.8;
                    font-size: 1.4rem;
                    font-weight: 500;
                    color: rgb(74, 74, 74);
                  }
                }
                .west {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  button {
                    color: rgb(0, 140, 255);
                    font-weight: 900;
                    font-size: 1.3rem;
                    border: none;
                    cursor: pointer;
                    padding: 1rem 2rem;
                    margin-right: 2rem;
                    text-transform: uppercase;
                    background-color: inherit;
                  }
                }
              }
              .content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  background-color: inherit;
                  img {
                    width: 20rem;
                    height: 10rem;
                    object-fit: cover;
                  }
                }
                .right {
                  flex: 1.7;
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem;
                  padding-right: 2rem;
                  h1 {
                    font-size: 1.7rem;
                  }
                  p {
                    padding: 0;
                  }
                }
              }
            }
            .car2 {
              &:hover {
                background-color: rgb(0, 140, 255, 0.04);
                transition: all 0.2s ease-in-out;
                cursor: pointer;
              }
              width: 100%;
              height: max-content;
              padding: 2rem 4rem;
              .title2 {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .east2 {
                  h1 {
                    padding: 1rem 2rem;
                    opacity: 0.8;
                    font-size: 1.4rem;
                    font-weight: 500;
                    color: rgb(74, 74, 74);
                  }
                }
                .west2 {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  button {
                    color: rgb(0, 140, 255);
                    width: 10rem;
                    font-weight: 900;
                    font-size: 1.3rem;
                    border: none;
                    cursor: pointer;
                    margin-right: 2rem;
                    text-transform: uppercase;
                    background-color: inherit;
                  }
                }
              }
              .content2 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left2 {
                  flex: 10;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  background-color: inherit;
                  .image {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.5rem;
                    img {
                      width: 4rem;
                      height: 4rem;
                    }
                  }
                  .contentLeft {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding-left: 2rem;
                    width: 40%;
                    label {
                      font-size: 1.7rem;
                      font-weight: 900;
                    }
                    h4 {
                      font-size: 1.4rem;
                      font-weight: 100;
                    }
                    h5 {
                      font-size: 1.1rem;
                      font-weight: 100;
                    }
                  }
                  .line {
                    border-bottom: 1px solid black;
                    width: 10rem;
                  }
                  .contentRight {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: flex-start;
                    padding-right: 2rem;
                    width: 50%;
                    label {
                      font-size: 1.7rem;
                      font-weight: 900;
                    }
                    h4 {
                      font-size: 1.4rem;
                      font-weight: 100;
                    }
                    h5 {
                      font-size: 1.1rem;
                      font-weight: 100;
                    }
                  }
                }
                .right2 {
                  flex: 4;
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem;
                  padding: 2rem;
                  h1 {
                    font-size: 1.4rem;
                  }
                  .downContent {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    .item {
                      display: flex;
                      align-items: center;
                      justify-content: flex-start;
                      gap: 0.4rem;
                      .icon {
                        color: #003251;
                      }
                      span {
                        font-weight: 500;
                        font-size: 1.2rem;
                        color: rgb(74, 74, 74);
                      }
                      h4 {
                        font-weight: 100;
                      }
                    }
                  }
                }
              }
            }
          }
          .car1 {
            &:hover {
              background-color: rgb(0, 140, 255, 0.04);
              transition: all 0.2s ease-in-out;
              cursor: pointer;
            }
            width: 100%;
            height: max-content;
            padding: 2rem 1rem;
            .title {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .east {
                h1 {
                  padding: 1rem 2rem;
                  opacity: 0.8;
                  font-size: 1.4rem;
                  font-weight: 500;
                  color: rgb(74, 74, 74);
                }
              }
              .west {
                display: flex;
                align-items: center;
                justify-content: center;
                button {
                  color: rgb(0, 140, 255);
                  font-weight: 900;
                  font-size: 1.3rem;
                  border: none;
                  cursor: pointer;
                  padding: 1rem 2rem;
                  margin-right: 2rem;
                  background-color: inherit;
                  text-transform: uppercase;
                }
              }
            }
            .content1 {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              .left {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                background-color: inherit;
                img {
                  width: 25rem;
                  height: 14rem;
                  object-fit: cover;
                  border-radius: 0.5rem;
                }
              }
              .south {
                flex: 1.7;
                margin: 1rem;
                .label {
                  width: max-content;
                  color: white;
                  padding: 0.4rem 1.2rem;
                  border-radius: 0.3rem;
                  font-weight: 500;
                  background-image: linear-gradient(to left, #6a11cb, #2575fc);
                }
                h1 {
                  font-size: 1.7rem;
                  margin-top: 1rem;
                  font-weight: 700;
                  letter-spacing: -0.1rem;
                  word-spacing: 0.2rem;
                  margin-bottom: 0.3rem;
                }
                h3,
                p {
                  font-size: 1rem;
                  color: rgb(74, 74, 74);
                  padding: 0;
                }
                .date {
                  margin-top: 1rem;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  gap: 1rem;
                  color: rgb(74, 74, 74);
                }
              }
            }
          }
        }
      }
      .itinerary {
        width: 100%;
        box-shadow: 0 0px 30px 0px rgb(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        overflow: hidden;
        .menu {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          background-color: #ecf7ff;
          padding: 0.5rem 1rem;
          .item {
            padding: 0.8rem 1rem;
            cursor: pointer;
            .roll {
              padding: 0.5rem 1rem;
              border-radius: 2rem;
              font-size: 1.7rem;
              text-transform: uppercase;
              letter-spacing: -0.1rem;
              word-spacing: 0.1rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 0.7rem;
              span {
                font-size: 1em;
              }
              h1 {
                font-weight: 100;
                font-size: 1em;
              }
            }
          }
        }
      }
    }
    .secondSection {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .newWholeDiv {
        height: max-content;
        box-shadow: 0 10px 30px 0px rgb(0, 0, 0, 0.1);
        margin-top: 3rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        width: 100%;
        .firstDiv {
          width: 100%;
          background-color: rgb(234, 245, 255);
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgb(0, 0, 0, 0.1);
          .leftclass {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            h5 {
              color: rgb(74, 74, 74);
              text-decoration: line-through;
              font-size: 1rem;
              font-weight: 100;
            }
            .merge {
              display: flex;
              align-items: center;
              h4 {
                font-size: 2rem;
                color: black;
                padding: 0;
              }
              h6 {
                font-size: 1.2rem;
                font-weight: 100;
              }
            }
            h3 {
              padding: 0;
              font-size: 1.2rem;
              font-weight: 100;
            }
          }
          .rightclass {
            .off {
              padding: 0.3rem 0.5rem;
              background-color: rgb(255, 85, 78);
              color: white;
              border-radius: 0.3rem;
            }
          }
        }
        .secondDiv {
          border-bottom: 1px solid rgb(0, 0, 0, 0.1);
          width: 100%;
          display: flex;
          align-items: center;
          padding: 1.3rem 2rem;
          background-color: white;
          gap: 1rem;
          h4 {
            font-size: 1.5rem;
            color: rgb(74, 74, 74);
          }
        }
        .thirdDiv {
          width: 100%;
          border-bottom: 1px solid rgb(0, 0, 0, 0.1);
          background-color: white;
          padding: 1.3rem 2rem;
          h2 {
            font-size: 2rem;
            color: rgb(74, 74, 74);
          }
          h3 {
            font-size: 1.7rem;
            color: rgb(74, 74, 74);
            margin-top: 2rem;
          }
          .travellerDiv {
            display: flex;
            justify-content: space-between;
            margin-top: 0.6rem;
            align-items: center;
            h3 {
              color: rgb(74, 74, 74, 0.7);
              margin: 0;
              font-size: 1.5rem;
            }
            .right {
              display: flex;
              justify-content: flex-end;
              gap: 1rem;
              align-items: center;
              color: rgb(74, 74, 74);
              .one {
                font-size: 2rem;
                padding: 0.1rem 1rem;
                border-radius: 1rem;
                cursor: pointer;
                border: 1px solid rgba(212, 225, 158, 0.5019607843);
                transition: all 0.2s ease-in-out;
                &:hover {
                  border: 1px solid black;
                }
              }
              .two {
                font-size: 1.7rem;
                width: 1.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
        .fourthDiv {
          width: 100%;
          padding: 1.3rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          button {
            padding: 0.8rem 1.3rem;
            cursor: pointer;
            background: linear-gradient(
              to right,
              rgb(79, 173, 254),
              rgb(11, 95, 243)
            );
            color: white;
            font-size: 1.4rem;
            font-weight: 900;
            border: none;
            outline: none;
            border-radius: 0.6rem;
          }
        }
      }

      .newWholeDiv1 {
        height: max-content;
        box-shadow: 0 10px 30px 0px rgb(0, 0, 0, 0.1);
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        width: 100%;
        .firstDiv {
          width: 100%;
          background-color: rgb(234, 245, 255);
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgb(0, 0, 0, 0.1);
          .leftclass {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            h5 {
              color: rgb(74, 74, 74);
              text-decoration: line-through;
              font-size: 1rem;
              font-weight: 100;
            }
            .merge {
              display: flex;
              align-items: center;
              h4 {
                font-size: 2rem;
                color: black;
                padding: 0;
              }
              h6 {
                font-size: 1.2rem;
                font-weight: 100;
              }
            }
            h3 {
              padding: 0;
              font-size: 1.2rem;
              font-weight: 100;
            }
          }
          .rightclass {
            .off {
              padding: 0.3rem 0.5rem;
              background-color: rgb(255, 85, 78);
              color: white;
              border-radius: 0.3rem;
            }
          }
        }
        .secondDiv {
          border-bottom: 1px solid rgb(0, 0, 0, 0.1);
          width: 100%;
          display: flex;
          align-items: center;
          padding: 1.3rem 2rem;
          background-color: white;
          gap: 1rem;
          h4 {
            font-size: 1.5rem;
            color: rgb(74, 74, 74);
          }
        }
        .thirdDiv {
          width: 100%;
          border-bottom: 1px solid rgb(0, 0, 0, 0.1);
          background-color: white;
          padding: 1.3rem 2rem;
          h2 {
            font-size: 2rem;
            color: rgb(74, 74, 74);
          }
          h3 {
            font-size: 1.7rem;
            color: rgb(74, 74, 74);
            margin-top: 2rem;
          }
          .travellerDiv {
            display: flex;
            justify-content: space-between;
            margin-top: 0.6rem;
            align-items: center;
            h3 {
              color: rgb(74, 74, 74, 0.7);
              margin: 0;
              font-size: 1.5rem;
            }
            .right {
              display: flex;
              justify-content: flex-end;
              gap: 1rem;
              align-items: center;
              color: rgb(74, 74, 74);
              .one {
                font-size: 2rem;
                padding: 0.1rem 1rem;
                border-radius: 1rem;
                cursor: pointer;
                border: 1px solid rgba(212, 225, 158, 0.5019607843);
                transition: all 0.2s ease-in-out;
                &:hover {
                  border: 1px solid black;
                }
              }
              .two {
                font-size: 1.7rem;
                width: 1.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
        .fourthDiv {
          width: 100%;
          padding: 1.3rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
          button {
            padding: 0.8rem 1.3rem;
            cursor: pointer;
            background: linear-gradient(
              to right,
              rgb(79, 173, 254),
              rgb(11, 95, 243)
            );
            color: white;
            font-size: 1.4rem;
            font-weight: 900;
            border: none;
            outline: none;
            border-radius: 0.6rem;
          }
        }
      }
    }
  }
`;
