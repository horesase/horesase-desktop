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
      <ul id="meigen-list">
        {list}
      </ul>
    );
  }
});

ReactDOM.render(
  <MeigenList meigens={meigens} />,
  document.getElementById("main")
);
