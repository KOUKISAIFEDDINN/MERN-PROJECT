import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const Create = () => {
  const [formdata, setFormData] = useState({
    type: "",
    image: [],
    quantity: "",
    price: "",
    description: ""

  })

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? Array.from(files) : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata1 = new FormData();
    formdata1.append("type", formdata.type)
    formdata1.append("quantity", formdata.quantity)
    formdata1.append("price", formdata.price)
    formdata1.append("description", formdata.description)


    for (let i = 0; i < formdata.image.length; i++) {
      // newarr.push(selectedFile[i]);
      formdata1.append('files', formdata.image[i]);
    }
    axios
      .post("http://localhost:9000/api/Product", formdata1)
      .then((res) => {
        navigate("/admin");
      })
      .catch(err => {
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message)
        }
        // Set Errors
        setErrors(errorArr);
      })
    setFormData({
      type: "",
      image: [],
      quantity: "",
      price: "",
      description: ""

    })

  };
  return (
    <>
      <br />
      <br />

      <div className='pl-80 pr-10 flex items-center  justify-between '>

        <form

          onSubmit={handleSubmit}
          className="p-9  shadow-lg  mt-10 "
        >
          <h1 className="text-xl font-semibold mb-4">Add A New Product:</h1>
          {errors.map((err, index) => <p key={index} className="text-red-600 mb-6">{err}</p>)}

          <div className="mb-4">
            <label>Type:</label>

            <input
              onChange={handleChange}
              type="text"
              name='type'
              className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label>Image:</label>


            <input
              multiple
              onChange={handleChange}
              type="file"
              name='image'
              accept="image/*"
              className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label>Quantity:</label>

            <input
              onChange={handleChange}
              type="text"
              name='quantity'
              className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label>Price:</label>

            <input
              onChange={handleChange}
              type="text"
              name='price'
              className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label>Description:</label>

            <textarea
              onChange={handleChange}
              type="text"
              name='description'
              className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-around gap-5">

            <button className="bg-purple-700 text-white font-bold py-1 px-4 border rounded ">
              Submit
            </button>
          </div>
        </form>
        <div className='border-1  justify-end'>
          {formdata.image.length > 0 ? (
            <>
              <img className='w-60' src={URL.createObjectURL(formdata.image[0])} alt="error!" />
            </>
          ) : (
            <p>Product image upload preview will appear here!</p>
          )}
        </div>
      </div>
      <br />

    </>
  )
}

export default Create