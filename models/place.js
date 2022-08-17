class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    title.imageUri = imageUri;
    this.address = address;
    this.location = location; //{lat:0.23423,lng:23423} location obje olcak
    this.id = new Date().toString() + Math.random().toString();
  }
}

//kullanıcıdan girilen değerleri tutma şekli girlen değerleri
//kutuya koyuyolarmış gibi düşün
