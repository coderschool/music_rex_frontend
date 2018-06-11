import React, { Component } from 'react';
import {Col, Row, Media, ListGroup, ListGroupItem, ListGroupItemHeading, 
  ListGroupItemText, Card, CardHeader, CardBody, Button } from 'reactstrap';

const API_PATH = 'http://localhost:8000';

const Playlist = ({tracks}) => 
  <ListGroup>
    {tracks.map ( t  => 
    // <Media list>
    //   <Media tag="li">
    //     <Media left style={{marginRight: 30, marginBottom: 20}}>
    //       <Media object src={t.image.url} width={64} />
    //     </Media>
    //     <Media body>
    //       <Col xs="6">
    //         <Media heading>
    //           {t.name}
    //         </Media>
    //         {t.artist.name}
    //       </Col>
    //       <Col xs="6">
    //         <audio src={t.preview_url} controls type="audio/mp3" preload="auto"/>
    //       </Col>
    //     </Media>
    //   </Media>
    // </Media>
      <ListGroupItem key={t.name}>
        <Row>
          <Col xs="3">
            <img src={t.image.url} width={96}/>
          </Col>
          <Col xs="9">
            <ListGroupItemHeading>
              {t.name}
            </ListGroupItemHeading>
            <ListGroupItemText>
              {t.artist.name}
              <audio src={t.preview_url} controls type="audio/mp3" preload="auto" />
            </ListGroupItemText>
          </Col>
        </Row>
      </ListGroupItem>
    )}
  </ListGroup>


export default class SongResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    let results = JSON.parse(this.props.results);
    let resp = await fetch(`${API_PATH}/create_playlist`, {method: 'POST',body: JSON.stringify({
      playlist: results
    })});
    let tracks = await resp.json();
    this.setState({tracks});
    console.log('created', tracks);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <h2> Results </h2>
        </CardHeader>
        <CardBody>
          { this.state.tracks && <Playlist tracks={this.state.tracks}/> }
        </CardBody>
      </Card>

    )
  }
}