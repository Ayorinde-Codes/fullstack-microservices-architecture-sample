import Service from './index'

class GeoDetailService extends Service {
  constructor() {
    const baseUrl = 'http://geodetails-backend-server:4002/api/country/details'
    super(baseUrl)
  }

  setCustomHeaders() {
    const customHeaders = {
      'API-Key': process.env.GEODETAILS_API_KEY || '',
    }
    this.setHeaders(customHeaders)
  }

  async postCountry(countryData: Record<string, unknown>) {
    this.setCustomHeaders()
    this.setData(countryData)
    const response = await this.post()
    return response
  }
}

export default new GeoDetailService()
