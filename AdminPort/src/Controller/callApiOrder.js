export default CallApiOrder = () => {
  this.fetchData = () => {
    return axios({
      url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/OderProduct',
      method: 'GET',
    });
  };
};
