export default function CallApiOrder() {
  const baseURL =
    'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/OderProduct';
  this.fetchData = () => {
    let promise = axios({
      url: baseURL,
      method: 'GET',
    });
    return promise;
  };
  this.addOrder = (data) => {
    return axios({
      url: baseURL,
      method: 'POST',
      data: data,
    });
  };
  this.deleteOrder = (id) => {
    return axios({
      url: baseURL + '/' + id,
      method: 'DELETE',
    });
  };
  this.getInfoOrder = (id) => {
    return axios({
      url: baseURL + '/' + id,
      method: 'GET',
    });
  };
  this.editOrder = (id, data) => {
    return axios({
      url: baseURL + '/' + id,
      method: 'PUT',
      data: data,
    });
  };
}
