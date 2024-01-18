import { Request, Response } from 'express'
import { sendServerError, sendSuccess } from '../utils/errorCodes'
import GeodetailService from '../service/geoDetailService'
import { capitalizeEachWord } from '../utils/helpers'

/**
 * Controller method to retrieve and display detailed information about a country.
 * Capitalizes the country name, initializes the GeoDetailService, and fetches country details.
 * @param req Express Request object with the country name
 * @param res Express Response object
 * @returns Response indicating the success or failure of retrieving country details
 */
export const show = async (req: Request, res: Response) => {
  try {
    const { country_name } = req.body

    const capitalizedCountryName = capitalizeEachWord(country_name)

    const geoDetailService = new GeodetailService(capitalizedCountryName)

    const result = await geoDetailService.getCountryDetails()

    if (result.status === 200) {
      return sendSuccess(
        res,
        result.data.message ?? 'Data retrieved successfully',
        result.data,
      )
    } else {
      return sendSuccess(res, 'No data available', {})
    }
  } catch (error) {
    console.log(error)
    return sendServerError(res, 'Not able to get data')
  }
}
