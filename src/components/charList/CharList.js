import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  charactersFetch = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  componentDidMount() {
    this.charactersFetch();
  }

  onCharactersLoaded = (characters) => {
    this.setState({ characters, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { characters, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {characters.length && (
          <ul className="char__grid">
            {characters.map((item) => (
              <li className="char__item" key={item.id}>
                <img src={item.thumbnail} alt={item.name} />
                <div className="char__name">{item.name}</div>
              </li>
            ))}
          </ul>
        )}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
