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

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._baseUrl}characters?limit=9&offset=210&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._baseUrl}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  correctDescription = (description) => {
    if (description.length) {
      if (description.length > 30) {
        const shortDescription = description.slice(0, 30) + "...";
        return shortDescription;
      }
    } else {
      return "Description not found";
    }
  };

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: this.correctDescription(char.description),
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
