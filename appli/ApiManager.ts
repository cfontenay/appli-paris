import Address from './Address';
import axios from 'axios';
const apiURL = 'https://api-appli-paris.herokuapp.com/'
export default class ApiManager {
    /**
     * requestForAddress
        lat:number, lng:number     */
    public async  requestForAddress(lat:number, lng:number):Promise<Address> {
        const res:any = await axios.get(`${apiURL}?lat=${lat}&lng=${lng}`);
        return new Address(res.data.streetName, res.data.neighborhoodName, res.data.districtName);
    }
}