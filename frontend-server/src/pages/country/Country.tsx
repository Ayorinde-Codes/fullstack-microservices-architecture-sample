import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './country.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom'

interface countryProps {
  id?: string
  name?: string
}

const Country: React.FC<countryProps> = () => {
  const { name } = useParams<{ name: string; id: string }>()

  const [additionalDetails, setAdditionalDetails] = useState<{
    name?: string
    region?: string
    subregion?: string
    currency?: string
    population?: string
    worldPercentPopulation?: string
    countrySquare?: string
    gdpNominal?: string
    gdpPPP?: string
    flag?: string
    exportsVolume?: {
      rank?: string
      valueExported?: string
    }
  }>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:4001/api/country/details',
          {
            countryName: name,
          },
        )
        const countryDetails = response.data.data.data

        setAdditionalDetails({
          name: countryDetails.name || '',
          region: countryDetails.countryDetails?.region || '',
          subregion: countryDetails.countryDetails?.subregion || '',
          currency: countryDetails.countryDetails?.currency || '',
          population: countryDetails.countryDetails?.population || '',
          worldPercentPopulation:
            countryDetails.countryDetails?.worldPercentPopulation || '',
          countrySquare: countryDetails.countryDetails?.countrySquare || '',
          gdpNominal: countryDetails.countryDetails?.gdp_nominal || '',
          gdpPPP: countryDetails.countryDetails?.gdp_ppp || '',
          flag: countryDetails.countryDetails?.flag || '',
          exportsVolume: {
            rank: countryDetails.countryDetails?.exportsVolume?.rank || '',
            valueExported:
              countryDetails.countryDetails?.exportsVolume?.valueExported || '',
          },
        })
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchData()
  }, [name])

  console.log('additionalDetails:', additionalDetails)

  return (
    <div>
      <Navbar />
      <Header />
      <div className="countryContainer">
        <div className="countryWrapper">
          <div className="countryDetails">
            <div className="countryDetailsTexts">
              <h1 className="countryTitle">Country Enquiry</h1>
              <h1>{additionalDetails?.name}</h1>
              <ul>
                <li>Region: {additionalDetails?.region}</li>
                <li>Subregion: {additionalDetails?.subregion}</li>
                <li>Currency: {additionalDetails?.currency}</li>
                <li>Population: {additionalDetails?.population}</li>
                <li>
                  World Percent Population:{' '}
                  {additionalDetails?.worldPercentPopulation}
                </li>
                <li>
                  Exports Volume Rank: {additionalDetails.exportsVolume?.rank}
                </li>
                <li>
                  Exports Value Exported:{' '}
                  {additionalDetails.exportsVolume?.valueExported}
                </li>
                <li>Country Square: {additionalDetails?.countrySquare}</li>
                <li>GDP Nominal: {additionalDetails?.gdpNominal}</li>
                <li>GDP PPP: {additionalDetails?.gdpPPP}</li>
              </ul>
              <div className="countryDetailsPrice">
                {additionalDetails?.flag && (
                  <img
                    src={additionalDetails.flag}
                    alt={`${additionalDetails.name} Flag`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Country
