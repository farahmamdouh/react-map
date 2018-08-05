/* Start */
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import MyMapComponent from './MyMapComponent'
import escapeRegExp from 'escape-string-regexp'
import fetchJsonp from 'fetch-jsonp';
import './App.css';

class App extends Component {
  state = {
    Locations: [
      {id: 1, title: 'Faculty of Medicine', location: {lat: 30.075791, lng: 31.281130}, Info: 'Faculty of Medicine'},
      {id: 2, title: 'Faculty of Law', location: {lat: 30.077449, lng: 31.286224}, Info: 'Faculty of law'},
      {id: 3, title: 'Faculty of Computers and information science', location: {lat: 30.078308, lng: 31.284850}, Info: 'Faculty of computers and information sciences'},
      {id: 4, title: 'Faculty of science', location: {lat: 30.077691, lng: 31.284077}, Info: 'Faculty of science'},
      {id: 5, title: 'Faculty of Alsun and languages', location: {lat: 30.073923, lng: 31.288608}, Info: 'Faculty of alsun'}
      
    ],
    searchQuery: '',
    clickedID: 0,
    isMarkerShown: false
  }

  /*query updating */
   updateQuery = (query) => {
    this.setState({searchQuery: query.trim()})
  }
  
  /* when you click on maps get location id */
  onMarkerClick = (loc) => {
    this.setState({clickedID: loc.id})

  }

  componentDidMount() {
    this.setState({ 
      isMarkerShown: true,
    })

    //use wikipedia API to get information about locations 
    this.state.Locations.map((Location) => {
      const query = Location.title
      if(navigator.onLine){       
          const api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
          fetchJsonp(api + query)

            .then((response) => {
              if(response.status >= 400) {
                throw new Error("server is not response");
              }
              return response.json()
            })

            .then((data) => {
              for (var page in data.query.pages) {
                if(data.query.pages[page].index === 1)
                Location.Info = data.query.pages[page].extract
              }
            })
            
            .catch(function() {
              Location.Info = 'you face an error'
            });
        }
      else {
          Location.Info = 'You are in offline mode now'
        }
        
    })
  }

  render() {
    /* this is list to get only filtered locations */
    let searchList
      if(this.state.searchQuery) {
          const match = new RegExp(escapeRegExp(this.state.searchQuery), 'i')
          searchList=this.state.Locations.filter((Location) => match.test(Location.title))
      } else {
          searchList = this.state.Locations
      }

    return (
      <div className="App container">
        <div className='row'>
          <div className='searchlin col-lg-4 col-md-12 col-12'>          
            <nav className="navbar navbar-expand-lg navbar-dark" role='navigation'>
              <button role='button' className="navbar-toggler" type="button" data-toggle="space" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" role='icon'></span>
              </button>
              <div className="space navbar-space" id="navbarNav" role='nav-body'>
                <h2>university location</h2>
                <form className="form-inline my-2 my-lg-0" role='search-form'>
                  <input className="form-control mrs-f-2" type="search" 
                    placeholder="Search" 
                    value={this.state.searchQuery}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    aria-label="Search"
                    role='searchbox'
                    tabIndex='0'
                  />
                  <button disabled className="trn trn-balck my-2 my-sm-0" role='search' type="submit">Search</button>
                </form>
                <div className='locations'>
                  <ul role='list'>
                    {searchList.map((Location) => (
                      <li 
                        tabIndex={Location.id+0} 
                        aria-label={Location.title} 
                        role='Location-Name' key={Location.id} 
                        onClick={() => {this.onMarkerClick(Location)}}
                        onFocus={(event) => {this.onMarkerClick(Location)}}
                      >{Location.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className='col-lg-8 col-12'>
          
          {navigator.onLine && 
         
            <Route path='/' render={() => (
              /* call the map */
              <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.onMarkerClick}
                Locations={this.state.Locations}
                searchList={searchList}
                clickedID={this.state.clickedID}
              />
              
            )}>
            </Route>
          }
          {!navigator.onLine && (
            <div className='network'>
              you are offline map can't load :(
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
