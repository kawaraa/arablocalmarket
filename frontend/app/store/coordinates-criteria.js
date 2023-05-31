class CoordinatesCriteria {
  constructor(lat, lng, range) {
    this._range = range; // in KM Unite
    this.minLat = 0;
    this.maxLat = 0;
    this.minLng = 0;
    this.maxLng = 0;
    this._lat = lat;
    this._lng = lng;
  }

  set _range(value) {
    // 0.000 => 130km, 13km, 1.3km, 130m
    // 1.5 = 200km, 0.040 = 5km
    this.range = Number.parseFloat((Number.parseFloat(value) / 130).toPrecision(2));
  }

  set _lat(value) {
    this.lat = Number.parseFloat(value) || 0;
    if (this.lat == 0) {
      this.minLat = 0;
      this.maxLat = 0;
    }

    let minLatitude = 0;
    let maxLatitude = 0;

    if (this.lat < 0) minLatitude = this.lat + this.range;
    if (this.lat >= 0) minLatitude = this.lat - this.range;
    if (this.lat < 0) maxLatitude = this.lat - this.range;
    if (this.lat >= 0) maxLatitude = this.lat + this.range;
    if (maxLatitude > 90) maxLatitude = maxLatitude - 90 - 90;
    if (maxLatitude < -90) maxLatitude = 90 + (maxLatitude + 90);

    maxLatitude = Number.parseFloat(Number.parseFloat(maxLatitude).toPrecision(10));
    minLatitude = Number.parseFloat(Number.parseFloat(minLatitude).toPrecision(10));
    this.maxLat = maxLatitude;
    this.minLat = minLatitude;
    if (maxLatitude < minLatitude) {
      this.maxLat = minLatitude;
      this.minLat = maxLatitude;
    }
  }

  set _lng(value) {
    this.lng = Number.parseFloat(value) || 0;
    if (this.lng == 0) {
      this.minLng = 0;
      this.maxLng = 0;
    }

    let minLongitude = 0;
    let maxLongitude = 0;

    if (this.lng < 0) minLongitude = this.lng + this.range;
    if (this.lng >= 0) minLongitude = this.lng - this.range;
    if (this.lng < 0) maxLongitude = this.lng - this.range;
    if (this.lng >= 0) maxLongitude = this.lng + this.range;
    if (maxLongitude > 180) maxLongitude = maxLongitude - 180 - 180;
    if (maxLongitude < -180) maxLongitude = 180 + (maxLongitude + 180);

    maxLongitude = Number.parseFloat(Number.parseFloat(maxLongitude).toPrecision(10));
    minLongitude = Number.parseFloat(Number.parseFloat(minLongitude).toPrecision(10));
    this.maxLng = maxLongitude;
    this.minLng = minLongitude;
    if (maxLongitude < minLongitude) {
      this.maxLng = minLongitude;
      this.minLng = maxLongitude;
    }
  }
}
module.exports = CoordinatesCriteria;
