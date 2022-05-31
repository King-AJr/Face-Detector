import React, { Component } from 'react';
import Navigation from './Component/navigation/navigation';
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/imageLinkForm/imageLinkForm';
import Rank from './Component/Rank/Rank';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/register/register';
import './App.css';




class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: "",
      box: {},
      route: 'signin',
      isSignedIn: false,
      users: {
        id:'',
            name: '',
            email: '',
            entries: 0,
            joined: ''
      }
    }
  }



loadUser = (data) => {
  this.setState({users: 
    {id: data.id,
    name: data.name,
    email: data.email,
    enteries: data.enteries,
    joined: data.joined,
}})
}


calculateFaceLocation = (data) => {

}

  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input})
  fetch('http://localhost:3001/image', {
    method:'put',
    headers:{'content-Type': 'application/json'},
    body:JSON.stringify({
      id: this.state.users.id
    })})
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.users,{enteries:count}))
    })

    
  
}


onRouteChange =(route) => {
  this.setState({route: route});
  if ( this.state.route === 'signout'){
    this.setState({isSignedIn: false})
  }
  else if (this.state.route === 'home'){
    this.setState({isSignedIn: true})
  }
}

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className='App'>
      <Navigation onRouteChange={this.onRouteChange}
      isSignedIn={isSignedIn}/>
      
       { route === 'home' 
       ? <div>
       <Logo />
       <Rank make={this.state.users.name}
       enteries={this.state.users.enteries} />
    <ImageLinkForm 
       onInputChange={this.onInputChange} 
       onButtonSubmit={this.onButtonSubmit}/>
<FaceRecognition imageUrl={imageUrl}/>
    </div>
         :(
          route === 'signin' ?
          <SignIn onRouteChange={this.onRouteChange}
          loadUser ={this.loadUser}/>
          :<Register loadUser ={this.loadUser}
          onRouteChange={this.onRouteChange}/>
         )
  }
    </div>
  );}
}

export default App;
