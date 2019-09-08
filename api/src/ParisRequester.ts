
import Address from './Address';
const axios = require('axios');

const urlApiParis = 'https://opendata.paris.fr/api/records/1.0/search/?'
async function doParisAPIRequest(dataset:string, lat:number, lng:number, radius:number): Promise<any>{
    console.log(`${urlApiParis}dataset=${dataset}&geofilter.distance=${lat}%2C+${lng}%2C${radius}`);
    return (await axios.get(`${urlApiParis}dataset=${dataset}&geofilter.distance=${lat}%2C+${lng}%2C${radius}`)).data
}
 export default class ParisRequester {
    async getAddress(lat:number, lng:number):Promise<Address> {
        const resNeighborhood:any = await doParisAPIRequest('quartier_paris', lat, lng, 1);
        const resStreet:any = await doParisAPIRequest('adresse_paris', lat, lng, 10);
        let address:Address = new Address("", "", "");
        if (resNeighborhood.records !== undefined && resNeighborhood.records.length > 0) {
            let streetName = '';
            if (resStreet.records !== undefined && resStreet.records.length > 0) {
                streetName = resStreet.records[0].fields.l_adr;
            }
            address = new Address(streetName, resNeighborhood.records[0].fields.l_qu, resNeighborhood.records[0].fields.c_ar);
        }
        return address;
    }
}