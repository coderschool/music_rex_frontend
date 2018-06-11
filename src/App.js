import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import bg from './bg.png';
import { Row, Col } from 'reactstrap';
import SongForm from './SongForm';
import SongResults from './SongResults';
import Progress from './Progress';

const NavBar = () => 
  <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom box-shadow">
  <div className="container">
    <a className="navbar-brand" href="http://www.coderschool.vn/">
      <picture>
        <source media="(min-width: 768px)" srcSet="https://svgshare.com/i/6RK.svg"/>
        <source media="(max-width: 767px)" srcSet="https://svgshare.com/i/6P9.svg"/>
        <img src="https://svgshare.com/i/6P9.svg" alt="CS-responsive" width="180px;"/>
      </picture>
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ml-3 pt-1">
          <a className="nav-link text-uppercase" href="#">Home</a>
        </li>
      </ul>
    </div>
  </div>
  </nav>

const BodyContainer = ({children}) => 
  <div className="bg">
    <div className="container" id="hero-banner">
      { children }
    </div>
  </div>


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  handleSubmit(artist, title) {
    this.setState({ 
      isLoading: true,
      title,
      artist
    });
  }

  handleResults(results) {
    this.setState({
      results
    });
  }

  render() {
    return (
      <div className="full-height">
        <NavBar/>
        <BodyContainer>
          <Row>
            <Col lg="6" md="12">
              <h1 id="hero-text">CoderSchool Final Project: Machine Learning</h1>  
              <br/><br/>
              { 
                !this.state.isLoading ? 
                  <SongForm handleSubmit={this.handleSubmit.bind(this)}/> 
                  : 
                  <Progress 
                      handleResults={ this.handleResults.bind(this) }
                      resetForm={() => this.setState({isLoading: false})} {...this.state} />
              }
            </Col>
            <Col lg="6" md="12">
              { this.state.results && <SongResults results={this.state.results}/>}
            </Col>
          </Row>
        </BodyContainer>
      </div>
    );
  }
}

export default App;
