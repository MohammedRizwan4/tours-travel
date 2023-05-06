import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, decreaseTravelDetail, setActiveTraveller, setSuccess, updateTraveller } from '../../store/reducers/globalReducer';

const TravellerModal = () => {
    const { travelDetail, travellers, activeTraveller } = useSelector(state => state.globalReducer);

    const dispatch = useDispatch();

    const [state, setState] = useState(travellers[activeTraveller]);

    const handleUpdateTraveller = e => {
        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        setState(travellers[activeTraveller]);
    }, [activeTraveller])


    const handleSubmit = () => {
        dispatch(clearMessage());
        dispatch(setSuccess("Traveller added Successfully"));
        dispatch(updateTraveller({ index: activeTraveller, email: state.email, name: state.name, mobile: state.mobile, gender: state.gender }))
        if (check3()) {
            dispatch(decreaseTravelDetail());
            console.log("sahbhjabcajsbc hsbc hsakcbsahcjkbaschjsabckiabcshaybcyujdschbsdhjcjs");
        }
    }

    const check = () => {
        if (!travellers[activeTraveller].email && !travellers[activeTraveller].name && !travellers[activeTraveller].mobile && !travellers[activeTraveller].gender) {
            return false
        }
        return true;
    }

    const check1 = () => {
        if (state.email === travellers[activeTraveller].email && state.name === travellers[activeTraveller].name && state.mobile === travellers[activeTraveller].mobile && state.gender === travellers[activeTraveller].gender) {
            return true;
        }
        if (state.email && state.name && state.mobile && state.gender) {
            return false;
        }
        return true;
    }

    const check3 = () => {
        const allTravellersFilled = travellers.every(traveller => traveller.email && traveller.name && traveller.mobile && traveller.gender);
        return allTravellersFilled;
    };

    // useEffect(() => {
    //     if(travelDetail && check3()) {
    //         dispatch(decreaseTravelDetail());
    //     }
    // },[travelDetail])

    return (
        <Section>
            <div className="firstDiv">
                <h3>Add Traveler Details</h3>
                <CloseIcon onClick={() => {
                    dispatch(decreaseTravelDetail())
                }} style={{ color: "rgb(74,74,74)", fontSize: "2rem", cursor: "pointer" }} />
            </div>
            <hr />
            <div className="titleName">
                <h3>Traveller 1</h3> <span>/2</span>
            </div>
            <div className="list">
                {
                    travellers?.map((traveller, index) => {
                        const got = activeTraveller == index;
                        return (
                            <div style={{ backgroundColor: got ? "rgb(234,245,255)" : "" }} className="box" onClick={() => dispatch(setActiveTraveller({ index }))}>
                                <Person2OutlinedIcon style={{ color: "rgb(50,162,254)", fontSize: "2rem", cursor: "pointer" }} />
                                <h3>Adult {index + 1}</h3>
                            </div>
                        )
                    })
                }
            </div>
            <div className="line"></div>
            <div className="h3">Mandatory Information</div>
            <hr />
            <label htmlFor="">Please enter Mandatory Information</label>
            <form action="">
                <div className="content">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" value={state.email} placeholder="Eg. john.doe@gmail.com" onChange={(e) => handleUpdateTraveller(e)} />
                </div>
                <div className="content">
                    <label htmlFor="">Traveller name</label>
                    <input type="text" name="name" value={state.name} onChange={(e) => handleUpdateTraveller(e)} />
                </div>
                <div className="content">
                    <label htmlFor="">Mobile</label>
                    <input type="text" name="mobile" value={state.mobile} placeholder="Eg. 96203 37826" onChange={(e) => handleUpdateTraveller(e)} />
                </div>
            </form>
            <form action="">
                <div className="content">
                    <label htmlFor="">Gender</label>
                    <input type="text" name="gender" value={state.gender} placeholder="Eg. Gender" onChange={(e) => handleUpdateTraveller(e)} />
                </div>
            </form>
            <center><button disabled={check1()} className={check1() ? "check" : ""} onClick={() => handleSubmit()}>{check() ? "Update Traveller" : "Add Traveller"} </button></center>
        </Section>
    );
}

export default TravellerModal;

const Section = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    outline: none;
    border: none;
    .firstDiv{
        padding: 3rem 3rem 0 3rem;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        h3{
            font-size: 2.5rem;
            color: rgb(74,74,74);
        }
    }
    hr{
        padding: 0;
        margin: 0;
        margin: 2rem 0;
        width: 100%;
        background-color: rgb(251,251,251);
    }
    .titleName{
        padding: 0 3rem;
        display: flex;
        align-items: flex-end;
        gap: .3rem;
        width: 100%;
        background-color: rgb(251,251,251);
        h3{
            font-size: 2.6rem;
            color: rgb(74,74,74);
        }
        span{
            color: rgb(74,74,74);
            font-size: 1.4rem;
            margin-bottom: .5rem;
        }
    }
    .list{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: .8rem;
        width: 100%;
        background-color: rgb(251,251,251);
        padding: 2rem 3rem;
        .box{
            padding: 2rem 1.5rem;
            display: flex;
            cursor: pointer;
            flex-direction: column;
            align-items: center;
            border: 1px solid rgb(50,162,254);
            border-radius: .4rem;
            h3{
                color: rgb(50,162,254);
                font-size: 1.4rem;
                text-transform: uppercase;
            }
        }
    }
    .line{
        width: 100%;
        height: 1rem;
        background-color: rgb(151,151,151,.1);
    }
    .h3{
        padding: 0 3rem;
        font-size: 2rem;
        color: rgb(74,74,74);
        font-weight: 900;
        margin-top: 1.5rem;
    }
    label{
        padding: 0 3rem;
        font-size: 1.5rem;
        color: rgb(74,74,74);
    }
    form{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 3rem;
        margin-top: 1.4rem;
        .content{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            label{
                padding: 0;
                margin: 0;
                color: rgb(151,151,151);
                font-weight: 900;
            }
            input{
                width: 27.5rem;
                padding: 1rem 2rem;
            }
        }
    }
    center{
        .check{
            opacity: .6;
        }
    }
    button{
        margin-top: 2rem;
        padding: 1.3rem 6rem;
        border-radius: 1rem;
        background: linear-gradient(to right,rgb(79,173,253),rgb(10,94,244));
        border: none;
        cursor: pointer;
        font-size: 2rem;
        font-weight: 900;
        color: white;
    }
    
`

