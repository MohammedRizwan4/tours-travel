import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/users/Navbar";
import PublicIcon from "@mui/icons-material/Public";
import img1 from "./download1.jfif";
import { useDispatch, useSelector } from "react-redux";
import Traveller from "./Traveller";
import {
    addTravellers,
    clearMessage,
    decreaseAdult,
    decreaseChildren,
    decreaseRoom,
    removeTraveller,
    setAdult,
    setChildren,
    setPrice,
    setRoom,
    setSuccess,
} from "../../store/reducers/globalReducer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../store/services/adminUserService";
import { useFetchOnePackageQuery } from "../../store/services/packageService";
import { usePackageBookingMutation } from "../../store/services/bookingService";

const Booking = () => {

    const { adult, children, room, travellers, price } = useSelector((state) => state.globalReducer);
    const [state, setState] = useState({
        email: "",
        name: "",
        mobile: "",
        spMessage: ""
    });

    const [bookingFunc, response2] = usePackageBookingMutation();

    const { user } = useSelector((state) => state.authReducer);

    const { id } = useParams();
    const userId = user.id;

    const handleSubmit = () => {
        console.log({ state, travellers, id, userId, totalPrice, myParam });
        bookingFunc({ state, travellers, id, userId, totalPrice, myParam, adult, children, room, adultPrice, childPrice });
    }

    const inputChangeHandler = (e) => {
        setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const [adultCount, setAdultCount] = useState(false);
    const [childrenCount, setChildrenCount] = useState(false);
    const dispatch = useDispatch();
    const totalPeople = adult + children;
    const myArray = Array.from(
        { length: parseInt(totalPeople) },
        (_, index) => index + 1
    );


    const { data, isFetching } = useFetchOnePackageQuery(id)

    const adultPrice = price; // actual price for adults
    const childPrice = price * 0.85; // actual price minus 15% for children
    const totalPrice = (adultPrice * adult) + (childPrice * children)

    useEffect(() => {
        if (adult) {
            dispatch(clearMessage());
            dispatch(setSuccess("adult Added"));

            const interval = setTimeout(() => {
                dispatch(clearMessage());
            }, 2000);

            return () => clearTimeout(interval);
        } else {
            dispatch(clearMessage());
            dispatch(setSuccess("adult removed"));

            const interval = setTimeout(() => {
                dispatch(clearMessage());
            }, 1000);

            return () => clearTimeout(interval);
        }
    }, [adult]);

    useEffect(() => {
        if (children) {
            dispatch(clearMessage());
            dispatch(setSuccess("Children Added"));

            const interval = setTimeout(() => {
                dispatch(clearMessage());
            }, 2000);

            return () => clearTimeout(interval);
        } else {
            dispatch(clearMessage());
            dispatch(setSuccess("Children removed"));

            const interval = setTimeout(() => {
                dispatch(clearMessage());
            }, 1000);

            return () => clearTimeout(interval);
        }
    }, [children]);


    const check = () => {
        const allTravellersFilled = travellers.every(traveller => traveller.email && traveller.name && traveller.mobile && traveller.gender);
        const { email, name, mobile, spMessage } = state;
        const allFieldsFilled = email && name && mobile && spMessage;
        return allTravellersFilled && allFieldsFilled;
    };

    const searchParams = new URLSearchParams(useLocation().search);
    const { id: packId } = useParams();
    const myParam = searchParams.get("myParam");
    const skipDays = parseInt(myParam) - 1;
    const days = myParam?.slice(-2, -1);

    const singleDetail = data?.packages1?.packages1?.packages1?.packages1?.details?.find(
        (detail) => detail.duration === myParam
    );

    const myArray1 = Array.from(
        { length: parseInt(days) },
        (_, index) => index + 1
    );

    const daysArray = Array.from(
        { length: parseInt(skipDays) },
        (_, index) => index + 1
    );

    const startDate = new Date(data?.package1.date);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 4);

    const formattedEndDate = endDate.getDate() + " " + getMonthName1(endDate.getMonth());
    const formattedStartDate = startDate.getDate() + " " + getMonthName1(startDate.getMonth());

    useEffect(() => {
        if (data && myParam) {
            let price1 = data?.package1.details?.find(
                (detail) => detail.duration === myParam
            )?.price;
            price1 = price1 - (price1 * 4) / 100;
            console.log("price: ", price1);
            dispatch(setPrice(price === null ? price1 : price));
        }
    }, [data, myParam]);

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

    function getMonthName1(month) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[month];
    }

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


    return (
        <Section>
            <Navbar />
            <div className="container">
                <div className="mainAbsolute">
                    <div className="goal">
                        <div className="left">
                            <h2>Review Package</h2>
                        </div>
                        <div className="right">
                            <h4>1.TRAVELLER DETAILS</h4>
                            <h4>2. PACKAGE ITINERARY & INCLUSIONS</h4>
                            <h4>3. CANCELLATION & DATE CHANGE</h4>
                        </div>

                    </div>
                    <div className="mainDiv">
                        <div className="left">
                            <div className="firstDiv">
                                <div className="name">Amazing Goa Flight Inclusive Deal 4N</div>
                                <div className="logos">
                                    <PublicIcon style={{ fontSize: "1.7rem" }} />
                                    <h3>Flexi Package</h3>
                                    <h5>4N Goa</h5>
                                </div>
                                <div className="dates">
                                    <span>{firstDateWhole} 2023</span>
                                    <h3>------</h3>
                                    <h4>5N/6D</h4>
                                    <h3>------</h3>
                                    <span>{lastDateWhole} 2023 / From {data?.package1?.location?.city}</span>
                                    <div>|</div>
                                    <h5>
                                        <b style={{ color: "black" }}>{room} Room</b> - {adult} Adult - {children} Children
                                    </h5>
                                </div>
                            </div>
                            <div className="secondDiv">
                                <div className="title">
                                    <h1>1. Traveller Details - </h1>
                                    <span>{room} Room | {adult} Adults | {children} Children</span>
                                </div>
                                {travellers.map((traveller, index) => {
                                    return <Traveller traveller={traveller} index={index} />;
                                })}
                            </div>
                            <div className="thirdDiv">
                                <h1>Please enter contact detail</h1>
                                <form>
                                    <div className="content">
                                        <label htmlFor="">Email</label>
                                        <input type="text" placeholder="Eg. john.doe@gmail.com" name="email" value={state.email} onChange={(e) => inputChangeHandler(e)} />
                                    </div>
                                    <div className="content">
                                        <label htmlFor="">Username</label>
                                        <input type="text" name="name" value={state.name} onChange={(e) => inputChangeHandler(e)} />
                                    </div>
                                    <div className="content">
                                        <label htmlFor="">Mobile</label>
                                        <input type="text" name="mobile" value={state.mobile} placeholder="Eg. 96203 37826" onChange={(e) => inputChangeHandler(e)} />
                                    </div>
                                </form>
                                <hr />
                                <h1>Special Requests</h1>
                                <div className="content">
                                    <label htmlFor="">Special Requests</label>
                                    <input type="text" value={state.spMessage} name="spMessage" placeholder="Enter Special Requests" onChange={(e) => inputChangeHandler(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="rightDiv">
                            <div className="firstDiv1">
                                <div className="leftclass">
                                    <h5>$76,877</h5>
                                    <div className="merge">
                                        <h4>{"₹" + Math.floor(totalPrice).toLocaleString("en-IN")}</h4>
                                        <h6>&nbsp;per person*</h6>
                                    </div>
                                    <h3>*Excluding Applicable taxes</h3>
                                </div>
                                <div className="rightclass">
                                    <div className="off">30% OFF</div>
                                </div>
                            </div>
                            <div className="secondDiv1">
                                <CalendarMonthIcon
                                    style={{ fontSize: "2rem", color: "rgb(74, 74, 74)" }}
                                />
                                <h4>{formattedStartDate} - {formattedEndDate}</h4>
                            </div>
                            <div className="thirdDiv1">
                                <h2>Details</h2>
                                <h3>Travellers</h3>
                                <div className="travellerDiv">
                                    <h3>Adult</h3>
                                    <div className="right">
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(decreaseAdult())
                                                dispatch(removeTraveller({ type: "adult" }))
                                                setAdultCount(false);
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{adult}</div>
                                        <div className="one" onClick={() => {
                                            dispatch(setAdult())
                                            dispatch(addTravellers({ type: "adult" }))
                                            setAdultCount(true)
                                        }}>
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
                                                dispatch(decreaseChildren())
                                                dispatch(removeTraveller({ type: "children" }))
                                                setChildrenCount(false)
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className="two">{children}</div>
                                        <div
                                            className="one"
                                            onClick={() => {
                                                dispatch(setChildren())
                                                dispatch(addTravellers({ type: "children" }))
                                                setChildrenCount(true)
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
                                                dispatch(decreaseRoom())
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
                            <div className="fourthDiv1">
                                <Link to={`/mybookings`}>
                                    <button disabled={!check()} className={!check() ? "check" : ""} onClick={handleSubmit}>Book Online</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Booking;

const Section = styled.div`
  background-color: rgb(229, 229, 229);
  height: max-content;
  .container {
    width: 100%;
    height: 27vh;
    background-color: rgb(10, 34, 61);
    position: relative;
    .mainAbsolute {
      position: absolute;
      top: 0;
      width: calc(100% - 18%);
      margin: auto;
      margin-left: 9%;
      height: max-content;
      padding: 1rem 0;
      .goal {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1.4rem;
        .left {
          h2 {
            font-size: 2.5rem;
            letter-spacing: -0.1rem;
            color: white;
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          h4 {
            font-size: 1.3rem;
            color: white;
          }
        }
      }
      .mainDiv {
        width: 100%;
        height: max-content;
        display: flex;
        gap: 3rem;
        margin-bottom: 5rem;

        .left {
          flex: 3;
          background-color: rgb(238, 246, 255);
          border-radius: 0.6rem;
          height: max-content;
          box-shadow: 0 10px 30px 0px rgb(0, 0, 0, 0.1);
          .firstDiv {
            padding: 2rem 3rem;
            height: 38.2%;
            border-radius: 0.6rem;
            .name {
              font-size: 3rem;
              font-weight: 900;
            }
            .logos {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              color: rgb(74, 74, 74);
              h3 {
                font-size: 1.7rem;
              }
              h5 {
                font-size: 1.5rem;
                font-weight: 500;
              }
            }
            .dates {
              display: flex;
              align-items: center;
              gap: 0.6rem;
              margin-top: 0.8rem;
              color: rgb(74, 74, 74);
              span {
                font-size: 1.6rem;
              }
              h5 {
                font-size: 1.6rem;
                font-weight: 100;
              }
              div {
                margin-right: 1rem;
                font-size: 2rem;
              }
              h4 {
                font-size: 1.2rem;
                padding: 0.3rem 0.6rem;
                font-weight: 100;
                background-color: rgb(228, 226, 223);
                border-radius: 0.5rem;
              }
              h3 {
                font-weight: 100;
                color: rgb(74, 74, 74);
              }
            }
          }
          .secondDiv {
            height: max-content;
            width: 100%;
            background-color: white;
            padding-bottom: 2rem;
            .title {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              padding: 2rem 3rem;
              gap: 1rem;
              margin-bottom: 0.5rem;
              h1 {
                font-size: 2rem;
                color: rgb(74, 74, 74);
              }
              span {
                font-size: 1.4rem;
              }
            }
            hr {
              margin: 2rem 3rem;
              color: rgb(74, 74, 74);
            }
            .traveller {
              display: flex;
              align-items: center;
              padding: 0 3rem;
              height: 4rem;
              height: max-content;
              cursor: pointer;
              img {
                width: 4rem;
                height: 4rem;
                border-radius: 80%;
              }
              .name {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 2rem;
                height: 100%;
                h4 {
                  color: rgb(151, 151, 151);
                  font-weight: 900;
                  margin-top: 0.2rem;
                }
                h2 {
                  margin-bottom: 0.2rem;
                  font-size: 1.7rem;
                  color: rgb(74, 74, 74);
                  font-weight: 900;
                }
              }
              .desc {
                margin-left: 15rem;
                p {
                  padding: 0;
                  font-size: 1.2rem;
                  color: rgb(151, 151, 151);
                  font-weight: 900;
                }
              }
              .profile{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 10rem;
                gap: .7rem;
                .circle{
                    padding: .1rem .1rem;
                    border-radius: 50%;
                    border: 1px solid green;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                h3{
                    padding: 0;
                  font-size: 1.2rem;
                  color: green;
                  font-weight: 900;
                }
              }
            }
          }
          .thirdDiv {
            height: max-content;
            width: 100%;
            background-color: white;
            padding: 2rem 3rem;
            h1 {
              color: rgb(74, 74, 74);
            }
            form {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 3rem;
              margin: 0.6rem 0rem;
              .content {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
                label {
                  font-size: 1.3rem;
                }
                input {
                  padding: 0.6rem 2rem;
                  width: 25rem;
                }
              }
            }
            hr {
              margin: 3rem;
              margin-right: 8rem;
            }
            h1 {
              color: rgb(74, 74, 74);
              margin-bottom: 1rem;
            }
            .content {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 0.5rem;
              label {
                font-size: 1.3rem;
              }
              input {
                padding: 0.6rem 2rem;
                width: 25rem;
              }
            }
          }
        }
        .rightDiv {
          flex: 1;
          border-radius: 0.6rem;
          height: max-content;
          box-shadow: 0 10px 30px 0px rgb(0, 0, 0, 0.1);
          .firstDiv1 {
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
          .secondDiv1 {
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
          .thirdDiv1 {
            width: 100%;
            border-bottom: 1px solid rgb(0, 0, 0, 0.1);
            background-color: white;
            padding: 1.3rem 2rem;
            height: max-content;
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
          .fourthDiv1 {
            width: 100%;
            padding: 1.3rem 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            .check{
                opacity: .6;
            }
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
  }
`;
