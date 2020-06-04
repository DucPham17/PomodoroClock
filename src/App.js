import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        breakTime : 5,
        sessionTime : 25,
        timeLeft : 1500,
        timeState : "Stop",
        intervalId : " ",
        timerType : "Session"
    }
    this.timeRemain= this.timeRemain.bind(this)
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this)
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this)
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this)
    this.handleRun = this.handleRun.bind(this)
  }
  

  timeRemain(){
    let minutes = Math.floor(this.state.timeLeft / 60);
    let seconds = this.state.timeLeft - minutes * 60;
    minutes = minutes < 10 ? "0"+ minutes : minutes;
    seconds = seconds < 10 ? "0"+ seconds : seconds;
    return minutes + ':' + seconds;
  }

  handleReset(){
    this.setState({
        breakTime : 5,
        sessionTime : 25,
        timeLeft : 1500,
        timeState : "Stop",
        intervalId : " ",
        timerType : "Session"
    })
    clearInterval(this.state.intervalId);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  handleBreakDecrement(){
    if(this.state.timeState ==="Stop"){
    let breakMoment = this.state.breakTime;
    if(breakMoment <= 1){
      return;
    }
    this.setState({
      breakTime : breakMoment - 1,
    })}
    else {
      return;
    }
  }


  handleBreakIncrement(){
    if(this.state.timeState ==="Stop"){
    let breakMoment = this.state.breakTime;
    if(breakMoment >= 60){
      return;
    }
    this.setState({
      breakTime : breakMoment + 1,
    })}
    else {
      return;
    }
  }

  handleSessionDecrement(){
    let time = this.state.sessionTime;
    if(time <= 1){
      return
    }
    if(this.state.timeState === "Stop"){
      if(this.state.sessionTime >= 1){
        this.setState({
          sessionTime : time - 1,
          timeLeft: (time - 1) *60
        })
      }
     else{
       return
     }
    }
  }

  handleSessionIncrement(){
    let time = this.state.sessionTime;
    if(time >= 60){
      return;
    }
    if(this.state.timeState === "Stop"){
      this.setState({
        sessionTime : time + 1,
        timeLeft : (time + 1) * 60
      })
    }
    else{
      return;
    }
  }

  handleRun(){
    if(this.state.timeState === "Stop"){
      this.setState({
        timeState : "Run"
      })
      
      this.setState({
        intervalId: setInterval(() => this.decrease(),1000)
      }) 
    }
    else{
      clearInterval(this.state.intervalId)
      this.setState(
        {
          timeState : "Stop"
        }
      )
    }
  }

  decrease(){
    if(this.state.timeState == "Run"){
    if(this.state.timeLeft >= 0){
      this.setState({
        timeLeft : this.state.timeLeft - 1
      })
    }
    if(this.state.timeLeft === -1){
      if(this.state.timerType == "Session"){
        this.setState({
          timerType : "Break",
          timeLeft : this.state.breakTime * 60,
        })
        let count = 0;
        while(count < 3){
        this.audioBeep.play()
        console.log("a")
        count = count + 1;
        }
      }
      else if(this.state.timerType == "Break"){
        this.setState({
          timerType : "Session",
          timeLeft : this.state.sessionTime * 60,
        })
        let count = 0;
        while(count < 3){
        this.audioBeep.play()
        console.log("a")
        count = count + 1;
        }
      }
    }
  }
    
  }

  render(){
    return(
      <div>
        <h1>Pomodoro Clock</h1>
        <div id="display">
        <div id="break-label">
        <h3>Break Length</h3>
        <button className="btn-default" id="break-decrement" onClick={this.handleBreakDecrement}>B-Decre</button>
          <div id="break-length">
          <h2>{this.state.breakTime}</h2>
          </div>
          <button className="btn-default" id="break-increment" onClick={this.handleBreakIncrement}>B-Incre</button>  
        </div>
        <div id="session-label">
          <h3>Session Length</h3>
          <button className="btn-default" id="session-decrement" onClick={this.handleSessionDecrement}>S-Decre</button>
          <div id="session-length">
          <h2>{this.state.sessionTime}</h2>
          </div>
          <button className="btn-default" id="session-increment" onClick={this.handleSessionIncrement}>S-Incre</button>       
          </div>
          </div>
          <br/>
          <div id="time-remain">
          <div id="timer-label">
          <h2>{this.state.timerType} :</h2>
          </div>  
          <div id="time-left">
          <h3>{this.timeRemain()}</h3>
          </div>
          <button className="btn-default" id="start_stop" onClick={this.handleRun}>Start/Stop</button>
          <br/>
          <br/>
          <button className="btn-default" id="reset" onClick={this.handleReset}>Reset</button>
          <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
          </div>
          <p> Created by: <a href="https://www.linkedin.com/in/duc-pham-068092178/">Duc Pham</a></p>
      </div>
    )
  }
}

export default App;
