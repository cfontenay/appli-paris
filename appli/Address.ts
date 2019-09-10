export default class Address {
    public streetName: String = '';
    public neighborhoodName: String = '';
    public districtName: String = '';
    constructor (street:String, neighborhood: String, district: String) {
        this.districtName = district;
        this.neighborhoodName = neighborhood;
        this.streetName = street;
    }
    toString(){
        return `Rue: ${this.streetName === ''? '?':this.streetName}\nQuartier: ${this.neighborhoodName}\nArrondissement: ${this.districtName}`;
    }
}