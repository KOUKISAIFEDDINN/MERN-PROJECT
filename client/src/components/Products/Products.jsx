
// import { FaStar } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
import { HeartIcon } from '@heroicons/react/solid';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Products = ({ loggedUser }) => {
  const [products, setProducts] = useState([]);

  const nav = useNavigate()


  const favorite = (oneProduct) => {
    const update = {
      ...oneProduct,
      favorite: !oneProduct.favorite
    }
    axios
      .patch(`http://localhost:9000/api/Product/${oneProduct._id}`, update)
      .then((res) => {
        axios
          .get("http://localhost:9000/api/Product")
          .then((allProducts) => setProducts(allProducts.data))
          .catch((err) => console.log(err));

      })
  }
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/Product")
      .then((allProducts) => setProducts(allProducts.data))
      .catch((err) => console.log(err));
  }, []);


  // !==========Card================
  const getCard = () => {
    let card = localStorage.getItem('card');
    console.log("=========", card);

    if (!card) {
      let card = [];
      card = JSON.stringify(card);
      localStorage.setItem('card', card);
      console.log("+++++++++++++++", JSON.parse(localStorage.getItem('card')));
      return JSON.parse(localStorage.getItem('card'));
    }

    return JSON.parse(card);
  };


  const addToCard = async (obj) => {
    let card = await getCard();
    const existingProductIndex = card.findIndex((prod) => prod.productId === obj._id);

    if (existingProductIndex === -1) {
      // Product not in the cart, add it with quantity 1
      card.push({ ...obj, quantity: 1, productId: obj._id });
    } else {
      // Product is already in the cart, increment the quantity
      card[existingProductIndex].quantity += 1;
    }

    card = JSON.stringify(card);
    localStorage.setItem('card', card);
    return JSON.parse(card);
  };
  { console.log(loggedUser) }
  // !==========Card================


  const gard = () => {
    nav('/login')
  }

  return (

    <div className="mt-14 mb-12 flex justify-center  ">
      <div className="container  ">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">

        </div>
        {/* Body section */}
        <div>
          <div className="flex items-center flex-wrap justify-center gap-10 m-auto">
            {/* card section */}
            {products.map((oneProduct) => (
              // 

              <div class="max-w-xs dark:hover:shadow-lg shadow-lg rounded-lg overflow-hidden my-10">
                <div class="px-4 py-2">
                  <div className="flex justify-between dark:hover:shadow-lg">
                    <h1 class=" font-bold text-3xl uppercase ">{oneProduct.type}</h1>
                    {loggedUser && <>{loggedUser.role === 'user' && <>
                      {oneProduct.favorite ?
                        <button onClick={() => favorite(oneProduct)}>

                          <HeartIcon className="h-6 w-6 text-red-500" />
                        </button> : <button onClick={() => favorite(oneProduct)}>

                          <HeartIcon className="h-6 w-6 text-white-500" />
                        </button>
                      }</>}</>}

                  </div>


                </div>
                <Link to={`/product/${oneProduct._id}`}>
                  {/* <p class=" text-sm mt-1 p-2">{oneProduct.description}</p> */}
                  <img class="h-64 w-full object-cover mt-2" src={oneProduct.image[0]} alt={oneProduct.type} />
                </Link>
                <div class="flex items-center justify-between px-4 py-2 ">
                  <h1 class=" font-bold text-xl">${oneProduct.price}</h1>
                  {loggedUser ?
                    <button onClick={async () => {
                      const updatedCard = await addToCard(oneProduct);
                      console.log(updatedCard);
                      return updatedCard;
                    }} className="bg-purple-700 text-white font-bold py-1 px-4 border rounded ">Add to card</button> : <button onClick={() => gard()} class="bg-purple-700 text-white font-bold py-1 px-4 border rounded ">Add to card</button>}
                </div>

              </div>

            ))}
          </div>


        </div>
      </div>
    </div>

  );
};

export default Products;