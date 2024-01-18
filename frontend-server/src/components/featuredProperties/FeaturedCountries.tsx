import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import './featuredCountries.css'
import { Link } from 'react-router-dom'

interface Country {
  id: number
  name: string
  emoji: string
  native: string
  iso2: string
}

const FeaturedCountries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/countries')
        setCountries(response.data.data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchData()
  }, [])

  const totalPages = Math.ceil(countries.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, countries.length)
  const currentCountries = countries.slice(startIndex, endIndex)

  const paginate = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1)
  }

  const renderCountries = () => {
    return currentCountries.map((country) => (
      <div key={country.id} className="col-md-3 mb-4">
        <div className="card">
          <img
            src={`https://flagcdn.com/192x144/${country.iso2.toLowerCase()}.png`}
            alt={country.name}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">
              {country.name} {country.emoji}
            </h5>
            <p className="card-text">{country.native}</p>
            <Link
              to={`/countries/${country.id}/${country.name}`}
              className="btn btn-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className="container my-4">
      <div className="row">{renderCountries()}</div>
      <div className="d-flex justify-content-center my-4">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          onPageChange={paginate}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  )
}

export default FeaturedCountries
