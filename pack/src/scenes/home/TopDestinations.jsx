import React from "react";
import styled from "styled-components";
import "./top.css";
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'
import img4 from '../images/4.jpg'
import img5 from '../images/5.jpg'
import 'swiper/css';
import 'swiper/css/virtual';
import { useFetchUniqueCityQuery } from "../../store/services/packageService";
import { Link } from "react-router-dom";

// import required modules
const TopDestinations = () => {

    const { data, isFetching } = useFetchUniqueCityQuery();
    console.log(data);

    return (
        <Section>
            <h1>Top Destination</h1>
            <div className="swipered" style={{ margin: "0 7.5rem", width: "calc(100% - 15rem)" }}>
                <Swiper modules={[Virtual]} slidesPerView={5} virtual>
                    {
                        data?.packages?.map((pack) => {
                            return <>
                                <SwiperSlide>
                                    <Link to={`/city/${pack?._id}`}>
                                        <div className="item">
                                            <div className="img">
                                                <img
                                                    src={`http://localhost:7800/${pack?.image[0]}`}
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="text">
                                                <h3>{pack._id}</h3>
                                                <p>{pack.count} Packages</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            </>
                        })
                    }
                </Swiper>
            </div>
        </Section>
    );
};

export default TopDestinations;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: var(--r3);
  margin-bottom: 1.5rem;
  height: max-content;
  background-color: white;
  h1 {
    font-size: var(--r4);
    color: var(--bgBlack);
  }
  .swipered{
    height: 100%;
    width: 100%;
    margin: 0 var(--r10);
  }
  .item {
    height: 100%;
    width: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 3rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    cursor: pointer;
    overflow: hidden;
    background-color: white;
    .img {
      width: var(--r18);
      height: var(--r18);
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 50%;
        transition: transform 0.5s;
        &:hover {
          transform: scale(1.1);
          transform-origin: 50% 50%;
          cursor: pointer;
        }
      }
    }
    .text{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3{
            color: var(--bgBlack);
            font-size: var(--r2);
        }
        p{
            color: var(--bgBlack);
            font-size: var(--r1-5);
        }
    }
  }
`;
