import React from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import "./top.css";
// Import Swiper styles
import { Link, useParams } from "react-router-dom";
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import img1 from './1.jpg';
// import img2 from './2.jpg';
// import img3 from './3.jpg';
// import img4 from './4.jpg';
// import img5 from './5.jpg';
import 'swiper/css';
import 'swiper/css/virtual';
import SinglePackage from "../Themes/SinglePackage";
import { useFetchSingleThemeQuery } from "../../store/services/themeService";
import { useFetchPackagesForHomeQuery, useFetchThemePackageQuery } from "../../store/services/packageService";

const TopSearch = ({name}) => {

    const { data, isFetching } = useFetchPackagesForHomeQuery();

    console.log(data?.packages);

    return (
        <Section>
            <h1>{name}</h1>
            <div style={{ margin: "0 3.75rem", width: "calc(100% - 7rem)" }}>
                <Swiper modules={[Virtual]} slidesPerView={4} virtual>
                    {
                        data?.packages?.map((singlePackage) => {
                            return (
                                <SwiperSlide key={singlePackage._id}>
                                    <SinglePackage singlePackage={singlePackage}/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </Section>
    );
};

export default TopSearch;

const Section = styled.section`
  padding: var(--r2) 0;
  display: flex;
  height: max-content;
  background-color: white;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: var(--r4);
    margin-left: var(--r10);
    color: var(--bgDarkBlue);
  }
`;
