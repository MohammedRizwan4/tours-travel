import React, { useEffect } from 'react';
import styled from 'styled-components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../scenes/images/1.jpg';
import img2 from '../../scenes/images/2.jpg';
import img3 from '../../scenes/images/3.jpg';
import img4 from '../../scenes/images/4.jpg';
import img5 from '../../scenes/images/5.jpg';
import img6 from './new.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';

const Hero = () => {

    useEffect(() => {
        var types = new Typed(".auto-input", {
            strings: [
                "Experience the world with ease",
                "Discover the world with our experts",
                "Explore, Dream, Discover",
                "Adventure awaits, let's explore together",
                "Wanderlust fulfilled, one trip at a time",
                "See the world, make it your own"],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true
        })
    }, []);

    return (
        <Section style={{ position: "relative" }}>
            <div className='container' style={{ position: "absolute", color: "white", top: "25%", fontSize: "2.5rem", left: "10%", zIndex: "999" }}>
                <h1>Hello, fellow adventurer! <br></br><span style={{ color: "#FFC93C", fontSize: "5rem" }} class="auto-input">Travel with us and create memories</span></h1>
            </div>
            {/* <img src={img6} alt="3D World Image" style={{ position: "absolute", top: "10%", width:"80rem",height: "40rem",objectFit: "cover",right: "-25%", zIndex: "999" }}/> */}
            <Swiper modules={[Virtual]} slidesPerView={1} virtual>
                <SwiperSlide>
                    <div className="images">
                        <img src={img1} alt="" style={{ filter: "brightness(60%)" }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="images">
                        <img src={img2} alt="" style={{ filter: "brightness(60%)" }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="images">
                        <img src={img3} alt="" style={{ filter: "brightness(60%)" }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="images">
                        <img src={img4} alt="" style={{ filter: "brightness(60%)" }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="images">
                        <img src={img5} alt="" style={{ filter: "brightness(60%)" }} />
                    </div>
                </SwiperSlide>
            </Swiper>

        </Section>
    );
}

export default Hero;

{/* <video loop autoPlay muted> */ }
{/* <source src="../../public/assets/v1.mp4" type="video/mp4" /> */ }
{/* </video>  */ }

const Section = styled.section`
    height: 80vh;
    width: 100%;
    background-color: black;
    position: relative;
    .images{
        height: 100%;
        width: 100%;
        display: flex;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        video{
            height: 100%;
            width: 100vw;
            object-fit: cover;
            source{
                width: 100vw;
            }
        }
    }
    .buttons{
        position: absolute;
        z-index: 1099;
        padding: 3rem;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            height: 6rem;
            width: 6rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            border: 1px solid rgba(0,0,0,0.4);
            justify-content: center;
            cursor: pointer;
            background-color: rgba(0,0,0,0.4);
            .icon{
                font-size: 5rem;
                color: white;
            }
        }
        .right{
            height: 6rem;
            width: 6rem;
            cursor: pointer;
            border-radius: 50%;
            border: 1px solid rgba(0,0,0,0.4);
            background-color: rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            .icon{
                font-size: 5rem;
                color: white;
            }
        }
    }
`