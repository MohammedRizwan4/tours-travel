import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useDeleteThemeMutation, useFetchAllThemesQuery } from '../../../store/services/themeService';
import Spinner from '../../../components/users/Spinner';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../../store/services/adminUserService';
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminSubUsers = () => {

    let [rows, setRows] = useState([])

    const [deleteUser, response] = useDeleteUserMutation();

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Users Report";

        const headers = [["ID", "First Name", "Last Name", "Email", "Admin"]];

        const data = rows.map(elt => [elt._id, elt.firstName, elt.lastName, elt.email, elt.admin]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };


        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    const handleDelete = (e, id, isAdmin) => {
        if (isAdmin) {
            alert("hello")
        }
        else {
            console.log(id);
            deleteUser({ id })
        }
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 230,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 230,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email ID',
            width: 280,
            editable: true,
        },
        {
            field: 'admin',
            headerName: 'Admin',
            width: 70,
            editable: true,
        },
        {
            field: 'edit',
            headerName: 'Edit User',
            width: 150,
            renderCell: (params) => {
                return (
                    <Link to={`/dashboard/updateuser/${params.id}`} style={{ padding: "1rem 3rem", color: "var(--bgDarkViolet)", fontWeight: "700", margin: "2rem", cursor: "pointer", backgroundColor: "var(--bgYellow)", border: "2px solid var(--bgBlack)", borderRadius: "1.2rem", }}>Edit</Link>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'Delete User',
            width: 150,
            renderCell: (params) => {
                return (
                    <button onClick={(e) => handleDelete(e, params.id, params.admin)} style={{ padding: "1rem 3rem", color: "white", fontWeight: "700", margin: "2rem", cursor: "pointer", backgroundColor: "red", border: "2px solid var(--bgBlack)", borderRadius: "1.2rem", }}>Delete</button>
                )
            }
        },
    ];

    const { data, isFetching } = useGetAllUsersQuery();

    useEffect(() => {
        if (data?.users) {
            setRows(data.users);
        }
    }, [data]);

    rows = data?.users || [];

    return (
        <>
            <Section>
                <div className="add">
                    <Link to="/dashboard/add-users"><button>Add Users</button></Link>
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
                    marginTop: "3.5rem"
                }} onClick={exportPDF}>Export</button>
            </Section>
        </>
    );
}

export default AdminSubUsers;

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

