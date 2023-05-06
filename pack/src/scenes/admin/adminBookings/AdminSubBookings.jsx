import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useDeleteThemeMutation, useFetchAllThemesQuery } from '../../../store/services/themeService';
import Spinner from '../../../components/users/Spinner';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../../store/services/adminUserService';
import { useGetAllBookingsQuery } from '../../../store/services/bookingService';
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminSubBookings = () => {

    let [rows, setRows] = useState([])

    const exportPDF = () => {
        const unit = "pt";
        const size = [window.screen.availWidth, window.screen.availHeight];
        const orientation = "landscape";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(20);
        const title = "Bookings Report";

        const headers = [["ID", "Package name", "Adult", "Children", "Total Price", "Travellers", "Room", "Date", "Payment Status"]];

        const data1 = rows.map(elt => [elt._id, elt.packageName, elt.adult, elt.children, elt.totalPrice, elt.travellers.map(traveller => traveller.name), elt.room, elt.startingDate.slice(0, 15), elt.paymentStatus]);

        let content = {
            startY: 50,
            head: headers,
            body: data1
        };


        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    const [deleteUser, response] = useDeleteUserMutation();

    const { data: data1, isFetching: isFetching1 } = useGetAllBookingsQuery();
    console.log(data1);

    const handleDelete = (e, id) => {
        console.log(id);
        deleteUser({ id })
    }

    const columns = [
        { field: '_id', headerName: 'Booking ID', width: 100 },
        { field: 'userId', headerName: 'User ID', width: 100 },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 130,
            renderCell: (params) => {
                const paymentStatus = params.row.paymentStatus;
                return paymentStatus === "PAID" ? <p style={{ fontWeight: "900", color: "green" }}>{paymentStatus}</p> : <p style={{ fontWeight: "900", color: "red" }}>{paymentStatus}</p>
            }
        },
        {
            field: 'adult',
            headerName: 'Adult',
            width: 70,
            editable: true,
        },
        {
            field: 'children',
            headerName: 'Children',
            width: 100,
            editable: true,
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: 100,
            renderCell: (params) => {
                const totalPrice = params.row.totalPrice;
                const paymentStatus = params.row.paymentStatus;
                return paymentStatus === "PAID" ? <p style={{ fontWeight: "900", color: "green" }}>₹{totalPrice}</p> : <p style={{ fontWeight: "900", color: "red" }}>₹{totalPrice}</p>
            }
        },
        {
            field: 'packageName',
            headerName: 'Package Name',
            width: 280,
            editable: true,
        },
        {
            field: 'travellers',
            headerName: 'Travellers',
            width: 150,
            renderCell: (params) => {
                const travellers = params.row.travellers;
                return (
                    <ul style={{ display: "flex", gap: "1rem" }}>{
                        travellers.map((traveller) => {
                            return (
                                <li style={{ listStyleType: "none" }}>• {traveller.name}</li>
                            )
                        })
                    }</ul>
                )
            }
        },
        {
            field: 'user_contact_info',
            headerName: 'Contact Info',
            width: 300,
            renderCell: (params) => {
                const contact = params.row.user_contact_info;
                return (
                    <ul style={{ display: "flex", gap: "1rem" }}>
                        <li style={{ listStyleType: "none" }}>• {contact.email}</li>
                        <li style={{ listStyleType: "none" }}>• {contact.name}</li>
                        <li style={{ listStyleType: "none" }}>• {contact.mobile}</li>
                        <li style={{ listStyleType: "none" }}>• {contact.spMessage}</li>
                    </ul>
                )
            }
        },
        {
            field: 'startingDate',
            headerName: 'Starting Date',
            width: 230,
            editable: true,
        }
    ];

    const { data, isFetching } = useGetAllUsersQuery();

    useEffect(() => {
        if (data1?.bookings) {
            setRows(data1.bookings);
        }
    }, [data1]);

    rows = data1?.bookings || [];

    return (
        <>
            <Section>
                <div className="title">Bookings</div>
                <div className="content">
                    {
                        isFetching ?
                            <Spinner /> : data && <Box sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    sx={{ fontSize: "1.5rem" }}
                                    rows={rows.map(row => ({ ...row, id: row._id }))}
                                    columns={columns}
                                    pageSize={6}
                                    autoHeight
                                    rowsPerPageOptions={[6]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    experimentalFeatures={{ newEditingApi: true }}
                                />
                            </Box>
                    }
                </div>
                <button style={{
                    padding: ".7rem 3rem",
                    marginLeft: "5rem",
                    backgroundColor: "var(--bgYellow)",
                    border: "none",
                    color: "var(--bgDarkAdmin)",
                    fontWeight: "900",
                    fontSize: "1.7rem",
                    borderRadius: ".8rem",
                    border: "1px solid var(--bgBorder)",
                    cursor: "pointer",
                    marginTop: "8rem"
                }} onClick={exportPDF}>Export</button>
            </Section>
        </>
    );
}

export default AdminSubBookings;

const Section = styled.div`
    flex: 7;
    background-color: var(--bgWhite);
    color: white;
    .title{
        color: var(--bgDarkBlue);
        font-size: 3rem;
        font-weight: 900;
        padding: var(--r1) var(--r4);
    }
    .add{
        margin: var(--r2) var(--r2);
        height: var(--r7);
        width: 97%;
        background-color: var(--bgWhite);
        display: flex;
        border-radius: var(--r-75);
        align-items: center;
        button{
            background-color: var(--bgYellow);
            padding: var(--r1-25) var(--r3);
            font-size: var(--r1-75);
            font-weight: 700;
            color: var(--bgVioletAdmin);
            border: none;
            margin-left: var(--r2);
            border-radius: var(--r-75);
            cursor: pointer;
            &:hover{
                box-shadow: -2px -1px 30px -2px rgba(0,0,0,0.48);
                -webkit-box-shadow: -2px -1px 30px -2px rgba(0,0,0,0.48);
                -moz-box-shadow: -2px -1px 30px -2px rgba(0,0,0,0.48);
            }
        }
    }
    .content{
        padding: var(--r2) var(--r4);
        color: black;
        .MuiTablePagination-displayedRows{
            font-size: var(--r1-25);
        }
        .MuiSvgIcon-root{
            font-size: var(--r2);
        }
        .css-i4bv87-MuiSvgIcon-root{
            font-size: 2.3rem;
        }
    }
`

