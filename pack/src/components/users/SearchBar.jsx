import React, { useState } from "react";
import styled from "styled-components";
import GridViewIcon from '@mui/icons-material/GridView';

const SearchBar = ({ packages }) => {

    const [state, setState] = useState({
        starting: packages ? packages[0]?.starting_point : "",
        destination: packages ? packages[0]?.ending_point : ""
    })

    const handleChange = e => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Section className="searchContainer">
            <div className="container">
                <div className="left">
                    <div className="box">
                        <label htmlFor="">Starting From</label>
                        <input
                            type="text"
                            name="starting"
                            value={state.starting.slice(0,17)+".."}
                            onChange={(e) => handleChange(e)}
                            disabled
                        />
                    </div>
                    <div className="box">
                        <label htmlFor="">Going to</label>
                        <input
                            type="text"
                            name="destination"
                            value={state.destination.slice(0,17)+".."}
                            disabled
                        />
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
        </Section>
    );
};

export default SearchBar;

const Section = styled.div`
  height: 10vh;
  width: 100%;
  background-color: rgb(10, 34, 61);
  position: sticky;
  .container {
    max-width: 80%;
    height: 10vh;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      .box {
        border-radius: 0.4rem;
        background-color: rgba(255, 255, 255, 0.1);
        height: 100%;
        width: max-content;
        width: 20rem;
        padding: 0.3rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 0.3rem;
        label {
          color: rgb(0, 140, 255);
          font-size: 1.2rem;
          text-transform: uppercase;
        }
        input {
          border: none;
          outline: none;
          padding: 0.3rem 0.3rem;
          font-size: 1.6rem;
          font-weight: 500;
          background-color: rgba(255, 255, 255, 0);
          color: white;
        }
      }
      button {
        font-size: 2rem;
        padding: 1rem 5rem;
        border-radius: 3rem;
        font-weight: 900;
        cursor: pointer;
        text-transform: uppercase;
        color: white;
        background-image: linear-gradient(93deg, #53b2fe, #065af3),
          linear-gradient(93deg, #53b2fe, #065af3);
      }
    }
    .right {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      color: white;
      cursor: pointer;
    }
  }
`;
