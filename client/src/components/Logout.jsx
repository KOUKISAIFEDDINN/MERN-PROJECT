import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logout = () => {
    const navigate = useNavigate();

    const popUp = async (event) => {
        event.preventDefault();

        const result = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            logout();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Cancelled',
            });
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:9000/api/logout', {}, { withCredentials: true });
            localStorage.removeItem('token');
            localStorage.removeItem('card');
            navigate(window.location.href = '/')
        } catch (error) {
            console.log('Error', error);
        }
    };

    return (
        <button className='btn btn-danger font-bold' onClick={popUp}>
            Logout
        </button>
    );
};

export default Logout;
