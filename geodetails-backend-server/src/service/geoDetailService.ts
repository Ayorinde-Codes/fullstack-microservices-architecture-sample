import Service from './index'

class GeodetailService extends Service {
  constructor(country_name: string = '') {
    const baseUrl =
      process.env.COUNTRY_API_BASE_URL + `/name/${country_name}` ||
      `https://countryman-api.p.rapidapi.com/countries/name/${country_name}`
    super(baseUrl)
  }

  setCustomHeaders() {
    const customHeaders = {
      'X-RapidAPI-Key': process.env.X_RAPID_API_KEY || '',
      'X-RapidAPI-Host': process.env.X_RAPID_HOST || '',
    }
    this.setHeaders(customHeaders)
  }

  async getCountryDetails(queryParams?: Record<string, unknown>) {
    this.setCustomHeaders()
    const response = await this.get(queryParams)

    return response
  }
}

export default GeodetailService
