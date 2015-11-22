// Libraries

var React           = require("react");
var ReactDOM        = require("react-dom");
var CopyToClipboard = require("react-copy-to-clipboard");
var HTTP            = require("http");
var _               = require("lodash");

// Stylesheets

require("../stylesheets/app.scss");

// Images

var imgClippyPath = "build/" + require("../images/clippy.svg");
var splashNumber  = parseInt((Math.floor(Math.random() * 3) + 1));
var imgSplashPath = "build/" + require("../images/splash/" + splashNumber + ".gif")

// Components

var MeigenList = React.createClass({
  propTypes: {
    meigens:      React.PropTypes.array.isRequired,
    selectMeigen: React.PropTypes.func.isRequired
  },

  render() {
    var list = this.props.meigens.map((m) => {
      return <Meigen id={m.id} title={m.title} image={m.image} character={m.character} cid={m.cid} eid={m.eid} body={m.body} key={m.id} selectMeigen={this.props.selectMeigen} />
    });

    return(
      <ul id="meigen-list">{list}</ul>
    );
  }
});

var Meigen = React.createClass({
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

  onClick() {
    this.props.selectMeigen(this.props.id);
  },

  render() {
    return (
      <li className="meigen" onClick={this.onClick}><img src={this.props.image} /></li>
    );
  }
});

var MeigenPopup = React.createClass({
  getInitialState() {
    return {
      copied_markdown: false,
      copied_html:     false,
      copied_url:      false
    }
  },

  propTypes: {
    id:             React.PropTypes.number.isRequired,
    title:          React.PropTypes.string.isRequired,
    image:          React.PropTypes.string.isRequired,
    character:      React.PropTypes.string.isRequired,
    cid:            React.PropTypes.number.isRequired,
    eid:            React.PropTypes.number.isRequired,
    unselectMeigen: React.PropTypes.func.isRequired
  },

  onClick(event) {
    if (event.target.id == "popup-container") {
      this.props.unselectMeigen();
    }
  },

  onFocus(event) {
    event.target.select();
  },

  onCopy(from) {
    if (from == "markdown") {
      this.setState({ copied_markdown: true });
      setTimeout(() => { this.setState({ copied_markdown: false }); }, 1000);
    } else if (from == "html") {
      this.setState({ copied_html: true });
      setTimeout(() => { this.setState({ copied_html: false }); }, 1000);
    } else if (from == "url") {
      this.setState({ copied_url: true });
      setTimeout(() => { this.setState({ copied_url: false }); }, 1000);
    }
  },

  render() {
    var entryTitle = `惚れさせ${this.props.id} 「${this.props.title}」`;
    var entryURL   = `http://jigokuno.com/eid_${this.props.eid}.html`;

    var paster = {
      markdown: `[![${entryTitle}](${this.props.image})](${entryURL})`,
      html:     `<a href="${entryURL}" title="${entryTitle}"><img src="${this.props.image}" alt="${entryTitle}" /></a>`,
      url:      this.props.image
    }

    return(
      <div id="popup-container" onClick={this.onClick}>
        <div id="popup">
          <div className="image"><img src={this.props.image} /></div>
          <div className="info">
            <h2>{this.props.title}</h2>
            <p className="character">
              {this.props.character}
            </p>

            <div className="copy-boards">
              <div className="copy-board">
                <h3>Markdown</h3>
                <p><input type="text" defaultValue={paster.markdown} onFocus={this.onFocus} /></p>
                <CopyToClipboard text={paster.markdown} onCopy={(_text) => { this.onCopy("markdown"); }}>
                  <span className="copy-button">
                    <img src={imgClippyPath} width="14" />
                  </span>
                </CopyToClipboard>
                {this.state.copied_markdown ? <span className="status">Copied!</span> : null}
              </div>
              <div className="copy-board">
                <h3>Image URL</h3>
                <p><input type="text" defaultValue={paster.url} onFocus={this.onFocus} /></p>
                <CopyToClipboard text={paster.url} onCopy={(_text) => { this.onCopy("url"); }}>
                  <span className="copy-button">
                    <img src={imgClippyPath} width="14" />
                  </span>
                </CopyToClipboard>
                {this.state.copied_url ? <span className="status">Copied!</span> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
  getInitialState() {
    return {
      meigens: null,
      query: "",
      currentCharacterID: 0,
      selectedMeigenID: null
    }
  },

  selectMeigen(meigenID) {
    this.setState({ selectedMeigenID: meigenID });
  },

  unselectMeigen() {
    this.setState({ selectedMeigenID: null });
  },

  selectCharacter(characterID) {
    this.setState({ currentCharacterID: characterID });
  },

  updateQuery(newQuery) {
    this.setState({ query: newQuery });
  },

  render() {
    if (this.state.meigens == null) {
      HTTP.request({ host: "horesase.github.io", path: "/horesase-boys/meigens.json" }, (response) => {
        var result = "";
        response.on("data", (chunk) => { result += chunk; });
        response.on("end", () => {
          setTimeout(() => {
            this.setState({ meigens: JSON.parse(result) })
          }, 3000);
        });
      }).end();

      return (
        <div id="splash" className={"splash-" + splashNumber}>
          <p className="image">
            <img src={imgSplashPath} />
          </p>
          <p className="message">
            Loading...
          </p>
        </div>
      )
    }

    var characters = _.uniq(this.state.meigens.map((m) => {
      return { id: m.cid, name: m.character }
    }), "id");

    var popup = null;

    if (this.state.selectedMeigenID) {
      var meigen = this.state.meigens.filter((m) => { return m.id == this.state.selectedMeigenID })[0];
      popup = <MeigenPopup id={meigen.id} title={meigen.title} image={meigen.image} character={meigen.character} cid={meigen.cid} eid={meigen.eid} unselectMeigen={this.unselectMeigen} />
    }

    var filtered = this.state.meigens;

    if (this.state.currentCharacterID != 0) {
      filtered = this.state.meigens.filter((m) => { return m.cid == this.state.currentCharacterID });
    }

    if (this.state.query.length > 0) {
      filtered = filtered.filter((m) => {
        var re = new RegExp(this.state.query);
        return m.title.match(re) || m.body.match(re) || m.character.match(re);
      });
    }

    filtered = _.take(_.sortBy(filtered, (m) => { return m.id * -1 }), 36);

    return(
      <div id="horesase">
        <div id="searcher-container">
          <Searcher updateQuery={this.updateQuery} />
        </div>
        <div id="list-container">
          <CharacterList characters={characters} currentCharacterID={this.state.currentCharacterID} selectCharacter={this.selectCharacter} />
          <MeigenList meigens={filtered} selectMeigen={this.selectMeigen} />
        </div>
        {popup}
      </div>
    );
  }
});

ReactDOM.render(
  <Horesase />,
  document.getElementById("app")
);
