export default function CallApi() {
  this.fectchData = () => {
    var prosime = axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs',
      method: 'GET',
    });
    return prosime;
  };
  this.addProduct = (data) => {
    return axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs',
      method: 'POST',
      data: data,
    });
  };
  this.deleteProducr = () => {
    return axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs',
    });
  };
}
