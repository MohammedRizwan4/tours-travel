import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Spinner from '../../../components/users/Spinner';
import { useDeleteUserMutation } from '../../../store/services/adminUserService';
import { useDeletePackageMutation, useFetchAllPackagesQuery } from '../../../store/services/packageService';
import { useFetchAllThemesQuery, useFetchOneThemeQuery } from '../../../store/services/themeService';
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminSubPackage = () => {

    const { data, isFetching } = useFetchAllPackagesQuery();

    const exportPDF = () => {
        const unit = "pt";
        const size = [window.screen.availWidth, window.screen.availHeight];
        const orientation = "landscape";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(6);

        const title = "Packages Report";

        const headers = [["ID", "Theme Of", "Package name", "City","State", "Total Destinations", "Starting Point", "Ending Point", "Date", "Stars", "Durations"]];

        const data1 = rows.map(elt => [elt._id,
        data?.themes?.find(t => t._id === elt.theme_id)?.name
            , elt.name, elt.location.city,elt.location.state_name, elt.destinations_covered.map(destination => destination), elt.starting_point, elt.ending_point, elt.date.slice(0, 15), elt.stars, elt.details.map(detail => detail.duration)]);

        // const headers = [["ID", "Package name", "City", "Starting Point", "Stars", "Durations"]];

        // const data = rows.map(elt => [elt._id, elt.name, elt.location.city, elt.starting_point, elt.stars, elt.details.map(detail => detail.duration)]);

        let content = {
            startY: 50,
            head: headers,
            body: data1
        };


        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }


    let [rows, setRows] = useState([])
    console.log(data?.data);
    const [deletePackage, response] = useDeletePackageMutation();

    const handleDelete = (e, id) => {
        deletePackage({ id })
    }

    useEffect(() => {
        if (data?.data) {
            setRows(data.data);
        }
    }, [data]);

    console.log(data?.themes);

    rows = data?.data || [];


    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        {
            field: 'edit',
            headerName: 'Edit Package',
            width: 150,
            renderCell: (params) => {
                return (
                    <Link to={`/dashboard/update-package/${params.row._id}`} style={{ padding: "1rem 3rem", color: "var(--bgDarkViolet)", fontWeight: "700", margin: "2rem", cursor: "pointer", backgroundColor: "var(--bgYellow)", border: "2px solid var(--bgBlack)", borderRadius: "1.2rem", }}>Edit</Link>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'Delete Package',
            width: 150,
            renderCell: (params) => {
                const id = params.row._id;
                return (
                    <button onClick={(e) => handleDelete(e, id)} style={{ padding: "1rem 3rem", color: "white", fontWeight: "700", margin: "2rem", cursor: "pointer", backgroundColor: "red", border: "2px solid var(--bgBlack)", borderRadius: "1.2rem", }}>Delete</button>
                )
            }
        },
        {
            field: 'name',
            headerName: 'Package Name',
            width: 300,
            editable: true,
        },
        {
            field: 'images',
            headerName: 'Images',
            width: 300,
            renderCell: (params) => {
                return (
                    <>
                        <img src={`http://localhost:7800/${params.row.images[0]}`} alt="thumbnail" style={{ width: '5rem', height: "5rem", objectFit: "cover" }} />
                        <img src={`http://localhost:7800/${params.row.images[1]}`} alt="thumbnail" style={{ width: '5rem', height: "5rem", objectFit: "cover" }} />
                        <img src={`http://localhost:7800/${params.row.images[2]}`} alt="thumbnail" style={{ width: '5rem', height: "5rem", objectFit: "cover" }} />
                        <img src={`http://localhost:7800/${params.row.images[3]}`} alt="thumbnail" style={{ width: '5rem', height: "5rem", objectFit: "cover" }} />
                        <img src={`http://localhost:7800/${params.row.images[4]}`} alt="thumbnail" style={{ width: '5rem', height: "5rem", objectFit: "cover" }} />
                    </>
                )
            }
        },
        {
            field: 'theme_id',
            headerName: 'Theme of',
            width: 230,
            renderCell: (params) => {
                const themeId = params.row.theme_id
                const theme = data?.themes?.find(t => t._id === themeId)
                console.log(theme);
                return (
                    <div>{theme.name}</div>
                )
            }
        },
        {
            field: 'city',
            headerName: 'City',
            width: 150,
            renderCell: (params) => {
                const city = params.row.location.city;
                return (
                    <div>{city}</div>
                )
            }
        },
        {
            field: 'state_name',
            headerName: 'State',
            width: 130,
            renderCell: (params) => {
                const state = params.row.location.state_name;
                return (
                    <div>{state}</div>
                )
            }
        },
        {
            field: 'destinations_covered',
            headerName: 'Total Destinations',
            width: 230,
            renderCell: (params) => {
                const destinations_covered = params.row.destinations_covered;
                return (
                    <ul style={{ display: "flex", gap: "1rem" }}>{
                        destinations_covered.map((destination) => {
                            return (
                                <li style={{ listStyleType: "none" }}>• {destination}</li>
                            )
                        })
                    }</ul>
                )
            }
        },
        {
            field: 'starting_point',
            headerName: 'Starting Point',
            width: 230,
            renderCell: (params) => {
                const starting_point = params.row.starting_point;
                return (
                    <div>{starting_point}</div>
                )
            }
        },
        {
            field: 'ending_point',
            headerName: 'Ending Point',
            width: 230,
            renderCell: (params) => {
                const ending_point = params.row.ending_point;
                return (
                    <div>{ending_point}</div>
                )
            }
        },
        // {
        //     field: 'accommodations',
        //     headerName: 'Available Accommodations',
        //     width: 230,
        //     renderCell: (params) => {
        //         const accommodations = params.row.accommodations;
        //         return (
        //             <ul style={{ display: "flex", gap: "1rem" }}>{
        //                 accommodations?.map((accommodation) => {
        //                     return (
        //                         <li style={{ listStyleType: "none" }}>• {accommodation}</li>
        //                     )
        //                 })
        //             }</ul>
        //         )
        //     }
        // },
        {
            field: 'stars',
            headerName: 'Stars',
            width: 30,
            renderCell: (params) => {
                const stars = params.row.stars;
                return (
                    <div>{stars}</div>
                )
            }
        }
    ];

    return (
        <>
            <Section>
                <div className="add">
                    <Link to="/dashboard/add-package"><button>Add Package</button></Link>
                </div>
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
                    marginTop: "5.5rem"
                }} onClick={exportPDF}>Export</button>
            </Section>
        </>
    );
}

export default AdminSubPackage;

const Section = styled.div`
    flex: 7;
    background-color: var(--bgWhite);
    color: white;
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
        padding: 0 var(--r4);
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



