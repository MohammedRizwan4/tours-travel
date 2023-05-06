import { Fade, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import img1 from './download1.jfif';
import Backdrop from '@mui/material/Backdrop';
import Register from '../../components/Register';
import TravellerModal from './TravellerModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, decreaseTravelDetail, setActiveTraveller, setSuccess, setTravelDetail } from '../../store/reducers/globalReducer';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: "85%",
    width: "60%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: "none"
};

const Traveller = ({ traveller, index }) => {

    const { travellers, travelDetail } = useSelector(state => state.globalReducer);

    const check = () => {
        if (travellers[index].email && travellers[index].name && travellers[index].mobile && travellers[index].gender) {
            return true;
        }
        return false
    }

    const dispatch = useDispatch();

    

    return (
        <>
            <div className="traveller" onClick={() => {
                dispatch(setTravelDetail())
                dispatch(setActiveTraveller({ index }))
            }}>
                <img src={img1} alt="" />
                <div className="name">
                    <h4>Traveller {index + 1}</h4>
                    <h2>{traveller.name ? traveller.name : "Add Traveller"}</h2>
                </div>
                <div className="desc">
                    <p>{traveller?.type.toUpperCase()} - should be {traveller.type === "children" ? "below" : "above"} 18 years</p>
                </div>
                {check() && <div className="profile">
                    <div className="circle"><CheckOutlinedIcon style={{ color: "green", fontSize: ".7rem", fontWeight: "900" }} /></div>
                    <h3>Profile Completed</h3>
                </div>}
            </div>
            <hr />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={travelDetail}
                onClose={() => dispatch(decreaseTravelDetail())}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={travelDetail}>
                    <Box sx={style} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <TravellerModal />
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default Traveller;
