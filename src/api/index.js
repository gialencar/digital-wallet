export default async function fetchCurrencies() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
