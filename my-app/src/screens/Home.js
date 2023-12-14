import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
  const [foodCat, setFoodCat] = useState([])//category
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:3001/api/food-items/get_items", {
      //lahne nbadal response categori kif l9BALHA
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    // console.log(response[1][0].CategoryName)
    setFoodItems(response)
    //setFoodCat(responsecategory)
    //
    // setFoodCat(response[1])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    // console.log(foodItems)
    // console.log(foodCat)

    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box*/ }
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
  {foodItems.length !== 0 ? (
    <>
      {/* Display items for "Biryani/Rice" */}
      <div className='row mb-3'>
        <div className='fs-3 m-3'>
          Biryani/Rice
          <hr
            id="hr-success"
            style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }}
          />
        </div>
        {foodItems
          .filter((item) => item.CategoryName === "Biryani/Rice"  && item.name.toLowerCase().includes(search.toLowerCase()) )
          .map((filteredItem) => (
            <div key={filteredItem.id} className='col-12 col-md-6 col-lg-3'>
              {console.log(filteredItem.url)}
              <Card foodName={filteredItem.name} item={filteredItem} options={filteredItem.options[0]} ImgSrc={filteredItem.img} />
            </div>
          ))}
      </div>

      {/* Display items for "Starter" */}
      <div className='row mb-3'>
        <div className='fs-3 m-3'>
          Starter
          <hr
            id="hr-success"
            style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }}
          />
        </div>
        {foodItems
  .filter((item) => item.CategoryName === "Biryani/Rice" && item.name.toLowerCase().includes(search.toLowerCase()))
  .map((filteredItem, index) => ( // Ajoute une clé unique à chaque élément
    <div key={`${filteredItem.id}-${index}`} className='col-12 col-md-6 col-lg-3'>
      <Card foodName={filteredItem.name} item={filteredItem} options={filteredItem.options[0]} ImgSrc={filteredItem.img} />
    </div>
  ))}
  
      </div>
    </>
  ) : (
    <div>No Such Data</div>
  )}
</div>

      <Footer />
    </div>
    









  )
}
