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

var Horesase = React.createClass({
  propTypes: {
    meigens: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      currentCharacterID: 0,
      displayedMeigens:   _.take(this.props.meigens.reverse(), 36)
    }
  },

  selectCharacter(characterID) {
    var _displayedMeigens;

    if (characterID == 0) {
      _displayedMeigens = _.take(this.props.meigens, 36)
    } else {
      _displayedMeigens = _.take(this.props.meigens.filter((m) => { return m.cid == characterID }), 36)
    }

    this.setState({
      currentCharacterID: characterID,
      displayedMeigens:   _displayedMeigens
    });
  },

  render() {
    var characters = _.uniq(this.props.meigens.map((m) => {
      return { id: m.cid, name: m.character }
    }), "id");

    return(
      <div id="horesase">
        <CharacterList characters={characters} currentCharacterID={this.state.currentCharacterID} selectCharacter={this.selectCharacter} />
        <MeigenList meigens={this.state.displayedMeigens} />
      </div>
    );
  }
});

ReactDOM.render(
  <Horesase meigens={meigens} />,
  document.getElementById("app")
);
