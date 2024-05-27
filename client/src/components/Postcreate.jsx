// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const PostForm = ({ fetchPosts }) => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     // const [author, setAuthor] = useState(null);
//     const { userID } = useParams();

//     // useEffect(() => {
//     //     axios.get("http://localhost:9000/api/user")
//     //         .then((res) => setAuthor(res.data)) // Assuming author's info is under 'data' property
//     //         .catch((err) => console.log(err));
//     // }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:9000/api/posts', { title, content });
//             fetchPosts(); // Fetch posts after creating a new one
//             setTitle('');
//             setContent('');
//         } catch (error) {
//             console.error('Error creating post:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Create New Post</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Title:</label>
//                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Content:</label>
//                     <textarea value={content} onChange={(e) => setContent(e.target.value)} />
//                 </div>
//                 <button type="submit">Create Post</button>
//             </form>
//         </div>
//     );
// };

// export default PostForm;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: ""
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const [loggedUser, setLoggedUser] = useState(null); // Initialize loggedUser state
    const token = localStorage.getItem('token')
    useEffect(() => {
        const GetLoggedUser = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/user', { withCredentials: true });
                console.log('Server Response:', response);

                const { token, loggedUser } = response.data;
                setLoggedUser(loggedUser);
                setFormData((formData) => ({
                    ...formData,
                    author: response.data._id
                }))
            } catch (error) {
                console.log('Frontend Request Error:', error);
            }
        };

        if (token) {
            GetLoggedUser();
        }
    }, [token]);
    // useEffect(() => {
    //     axios
    //         .get(`/api/user`, { withCredentials: true })
    //         .then((one) => {
    //             console.log("aaazasdkbfqulswbgdflgfswdmv", one);
    //             setFormData((formData) => ({
    //                 ...formData,
    //                 author: one._id
    //             }))
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const token = localStorage.getItem('token'); // Get the JWT token from localStorage
        // console.log("userToken --------- ", token);
        // console.log("localstorage --------- ", localStorage);

        // const config = {
        //     headers: {
        //         "Authorization": `Bearer ${token}`, // Include the JWT token in the request headers
        //     },
        // };
        axios
            .post('http://localhost:9000/api/posts', formData)
            .then((res) => {
                navigate('/posts');
            })
            .catch((err) => {
                console.log("aaaaaaaaaaaaaaaaa")
                const errorResponse = err.response.data.error;
                setErrors([errorResponse]);
            });
        setFormData({
            title: '',
            content: '',
        });
    };
    const popUp = async (event) => {
        event.preventDefault();

        const result = await Swal.fire({
            title: 'Are you sure you want to logout?',
            text: "your cart will be removed if Loged out !!!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            logout();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Cancelled',
                text: 'Your session is safe :)',
                icon: 'error',
            });
        }
    };

    return (
        <>

            <br />
            <br />
            <br />

            <div style={{ flex: 1, marginLeft: '0.5rem', marginRight: '0.5rem', padding: '0.5rem', border: 'none', outline: 'none' }}>
                <form onSubmit={handleSubmit} className="p-9  shadow-lg  mt-10 ">
                    <h1 className="text-xl font-semibold mb-4">quick problem message :</h1>
                    {errors.map((error, index) => (
                        <p key={index} className="text-red-600 mb-6">
                            {error}
                        </p>
                    ))}
                    <div className="mb-4">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content">The problem:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div className="flex justify-around gap-5">
                        <button type="submit" className="bg-purple-700 text-white font-bold py-1 px-4 border rounded ">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <br />
            <br />
            <br />
            <br />
        </>
    );
};

export default PostForm;



