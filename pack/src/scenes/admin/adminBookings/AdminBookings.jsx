import React from 'react';
import styled from 'styled-components';
import AdminNav from '../../../components/admin/AdminNav';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminSubBookings from './AdminSubBookings';

const AdminBookings = () => {

    return (
        <Section>
            <AdminNav />
            <div className="main">
                <AdminSidebar />
                <AdminSubBookings />
            </div>
        </Section>
    );
}

export default AdminBookings;

const Section = styled.div`
    background-color: var(--bgWhite);
    color: white;
    .main{
        display: flex;
    }
`

