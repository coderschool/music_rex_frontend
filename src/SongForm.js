import React, { Component } from 'react';


export default class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      title: ''
    }
  }

  handleChangeArtist(e) {
    this.setState({ artist: e.target.value });
  }

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    return (
      <div className="form-container">
      <form onSubmit={(e) => { e.preventDefault(); this.props.handleSubmit(this.state.artist, this.state.title)}}>
        <div className="form-group">
          <input type="text" value={this.state.artist} onChange={this.handleChangeArtist.bind(this)} placeholder="Song Artist" />
        </div>
        <div className="form-group">
          <input type="text" value={this.state.title} onChange={this.handleChangeTitle.bind(this)} placeholder="Song Title" />
        </div>
        <br/>
        <button type="submit" className="btn btn-lg btn-outline btn-danger">Create Similar Song Playlist</button>
      </form>
    </div>
    );
  }
}

