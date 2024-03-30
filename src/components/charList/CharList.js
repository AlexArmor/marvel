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
    newItemLoading: false,
    offset: 1550,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharactersLoaded = (newCharacters) => {
    let ended = false;
    if (newCharacters.length < 9) {
      ended = true;
    }
    this.setState(({ offset, characters }) => ({
      characters: [...characters, ...newCharacters],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  imageStyleFit = (thumbnail) => {
    let imgStyle = { objectFit: "cover" };
    if (
      thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle = { objectFit: "unset" };
    }
    return imgStyle;
  };

  render() {
    const { characters, loading, error, offset, newItemLoading, charEnded } =
      this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {characters.length && (
          <ul className="char__grid">
            {characters.map((item) => (
              <li
                className="char__item"
                key={item.id}
                onClick={() => this.props.onCharSelected(item.id)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  style={this.imageStyleFit(item.thumbnail)}
                />
                <div className="char__name">{item.name}</div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => this.onRequest(offset)}
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
