import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../../components/users/Navbar';
import { useCheckOutSessionPaymentMutation, useFetchUserBookingQuery, useVerifyPaymentQuery } from '../../store/services/bookingService';
import img1 from '../../../public/assets/cardemo.png'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { setSuccess } from '../../store/reducers/globalReducer';
import Spinner from '../../components/users/Spinner';

const StyledMyBookings = styled.div`
  background-color: #F7FAFC;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: max-content;
`;

const StyledBookingCard = styled.div`
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  height: max-content;
  gap: 2rem;
  .left{
      flex: .3;
      img{
          width: 100%;
          height: 100%;
          height: 20rem;
        object-fit: cover;
    }
  }
  .right{
    flex: 1;
  }
`;

const StyledBookingCardHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledBookingCardFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
  gap: 3rem;
  button{
    padding: 0.9rem 1.5rem;
    cursor: pointer;
    background-color: green;
    border-radius: .5rem;
    color: white;
    border: none;
    opacity: ${props => props.response?.isLoading ? "0.3" : "1"};
}

.btn {
    padding: 0.7rem 1.4rem;
    border-radius: 1rem;
    cursor: pointer;
    background-color: blue;
    color: white;
    opacity: ${props => props.response?.isLoading ? "0.3" : "1"};
  }
  .btn2{
    background-color: yellow;
    color: black;
    opacity: ${props => props.response?.isLoading ? "0.3" : "1"};
  }
`

const StyledBookingCardTitle = styled.h3`
  font-size: 2rem;
  margin: 0;
`;

const StyledBookingCardStatus = styled.span`
  font-size: 1.3rem;
  color: ${props => props.status === 'PENDING' ? '#FFC107' : '#4CAF50'};
  font-weight: 900;
`;

const StyledBookingCardBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  .content{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-bottom: .4rem;
    .price{
    font-size: 1.8rem;
    font-weight: 900;
  }
  }
`;

const StyledBookingCardLabel = styled.span`
  font-size: 1.4rem;
  color: #6B7280;
`;

const StyledBookingCardValue = styled.span`
  font-size: 1.6rem;
`;

const Section = styled.div`
    width: 100%;
`

const MyBookings = () => {

    const [params] = useSearchParams();
    const [state, setState] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validateId = params.get('session_id');

    const [checkoutPayment, response] = useCheckOutSessionPaymentMutation();
    console.log(response);
    console.log(response);

    useEffect(() => {
        if (response?.isLoading) {
            setState(true);
        }
        else {
            setState(false)
        }
    }, [response?.isLoading])

    const { user } = useSelector((state) => state.authReducer);
    const { travellers } = useSelector((state) => state.globalReducer);
    const id = user?.id

    const { data, isLoading } = useFetchUserBookingQuery(id);
    console.log(data);

    const handlePayment = (travellers, bookingId, price, packageId) => {
        checkoutPayment({ userid: id, travellers, bookingId, price, packageId });
    }

    console.log(response?.data?.url);

    useEffect(() => {
        if (response?.isSuccess) {
            window.location.href = response.data.url
        }
    }, [response?.isSuccess]);

    const { data: data1, isSuccess } = useVerifyPaymentQuery(validateId, { skip: validateId ? false : true });

    useEffect(() => {
        if (isSuccess) {
            navigate("/mybookings")
            dispatch(setSuccess("Payment done Successfully"));
        }
    }, [isSuccess])

    return (
        <Section>
            <Navbar />
            {!state ? <StyledMyBookings>
                {isLoading && <Spinner/>}
                {!isLoading && data && data?.bookings.map((booking) => (
                    <StyledBookingCard key={booking._id}>
                        <div className="left">
                            <img src={`http://localhost:7800/${booking.image}`} alt="" />
                        </div>
                        <div className="right">
                            <StyledBookingCardHeader>
                                <StyledBookingCardTitle>{booking.packageName}</StyledBookingCardTitle>
                                <StyledBookingCardStatus status={booking.paymentStatus}>{booking.paymentStatus}</StyledBookingCardStatus>
                            </StyledBookingCardHeader>
                            <StyledBookingCardBody>
                                <div className="content">
                                    <StyledBookingCardLabel>Travellers</StyledBookingCardLabel>
                                    {booking.travellers.map((traveller) => (
                                        <StyledBookingCardValue key={traveller.email}>{traveller.email} ({traveller.gender})</StyledBookingCardValue>
                                    ))}
                                </div>
                                <div className="content">
                                    <StyledBookingCardLabel>Starting Date</StyledBookingCardLabel>
                                    <StyledBookingCardValue>{booking.startingDate}</StyledBookingCardValue>
                                </div>
                                <div className="content">
                                    <StyledBookingCardLabel>Total Adults</StyledBookingCardLabel>
                                    <StyledBookingCardValue>{booking.adult}</StyledBookingCardValue>
                                </div>
                                <div className="content">
                                    <StyledBookingCardLabel>Total Childrens</StyledBookingCardLabel>
                                    <StyledBookingCardValue>{booking.children}</StyledBookingCardValue>
                                </div>
                                <div className="content">
                                    <StyledBookingCardLabel>Total Price</StyledBookingCardLabel>
                                    <StyledBookingCardValue className='price'>{Math.floor(booking.totalPrice).toLocaleString("en-IN")}</StyledBookingCardValue>
                                </div>
                            </StyledBookingCardBody>
                            <StyledBookingCardFooter>
                                <Link to={`/package/${booking.packageId}?myParams=${booking.duration}`}><button className='btn'>View Package</button></Link>
                                {booking.paymentStatus === "PENDING" ? <button onClick={() => handlePayment(booking.travellers, booking._id, booking.totalPrice, booking.packageId)}>Make Payment</button> : <button className='btn2'>View Travel Details</button>}
                            </StyledBookingCardFooter>
                        </div>
                    </StyledBookingCard>
                ))}
            </StyledMyBookings> : <Spinner />}
        </Section>
    );
}

export default MyBookings;
