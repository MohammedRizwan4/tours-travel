import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/users/Navbar';
import GridViewIcon from '@mui/icons-material/GridView';
import TopSearch from '../home/TopSearch';
import Footer from '../../components/users/Footer';
import { useParams } from 'react-router-dom';
import { useFetchPackagesForHomeQuery, useFetchUniqueCityQuery } from '../../store/services/packageService';
import SinglePackage from '../Themes/SinglePackage';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';

const City = () => {
    const { name } = useParams();

    const { data, isFetching } = useFetchPackagesForHomeQuery();

    console.log(data?.packages);

    const image = data?.packages?.filter((data) => data.location.city == name);
    console.log(image);

    const { data1 } = useFetchUniqueCityQuery();
    console.log(data1);

    const selectImage = data1?.filter((data) => console.log(data));
    console.log(selectImage);

    return (
        <Section>
            <Navbar />
            <div className="searchContainer">
                <div className="container">
                    <div className="left">
                        <div className="box">
                            <label htmlFor="">Starting From</label>
                            <input type="text" name="starting" />
                        </div>
                        <div className="box">
                            <label htmlFor="">Going to</label>
                            <input type="text" name="destination" />
                        </div>
                        <div className="box">
                            <label htmlFor="">Starting date</label>
                            <input type="text" placeholder="Select" disabled />
                        </div>
                        <button>Search</button>
                    </div>
                    <div className="right">
                        <GridViewIcon style={{ fontSize: "2.5rem", fontStyle: "italic" }} />
                        Explore
                    </div>
                </div>
            </div>
            <div className="proImage">
                { image && <img src={`http://localhost:7800/${image[0]?.images[0]}`} alt="" />}
                <div className="container">
                    <h1>{name}</h1>
                    <div className="totalPackages">
                        Total {image?.length}
                    </div>
                </div>
            </div>
            <div style={{ margin: "0 3.75rem", width: "calc(100% - 7rem)" }}>
                <Swiper modules={[Virtual]} slidesPerView={4} virtual>
                    {
                        image?.map((singlePackage) => {
                            return (
                                <SwiperSlide key={singlePackage._id}>
                                    <SinglePackage singlePackage={singlePackage} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
            <Footer />
        </Section>
    );
}

export default City;

const Section = styled.div`
    width: 100%;
    .searchContainer{
    height: 10vh;
    width: 100%;
    background-color: rgb(10,34,61);
    position: sticky;
    .container{
        max-width: 80%;
        height: 10vh;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1rem;
            .box{
                border-radius: .4rem;
                background-color: rgba(255,255,255,.1);
                height: 100%;
                width: max-content;
                width: 20rem;
                padding: .3rem 1rem;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                gap: .3rem;
                label{
                    color: rgb(0,140,255);
                    font-size: 1.2rem;
                    text-transform: uppercase;
                }
                input{
                    border: none;
                    outline: none;
                    padding: .3rem .3rem;
                    font-size: 1.6rem;
                    font-weight: 500;
                    background-color: rgba(255,255,255,0);
                    color: white;
                }
            }
            button{
                font-size: 2rem;
                padding: 1rem 5rem;
                border-radius: 3rem;
                font-weight: 900;
                cursor: pointer;
                text-transform: uppercase;
                color: white;
                background-image: linear-gradient(93deg,#53b2fe,#065af3),linear-gradient(93deg,#53b2fe,#065af3);
            }
        }
        .right{
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            color: white;
            cursor: pointer;
        }
    }
  }
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
`

