var MeigenList = React.createClass({displayName: "MeigenList",
  propTypes: {
    meigens:      React.PropTypes.array.isRequired,
    selectMeigen: React.PropTypes.func.isRequired
  },

  render:function() {
    var list = this.props.meigens.map(function(m)  {
      return React.createElement(Meigen, {id: m.id, title: m.title, image: m.image, character: m.character, cid: m.cid, eid: m.eid, body: m.body, key: m.id, selectMeigen: this.props.selectMeigen})
    }.bind(this));

    return(
      React.createElement("ul", {id: "meigen-list"}, list)
    );
  }
});

var Meigen = React.createClass({displayName: "Meigen",
  propTypes: {
    id:           React.PropTypes.number.isRequired,
    title:        React.PropTypes.string.isRequired,
    image:        React.PropTypes.string.isRequired,
    character:    React.PropTypes.string.isRequired,
    cid:          React.PropTypes.number.isRequired,
    eid:          React.PropTypes.number.isRequired,
    body:         React.PropTypes.string.isRequired,
    selectMeigen: React.PropTypes.func.isRequired
  },

  onClick:function() {
    this.props.selectMeigen(this.props.id);
  },

  render:function() {
    return (
      React.createElement("li", {className: "meigen", onClick: this.onClick}, React.createElement("img", {src: this.props.image}))
    );
  }
});

var MeigenPopup = React.createClass({displayName: "MeigenPopup",
  propTypes: {
    id:             React.PropTypes.number.isRequired,
    title:          React.PropTypes.string.isRequired,
    image:          React.PropTypes.string.isRequired,
    character:      React.PropTypes.string.isRequired,
    cid:            React.PropTypes.number.isRequired,
    eid:            React.PropTypes.number.isRequired,
    unselectMeigen: React.PropTypes.func.isRequired
  },

  onClick:function(event) {
    if (event.target.id == "popup-container") {
      this.props.unselectMeigen();
    }
  },

  onFocus:function(event) {
    event.target.select();
  },

  render:function() {
    var entryTitle = ("惚れさせ" + this.props.id + " 「" + this.props.title + "」");
    var entryURL   = ("http://jigokuno.com/eid_" + this.props.eid + ".html");

    var paster = {
      markdown: ("[![" + entryTitle + "](" + this.props.image + ")](" + entryURL + ")"),
      html:     ("<a href=\"" + entryURL + "\" title=\"" + entryTitle + "\"><img src=\"" + this.props.image + "\" alt=\"" + entryTitle + "\" /></a>"),
      url:      this.props.image
    }

    return(
      React.createElement("div", {id: "popup-container", onClick: this.onClick}, 
        React.createElement("div", {id: "popup"}, 
          React.createElement("div", {className: "image"}, React.createElement("img", {src: this.props.image})), 
          React.createElement("div", {className: "info"}, 
            React.createElement("h2", null, this.props.title), 
            React.createElement("p", {className: "character"}, 
              this.props.character
            ), 
            React.createElement("div", {className: "copy-boards"}, 
              React.createElement("div", {className: "copy-board"}, 
                React.createElement("h3", null, "Markdown"), 
                React.createElement("p", null, React.createElement("input", {type: "text", defaultValue: paster.markdown, onFocus: this.onFocus})), 
                React.createElement("span", {className: "copy-button", "data-clipboard-text": paster.markdown}, 
                  React.createElement("img", {src: "build/images/clippy.svg", width: "14"})
                ), 
                React.createElement("span", {className: "status"}, "Copied!")
              ), 
              React.createElement("div", {className: "copy-board"}, 
                React.createElement("h3", null, "HTML"), 
                React.createElement("p", null, React.createElement("input", {type: "text", defaultValue: paster.html, onFocus: this.onFocus})), 
                React.createElement("span", {className: "copy-button", "data-clipboard-text": paster.html}, 
                  React.createElement("img", {src: "build/images/clippy.svg", width: "14"})
                ), 
                React.createElement("span", {className: "status"}, "Copied!")
              ), 
              React.createElement("div", {className: "copy-board"}, 
                React.createElement("h3", null, "Image URL"), 
                React.createElement("p", null, React.createElement("input", {type: "text", defaultValue: paster.url, onFocus: this.onFocus})), 
                React.createElement("span", {className: "copy-button", "data-clipboard-text": paster.url}, 
                  React.createElement("img", {src: "build/images/clippy.svg", width: "14"})
                ), 
                React.createElement("span", {className: "status"}, "Copied!")
              )
            )
          )
        )
      )
    );
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

var Searcher = React.createClass({displayName: "Searcher",
  propTypes: {
    updateQuery: React.PropTypes.func.isRequired
  },

  onChange:function(event) {
    this.props.updateQuery(event.target.value);
  },

  render:function() {
    return(
      React.createElement("input", {type: "search", onChange: this.onChange})
    );
  }
});

var Horesase = React.createClass({displayName: "Horesase",
  propTypes: {
    meigens: React.PropTypes.array.isRequired
  },

  getInitialState:function() {
    return {
      query: "",
      currentCharacterID: 0,
      selectedMeigenID: null
    }
  },

  selectMeigen:function(meigenID) {
    this.setState({ selectedMeigenID: meigenID });
  },

  unselectMeigen:function() {
    this.setState({ selectedMeigenID: null });
  },

  selectCharacter:function(characterID) {
    this.setState({ currentCharacterID: characterID });
  },

  updateQuery:function(newQuery) {
    this.setState({ query: newQuery });
  },

  render:function() {
    var characters = _.uniq(this.props.meigens.map(function(m)  {
      return { id: m.cid, name: m.character }
    }), "id");

    var popup = null;

    if (this.state.selectedMeigenID) {
      var meigen = this.props.meigens.filter(function(m)  { return m.id == this.state.selectedMeigenID }.bind(this))[0];
      popup = React.createElement(MeigenPopup, {id: meigen.id, title: meigen.title, image: meigen.image, character: meigen.character, cid: meigen.cid, eid: meigen.eid, unselectMeigen: this.unselectMeigen})
    }

    var filtered = this.props.meigens;

    if (this.state.currentCharacterID != 0) {
      filtered = this.props.meigens.filter(function(m)  { return m.cid == this.state.currentCharacterID }.bind(this));
    }

    if (this.state.query.length > 0) {
      filtered = filtered.filter(function(m)  {
        var re = new RegExp(this.state.query);
        return m.title.match(re) || m.body.match(re) || m.character.match(re);
      }.bind(this));
    }

    filtered = _.take(_.sortBy(filtered, function(m)  { return m.id * -1 }), 36);

    return(
      React.createElement("div", {id: "horesase"}, 
        React.createElement("div", {id: "searcher-container"}, 
          React.createElement(Searcher, {updateQuery: this.updateQuery})
        ), 
        React.createElement("div", {id: "list-container"}, 
          React.createElement(CharacterList, {characters: characters, currentCharacterID: this.state.currentCharacterID, selectCharacter: this.selectCharacter}), 
          React.createElement(MeigenList, {meigens: filtered, selectMeigen: this.selectMeigen})
        ), 
        popup
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Horesase, {meigens: meigens}),
  document.getElementById("app")
);

var clipboard = new Clipboard(".copy-button");

clipboard.on("success", function(event) {
  var status = event.trigger.nextSibling;
  status.className = (status.className + " shown");

  setTimeout(function() {
    status.className = status.className.replace("shown", "");
  }, 1000);
});
