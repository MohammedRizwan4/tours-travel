import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import '../home/top.css'
import { Link } from "react-router-dom";
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';
import TourIcon from '@mui/icons-material/Tour';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HikingIcon from '@mui/icons-material/Hiking';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SinglePackage from "./SinglePackage";
import Footer from "../../components/users/Footer";
import SearchBar from "../../components/users/SearchBar";

const RegularTheme = ({ data, packages }) => {

    return (
        <>
            <Section>
                <SearchBar packages={packages}/>
                <div className="proImage">
                    <img src={`http://localhost:7800/${data?.theme?.image}`} alt="" />
                    <div className="container">
                        <h1>{data?.theme?.name}</h1>
                        <div className="totalPackages">
                            for All ({packages ? packages.length : 0})
                        </div>
                    </div>
                    <p>{data?.theme?.description}</p>
                </div>
                <div style={{ margin: "0 3.75rem", width: "calc(100% - 7rem)" }}>
                    <Swiper modules={[Virtual]} slidesPerView={4} virtual>
                        {
                            packages?.map((singlePackage) => {
                                return (
                                    <SwiperSlide key={singlePackage._id}>
                                        <SinglePackage singlePackage={singlePackage} />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </Section>
            <Footer />
        </>
    );
};

export default RegularTheme;

const Section = styled.section`
  display: flex;
  height: max-content;
  background-color: white;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
  /* gap: var(--r2); */
  width: 100%;
  margin-bottom: 2rem;
  .proImage{
    width: 100%;
    height: 35vh;
    margin-bottom: 2rem;
    position: relative;
    .container{
        .totalPackages{
            position: absolute;
            top: 6rem;
            margin-left: 50rem;
            font-size: 1.6rem;
            padding: .4rem 2rem;
            height: 3.5rem;
            width: 12rem;
            background-color: rgba(0,0,0,.4);
            border-radius: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(60%);
    }
    h1 {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 5rem;
        left: 0;
        font-size: var(--r4);
        margin-left: var(--r15);
        color: var(--bgWhite);
    }
    p{
        margin: 0;
        padding: 0;
        position: absolute;
        top: 12rem;
        left: 0;
        font-size: var(--r1-75);
        font-weight: 700;
        margin-left: var(--r15);
        margin-right: var(--r10);
        color: var(--bgWhite);
    }
  }
`;
