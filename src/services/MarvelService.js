class MarvelService {
  _baseUrl = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=bd95bb768ef3c55e1633c4442b9bc830";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(
      `${this._baseUrl}characters?limit=9&offset=210&${this._apiKey}`
    );
  };

  getCharacter = (id) => {
    return this.getResource(`${this._baseUrl}characters/${id}?${this._apiKey}`);
  };
}

export default MarvelService;
