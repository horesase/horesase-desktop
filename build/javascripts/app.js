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
      React.createElement("ul", {id: "meigen-list"}, 
        list
      )
    );
  }
});

ReactDOM.render(
  React.createElement(MeigenList, {meigens: meigens}),
  document.getElementById("main")
);
