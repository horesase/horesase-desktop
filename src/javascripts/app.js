var Meigen = React.createClass({
  propTypes: {
    id:        React.PropTypes.number.isRequired,
    title:     React.PropTypes.string.isRequired,
    image:     React.PropTypes.string.isRequired,
    character: React.PropTypes.string.isRequired,
    cid:       React.PropTypes.number.isRequired,
    eid:       React.PropTypes.number.isRequired,
    body:      React.PropTypes.string.isRequired
  },

  render() {
    return (
      <li className="meigen"><img src={this.props.image} /></li>
    );
  }
});

var MeigenList = React.createClass({
  propTypes: {
    meigens: React.PropTypes.array.isRequired
  },

  render() {
    var list = this.props.meigens.map((m) => {
      return <Meigen id={m.id} title={m.title} image={m.image} character={m.character} cid={m.cid} eid={m.eid} body={m.body} key={m.id} />
    });

    return(
      <ul id="meigen-list">{list}</ul>
    );
  }
});

var Character = React.createClass({
  propTypes: {
    id:              React.PropTypes.number.isRequired,
    name:            React.PropTypes.string.isRequired,
    selected:        React.PropTypes.bool.isRequired,
    selectCharacter: React.PropTypes.func.isRequired
  },

  onClick() {
    this.props.selectCharacter(this.props.id);
  },

  render() {
    if (this.props.selected) {
      return <li className="character selected">{this.props.name}</li>
    } else {
      return <li className="character" onClick={this.onClick}>{this.props.name}</li>
    }
  }
});

var CharacterList = React.createClass({
  propTypes: {
    characters:         React.PropTypes.array.isRequired,
    currentCharacterID: React.PropTypes.number.isRequired,
    selectCharacter:    React.PropTypes.func.isRequired
  },

  render() {
    var list = this.props.characters.map((c) => {
      if (c.id == this.props.currentCharacterID) {
        return <Character id={c.id} name={c.name} key={c.id} selected={true} selectCharacter={this.props.selectCharacter} />
      } else {
        return <Character id={c.id} name={c.name} key={c.id} selected={false} selectCharacter={this.props.selectCharacter} />
      }
    });

    if (this.props.currentCharacterID == 0) {
      list.unshift(<Character id={0} name="すべてのキャラクター" key={0} selected={true} selectCharacter={this.props.selectCharacter} />);
    } else {
      list.unshift(<Character id={0} name="すべてのキャラクター" key={0} selected={false} selectCharacter={this.props.selectCharacter} />);
    }

    return(
      <ul id="character-list">
        {list}
      </ul>
    );
  }
});

var Searcher = React.createClass({
  propTypes: {
    updateQuery: React.PropTypes.func.isRequired
  },

  onChange(event) {
    this.props.updateQuery(event.target.value);
  },

  render() {
    return(
      <input type="search" onChange={this.onChange} />
    );
  }
});

var Horesase = React.createClass({
  propTypes: {
    meigens: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      query: "",
      currentCharacterID: 0,
    }
  },

  selectCharacter(characterID) {
    this.setState({ currentCharacterID: characterID });
  },

  updateQuery(newQuery) {
    this.setState({ query: newQuery });
  },

  render() {
    var characters = _.uniq(this.props.meigens.map((m) => {
      return { id: m.cid, name: m.character }
    }), "id");

    var filtered = this.props.meigens;

    if (this.state.currentCharacterID != 0) {
      filtered = this.props.meigens.filter((m) => { return m.cid == this.state.currentCharacterID });
    }

    if (this.state.query.length > 0) {
      filtered = filtered.filter((m) => {
        var re = new RegExp(this.state.query);
        return m.title.match(re) || m.body.match(re) || m.character.match(re);
      });
    }

    filtered = _.take(filtered, 36);

    return(
      <div id="horesase">
        <div id="searcher-container">
          <Searcher updateQuery={this.updateQuery} />
        </div>
        <div id="list-container">
          <CharacterList characters={characters} currentCharacterID={this.state.currentCharacterID} selectCharacter={this.selectCharacter} />
          <MeigenList meigens={filtered} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Horesase meigens={meigens} />,
  document.getElementById("app")
);
