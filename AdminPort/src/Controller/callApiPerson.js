export default function callApiPerson() {
  this.fectchData = () => {
    var prosime = axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users',
      method: 'GET',
    });
    return prosime;
  };
  this.addPerson = (data) => {
    return axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users',
      method: 'POST',
      data: data,
    });
  };
  this.deletePerson = (id) => {
    return axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users/' + id,
      method: 'DELETE',
    });
  };
  this.getInfoPerson = (id) => {
    return axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users/' + id,
      method: 'GET',
    });
  };
  this.editPerson = (id, data) => {
    return axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users/' + id,
      method: 'PUT',
      data: data,
    });
  };
}
