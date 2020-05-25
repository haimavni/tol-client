export class App {
  public message: string = 'Hello World!';
  public latitude = 31.771959;
  public longitude = 35.217018;
  public zoom = 7;
  markers = [{ latitude: this.latitude, longitude: this.longitude }];

  place_marker(event) {
    console.log("event ", event.detail);
    //console.log("zoom: ", this.zoom, " longitude: ", this.longitude);
    let latLng = event.detail.latLng,
    this.latitude = latLng.lat();
    this.longitude = latLng.lng();
    this.markers = [{ latitude: this.latitude, longitude: this.longitude }];
  }

  zoom_changed(event) {
    console.log("event ", event.detail);
    console.log("zoom: ", this.zoom, " longitude: ", this.longitude);

  }

}
