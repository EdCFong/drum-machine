import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: "0 3px orange",
  height: 65,
  marginTop: 13,
  paddingTop: "20px",
  borderRadius: "5px"
}

const inactiveStyle = {
  backgroundColor: 'grey',
  height: 65,
  marginTop: 10,
  boxShadow: "3px 3px 5px black",
  paddingTop: "20px",
  borderRadius: "5px"
}

const activeStyleOff = {
  height: 65,
  marginTop: 13,
  backgroundColor: 'grey',
  boxShadow: "0 3px grey",
  paddingTop: "20px",
  borderRadius: "5px"
}

const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: 'Heater Kit',
      sliderVal: 0.5
    }
    this.displayClipName = this.displayClipName.bind(this);
  }
  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }

  render() {
    return (
      <body className="container-fluid">
        <div id="drum-machine" className="container text-center">
          <div className="row">
            <div className="col-sm-6">
              <p id="display">
                {this.state.display}
              </p>
              <PadBank
                power={this.state.power}
                updateDisplay={this.displayClipName}
                currentPadBank={this.state.currentPadBank} />
            </div>
            <div className="col-sm-6">
              <ControlsPanel />
            </div>
          </div>
        </div>
      </body>
    )
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.props.power) {
      this.state.padStyle.backgroundColor === 'orange' ?
        this.setState({
          padStyle: inactiveStyle
        }) :
        this.setState({
          padStyle: activeStyle
        });
    }
    else {
      this.state.padStyle.marginTop === 13 ?
        this.setState({
          padStyle: inactiveStyle
        }) :
        this.setState({
          padStyle: activeStyleOff
        });
    }
  }
  playSound(event) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 160);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));  // replace(/-/g, ' ') change Chord-1  for Chord 1, no datches
  }
  render() {
    return (
      <div id={this.props.clipId}
        onClick={this.playSound}
        className="drum-pad"
        style={this.state.padStyle} >
        <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
        {this.props.keyTrigger}
      </div>
    )
  }
}
class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    if (this.props.power) {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clipId={padBankArr[i].id}
            clip={padBankArr[i].url}
            keyTrigger={padBankArr[i].keyTrigger}
            keyCode={padBankArr[i].keyCode}
            updateDisplay={this.props.updateDisplay}
            power={this.props.power} />
        )
      });
    }
    else {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clipId={padBankArr[i].id}
            clip="#"
            keyTrigger={padBankArr[i].keyTrigger}
            keyCode={padBankArr[i].keyCode}
            updateDisplay={this.props.updateDisplay}
            power={this.props.power} />
        )
      });
    }

    return (
      <div className="pad-bank">
        {padBank[0]}
        {padBank[1]}
        {padBank[2]}
        {padBank[3]}
        {padBank[4]}
        {padBank[5]}
        {padBank[6]}
        {padBank[7]}
        {padBank[8]}
      </div>
    )
  }
}

class ControlsPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="controls">
        {/* On/Off FlipSwitch styled by https://proto.io/freebies/onoff/   */}
        <div id="onOffSelector" class="onoffswitch">
          <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" />
          <label class="onoffswitch-label" for="myonoffswitch">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
          </label>
        </div>
        <div id="bankSelector" class="onoffswitch2">
          <input type="checkbox" name="onoffswitch2" class="onoffswitch-checkbox2" id="myonoffswitch2" />
          <label class="onoffswitch-label2" for="myonoffswitch2">
            <span class="onoffswitch-inner2"></span>
            <span class="onoffswitch-switch2"></span>
          </label>
        </div>
          <label id="volumenLabel" for="volumen-range">Volumen</label>
          <input type="range" class="range vertical-heighest-first round" id="volumen-range"></input>
      </div>
    )
  }
}

export default App;
