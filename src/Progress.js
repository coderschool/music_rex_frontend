import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import {Card, CardHeader, CardBody, CardTitle, CardText} from 'reactstrap';

const API_PATH = 'http://localhost:8000';

const COLOR = {
  Spotify: 'success',
  Genius: 'secondary',
  "Student Algorithms": 'secondary'
}


const ProgressCard = ({type, results}) => 
  <Card body inverse color={COLOR[type]} style={{marginBottom: 20}}>
    <CardTitle> {type} </CardTitle>
    <CardText>
      { results }
    </CardText>
  </Card>


export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: true };
  }

  async componentDidMount() {
    let spotifyReq = fetch(`${API_PATH}/submit`, {method: 'POST',body: JSON.stringify({
      song_title: this.props.title,
      artist: this.props.artist,
    })});
    let lyricsReq = fetch(`${API_PATH}/lyrics?artist=${this.props.artist}&song_title=${this.props.title}`);
    
    let s = spotifyReq.then( res => res.json()).then( (features) => { this.features = features; this.setState({ features: JSON.stringify(features)})});
    let l = lyricsReq.then( res => res.text()).then( (lyrics) => this.setState({ lyrics }));

    Promise.all([s, l]).then( () => {
      let finalReq = fetch(`${API_PATH}/playlist`, {method: 'POST', body: JSON.stringify({
        features: this.features,
        lyrics: this.state.lyrics,
      })});

      finalReq.then(res => res.text()).then( mlResp => {
        this.setState({mlResp, isFetching: false});
        this.props.handleResults(mlResp);
      });
    });
  }

  renderCards() {
    let cards = [];
    if(this.state.features) {
      const spotifyCard = <ProgressCard type="Spotify" results={this.state.features} />;
      cards = cards.concat([spotifyCard]);
    }
    if(this.state.lyrics) {
      const geniusCard = <ProgressCard type="Genius" results={this.state.lyrics} />;
      cards = cards.concat([geniusCard]);
    }
    if(this.state.mlResp) {
      const mlCard = <ProgressCard type="Student Algorithms" results={this.state.mlResp} />
      cards = cards.concat([mlCard]);
    }

    return cards;
  }

  render() {
    const names = ['circle', 'cube-grid', 'circle', 'wave', 'folding-cube', 'wandering-cube', 'pacman', 'line-scale', 'line-scale-pulse-out', 'line-scale-party', 'ball-triangle-path'];
    const spinnerName = names[Math.floor(Math.random()*names.length)];
    return (
      <div>
        { this.state.isFetching && <Spinner name={spinnerName} color="yellow"/>}
        { this.renderCards() }
      </div>
    );
  }
} 