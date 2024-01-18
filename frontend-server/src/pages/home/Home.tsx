import React from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import FeaturedCountries from '../../components/featuredProperties/FeaturedCountries'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Country List</h1>
        <FeaturedCountries />
        <Footer />
      </div>
    </div>
  )
}

export default Home
