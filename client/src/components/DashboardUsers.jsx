import { useState, useEffect } from "react";
import axios from "axios";
import PostList from '../components/Products/Postlist'
// import { useNavigate } from "react-router-dom";
const DashboardUsers = () => {
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
  return (
    <div className="p-10">


      <table className=" border-collapse  md:table  mt-5 w-full ">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative w-full">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Username
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Email
            </th>

            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Role
            </th>


            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group ">
          {users.map((oneUser) => {
            return (
              <tr
                key={oneUser._id}
                className=" border border-grey-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {/* <img className="w-8 h-8 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Google Logo" /> */}
                  {oneUser.username}

                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell ">
                  {oneUser.email}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell ">
                  {oneUser.role}
                </td>

                <td className="p-2 md:border md:border-grey-500 text-left md:table-cell  ">
                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() => DeleteUser(oneUser._id)}
                      className="bg-purple-700 text-white font-bold py-1 px-4 border rounded "
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>

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
      </div>


    </div>
  );
};

export default DashboardUsers;