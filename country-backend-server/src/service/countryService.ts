import Service from './index'

class CountryService extends Service {
  constructor() {
    const baseUrl =
      process.env.COUNTRY_API_BASE_URL ||
      'https://city-and-state-search-api.p.rapidapi.com/countries'
    super(baseUrl)
  }

  setCustomHeaders() {
    const customHeaders = {
      'X-RapidAPI-Key': process.env.X_RAPID_API_KEY || '',
      'X-RapidAPI-Host': process.env.X_RAPID_HOST || '',
    }
    this.setHeaders(customHeaders)
  }

  async getCountries(queryParams?: Record<string, unknown>) {
    this.setCustomHeaders()
    const response = await this.get(queryParams)
    return response
  }
}

export default new CountryService()
