import { capitalizeEachWord } from '../utils/helpers'
import { Request, Response } from 'express'
import redisClient from '../utils/redisClient'
import { sendServerError, sendSuccess, sendNotFound } from '../utils/errorCodes'
import CountryService from '../service/countryService'
import GeoDetailService from '../service/geoDetailsService'

/**
 * Controller method to get the list of countries.
 * Retrieves data from the CountryService and caches it in Redis for subsequent requests.
 * @param req Express Request object
 * @param res Express Response object
 * @returns Response with a list of countries
 */
export const get = async (req: Request, res: Response) => {
  const redisKey = 'country_list'

  const message = 'Data retrieved successfully'
  // Check if the key exists in Redis
  const keyExists = await redisClient.keyExists(redisKey)

  if (keyExists) {
    const redisData: string = (await redisClient.get(redisKey)) ?? ''

    return sendSuccess(res, message + ' redis data', JSON.parse(redisData))
  }
  try {
    const countryData = await CountryService.getCountries()

    if (countryData.status === 200) {
      await redisClient.set(redisKey, JSON.stringify(countryData.data), 86400)

      return sendSuccess(
        res,
        countryData.data.message ?? message,
        countryData.data,
      )
    } else {
      return sendNotFound(res, 'Data not found', {})
    }
  } catch (error) {
    console.error(error)
    return sendServerError(res, 'Unable to get data')
  }
}

/**
 * Controller method to get details of a specific country.
 * Retrieves country details from the GeoDetailService based on the provided countryName.
 * @param req Express Request object
 * @param res Express Response object
 * @returns Response with details of the specified country
 */

export const details = async (req: Request, res: Response) => {
  const { countryName } = req.body

  try {
    const capitalizedCountryName = capitalizeEachWord(countryName)

    const result = await GeoDetailService.postCountry({
      country_name: capitalizedCountryName,
    })

    if (result.status === 200) {
      return sendSuccess(
        res,
        result.data.message ?? 'Data retrieved successfully',
        result.data,
      )
    } else {
      return sendNotFound(res, 'Data not found', {})
    }
  } catch (error) {
    console.error(error)
    return sendServerError(res, 'Unable to get data')
  }
}
