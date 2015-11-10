var Meigen = React.createClass({displayName: "Meigen",
  propTypes: {
    id:        React.PropTypes.number.isRequired,
    title:     React.PropTypes.string.isRequired,
    image:     React.PropTypes.string.isRequired,
    character: React.PropTypes.string.isRequired,
    cid:       React.PropTypes.number.isRequired,
    eid:       React.PropTypes.number.isRequired,
    body:      React.PropTypes.string.isRequired
  },

  render:function() {
    return (
      React.createElement("li", {className: "meigen"}, React.createElement("img", {src: this.props.image}))
    );
  }
});

var MeigenList = React.createClass({displayName: "MeigenList",
  propTypes: {
    meigens: React.PropTypes.array.isRequired
  },

  render:function() {
    var list = this.props.meigens.map(function(m)  {
      return React.createElement(Meigen, {id: m.id, title: m.title, image: m.image, character: m.character, cid: m.cid, eid: m.eid, body: m.body, key: m.id})
    });

    return(
      React.createElement("ul", {id: "meigen-list"}, list)
    );
  }
});

var Character = React.createClass({displayName: "Character",
  propTypes: {
    id:              React.PropTypes.number.isRequired,
    name:            React.PropTypes.string.isRequired,
    selected:        React.PropTypes.bool.isRequired,
    selectCharacter: React.PropTypes.func.isRequired
  },

  onClick:function() {
    this.props.selectCharacter(this.props.id);
  },

  render:function() {
    if (this.props.selected) {
      return React.createElement("li", {className: "character selected"}, this.props.name)
    } else {
      return React.createElement("li", {className: "character", onClick: this.onClick}, this.props.name)
    }
  }
});

var CharacterList = React.createClass({displayName: "CharacterList",
  propTypes: {
    characters:         React.PropTypes.array.isRequired,
    currentCharacterID: React.PropTypes.number.isRequired,
    selectCharacter:    React.PropTypes.func.isRequired
  },

  render:function() {
    var list = this.props.characters.map(function(c)  {
      if (c.id == this.props.currentCharacterID) {
        return React.createElement(Character, {id: c.id, name: c.name, key: c.id, selected: true, selectCharacter: this.props.selectCharacter})
      } else {
        return React.createElement(Character, {id: c.id, name: c.name, key: c.id, selected: false, selectCharacter: this.props.selectCharacter})
      }
    }.bind(this));

    if (this.props.currentCharacterID == 0) {
      list.unshift(React.createElement(Character, {id: 0, name: "すべてのキャラクター", key: 0, selected: true, selectCharacter: this.props.selectCharacter}));
    } else {
      list.unshift(React.createElement(Character, {id: 0, name: "すべてのキャラクター", key: 0, selected: false, selectCharacter: this.props.selectCharacter}));
    }

    return(
      React.createElement("ul", {id: "character-list"}, 
        list
      )
    );
  }
});

var Searcher = React.createClass({displayName: "Searcher",
  render:function() {
    return(
      React.createElement("input", {type: "text"})
    );
  }
});

var Horesase = React.createClass({displayName: "Horesase",
  propTypes: {
    meigens: React.PropTypes.array.isRequired
  },

  getInitialState:function() {
    return {
      currentCharacterID: 0,
      displayedMeigens:   _.take(this.props.meigens.reverse(), 36)
    }
  },

  selectCharacter:function(characterID) {
    var _displayedMeigens;

    if (characterID == 0) {
      _displayedMeigens = _.take(this.props.meigens, 36)
    } else {
      _displayedMeigens = _.take(this.props.meigens.filter(function(m)  { return m.cid == characterID }), 36)
    }

    this.setState({
      currentCharacterID: characterID,
      displayedMeigens:   _displayedMeigens
    });
  },

  render:function() {
    var characters = _.uniq(this.props.meigens.map(function(m)  {
      return { id: m.cid, name: m.character }
    }), "id");

    return(
      React.createElement("div", {id: "horesase"}, 
        React.createElement("div", {id: "searcher-container"}, 
          React.createElement(Searcher, null)
        ), 
        React.createElement("div", {id: "list-container"}, 
          React.createElement(CharacterList, {characters: characters, currentCharacterID: this.state.currentCharacterID, selectCharacter: this.selectCharacter}), 
          React.createElement(MeigenList, {meigens: this.state.displayedMeigens})
        )
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Horesase, {meigens: meigens}),
  document.getElementById("app")
);
