async function getUrl() {
  const URL = 'https://economia.awesomeapi.com.br/json/all';

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export default getUrl;
