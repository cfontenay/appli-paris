export default class Address {
    private streetName: String = '';
    private neighborhoodName: String = '';
    private districtName: String = '';
    constructor (street:String, neighborhood: String, district: String) {
        this.districtName = district;
        this.neighborhoodName = neighborhood;
        this.streetName = street;
    }
}