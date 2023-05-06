import React from "react";
import styled from "styled-components";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import a1 from "../../../public/assets/download.png"
import { useFetchAllLikedPackagesQuery } from "../../store/services/packageService";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Section2 = styled.div`
    height: 90vh;
    background-color: rgb(229,229,229);
`

const LikeSub = () => {

    const { user } = useSelector(state => state.authReducer);
    console.log(user.id);

    const { data, isFetching } = useFetchAllLikedPackagesQuery(user.id);
    console.log(data);

    return (
        <><Section>
            <div className="mainAbsolute">
                <div className="goal">
                    <div className="left">
                        <h2>Liked Packages</h2>
                    </div>
                </div>
                <div className="mainDiv">
                    <div className="left">
                        {
                            data?.packages?.map((pkg) => {
                                return (
                                    <div className="firstDiv">
                                        <div className="singlePackage">
                                            <div className="partcularPackage">
                                                <h2>{pkg.name}</h2>
                                                <div className="buttons">
                                                    <RemoveCircleIcon
                                                        style={{
                                                            color: "black",
                                                            fontSize: "2.4rem",
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="info">
                                                <div className="timeLimit">
                                                    {
                                                        pkg?.details?.map(duration => {
                                                            return duration.duration + " " + " "
                                                        })
                                                    }
                                                </div>
                                                <div className="flexPackage">Flexi Package</div>
                                                <div className="timeCity">2N Goa</div>
                                            </div>
                                            <div className="bothSide">
                                                <div className="images">
                                                    <img src={`http://localhost:7800/${pkg.images[0]}`} alt="" />
                                                </div>
                                                <div className="content">
                                                    <div className="leftDiv">
                                                        <div className="mainDiv">
                                                            <label htmlFor="">Location :- </label>
                                                            <h3>{pkg.location.city + ", " + pkg.location.state_name}</h3>
                                                        </div>
                                                        <div className="mainDiv">
                                                            <label htmlFor="">Destinations Covered :- </label>
                                                            <h3>{pkg.destinations_covered.map(single_des => {
                                                                return single_des + ", "
                                                            })}</h3>
                                                        </div>
                                                        <div className="mainDiv">
                                                            <label htmlFor="">Starting From :- </label>
                                                            <h3>{pkg.starting_point}</h3>
                                                        </div>
                                                        <div className="mainDiv">
                                                            <label htmlFor="">Duration :- </label>
                                                            <h3>{
                                                                pkg?.details?.map(duration => {
                                                                    return duration.duration + " " + " "
                                                                })
                                                            }</h3>
                                                        </div>
                                                        <div className="mainDiv">
                                                            <label htmlFor="">Accommodations :- </label>
                                                            <h3>{
                                                                pkg?.details?.map(dtl => {
                                                                    return dtl.accommodations[0].acc_type + " " + " "
                                                                })
                                                            }</h3>
                                                        </div>
                                                        <div className="mainDiv">
                                                            <label htmlFor="">Related theme :- </label>
                                                            <h3>Adventure Travel</h3>
                                                        </div>
                                                    </div>
                                                    <div className="rightDiv">
                                                        <h3 style={{ background: "rgb(255,201,60)" }}>₹{pkg.details[0].price}</h3>
                                                        <Link to={`/package/${pkg._id}?myParams=2N3D`}><h3>Book Now</h3></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Section>
            <Section2 />
        </>
    );
};

export default LikeSub;

const Section = styled.div`
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
    }
    .mainDiv {
      width: 100%;
      height: max-content;
      display: flex;
      gap: 3rem;
      margin-bottom: 5rem;
      .left {
        background-color: rgb(238, 246, 255);
        border-radius: 0.6rem;
        height: max-content;
        width: 100%;
        box-shadow: 0 10px 30px 0px rgb(0, 0, 0, 0.1);
        .firstDiv {
          padding: 2rem 3rem;
          height: 38.2%;
          width: 100%;
          border-radius: 0.6rem;
          .singlePackage{
            box-shadow: 10px 20px 30px 40px rgb(0, 0, 0, 0.1);
            padding: 1rem 2rem;
            border-radius: 1rem;
                .partcularPackage {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;
                    h2 {
                    font-size: 2rem;
                    color: rgb(74, 74, 74);
                    }
                    .buttons {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    }
                    margin-bottom: .4rem;
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
        margin-bottom: 1rem;
        }
        .bothSide{
            display: flex;
            width: 100%;
            gap: 2rem;
            .images{
                flex: 1;
                height:30vh;
                width: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 1rem;
                }
            }
            .content{
                flex: 2;
                height:25vh;
                background-color : rgb(244,209,202);
                border-radius: .6rem;
                display: flex;
                align-items: flex-end;
                .leftDiv{
                    flex: 2;
                    padding: 1rem 1rem;
                    .mainDiv{
                        margin: 0;
                        display: flex;
                        align-items: center;
                        margin-bottom: .7rem;
                        label{
                            font-size: 1.4rem;
                            color: black;
                            font-weight: 500;
                        }
                        h3{
                            font-size: 1.5rem;
                            color: rgb(74, 74, 74);
                        }
                    }
                }
                .rightDiv{
                    flex: 1;
                    margin-bottom: 1rem;
                    display: flex;
                    justify-content: flex-end;
                    gap: 2rem;
                    margin-right: 2rem;
                    h3{
                        box-shadow: 3px 3px 20px 4px rgb(0, 0, 0, 0.1);
                        padding: .6rem 1.4rem;
                        border-radius: 0.6rem;
                        background: linear-gradient(to right,rgb(74,168,253),rgb(13,97,244));
                        cursor: pointer;
                        color: white;
                        font-size: 1.6rem;
                    }
                }
            }
        }
            }
        }
      }
    }
  }
`;
