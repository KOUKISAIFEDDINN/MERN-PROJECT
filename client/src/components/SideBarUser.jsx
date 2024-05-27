import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import PostList from '../components/Products/Postlist'
const SideBarUser = () => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/postslist');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:9000/api/posts/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:9000/api/users")
            .then((allUsers) => setUsers(allUsers.data))
            .catch((err) => console.log(err));
    }, []);
    const DeleteUser = (id) => {
        axios
            .delete(`http://localhost:9000/api/users/${id}`)
            .then((res) => {
                console.log(res);
                const filteredUsers = users.filter((user) => {
                    return user._id !== id;
                });
                setUsers(filteredUsers);
            })
            .catch((err) => console.log(err));
    };
    const [posts, setPosts] = useState([]);
    return (
        <div className="flex sticky top-20">
            <div className="w-full max-w-4xl p-4 bg-white rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {posts.map(post => (
                            <li key={post._id} className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Google Logo" />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {post.title}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {post.content}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">

                                    </div>
                                    <button onClick={() => handleDelete(post._id)} className="bg-purple-700 text-white font-bold py-1 px-4 border rounded ">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <li>
                    <Link to={'/goback'}>
                        <span >
                            <button className="flex rounded-md p-2 text-blue-500 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 hover:text-gray-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                    />
                                </svg>
                                Back To Home Page
                            </button>
                        </span>

                    </Link>
                </li>
            </div>


        </div >

    );
}

export default SideBarUser;
