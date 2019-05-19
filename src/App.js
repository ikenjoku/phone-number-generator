import React, { Component } from 'react';
import { Collapse, Icon, Select, Tag } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import { generatePhoneNumbers, sortNumbers } from "./utils/phoneNumberGenerator";

const { Panel } = Collapse;
const { Option } = Select;

class App extends Component {
  state = {
    generatedNumbers: [],
    amountToGenerate: 50,
    totalGenerated: 0,
    minMax: '',
    minMaxValue: null,
  }

  componentDidMount(){
    const numGenerated = localStorage.getItem('phoneGenerator');
    if (numGenerated){
      const totalGenerated = parseInt(JSON.parse(numGenerated), 10);
        this.setState({ totalGenerated: totalGenerated });
      } else {
        this.setState({ totalGenerated: 0 });
      }
  }

  generateNumbers = () => {
    const { amountToGenerate } = this.state;
    const generatedNumbers = generatePhoneNumbers(amountToGenerate);
    this.setState((prevState, nextState) => {
      return {
        totalGenerated: prevState.totalGenerated + 50,
        generatedNumbers
      }
    }, this.updateLocalStore);
  }

  updateLocalStore = () => {
    const { totalGenerated } = this.state;
    localStorage.setItem('phoneGenerator', JSON.stringify(totalGenerated));
  }

  sortNumbers = (type) => {
    const { generatedNumbers } = this.state;
    if (generatedNumbers.length) {
      const sortedNumbers = sortNumbers(generatedNumbers, type);
      this.setState({ generatedNumbers: sortedNumbers });
    }
  }

  onClickCollapseHeader(key) {
    console.log(key);

  }

  getMinMax = (type) => {
    const { generatedNumbers } = this.state;
    if (type === 'Max'){
      const maxNum = Math.max(...generatedNumbers);
      this.setState({
        minMax: 'Max',
        minMaxValue: maxNum,
      });
    }
    else if (type === 'Min'){
      const minNum = Math.min(...generatedNumbers);
      this.setState({
        minMax: 'Min',
        minMaxValue: minNum,
      });
    }
  }

  clearMinMax = () => {
    this.setState({
        minMax: '',
        minMaxValue: null,
      });
  }

  generatedNumbers() {
    const { minMax, minMaxValue } = this.state;
    const genExtra = () => (
      <Icon
        type="download"
        className="control-items"
        onClick={event => {
          event.stopPropagation();
        }}
      />
    );

    const upArrow = () => (
      <Icon
        type="arrow-up"
        onClick={event => {
          this.sortNumbers('asc');
          event.stopPropagation();
        }}
      />
    );

    const downArrow = () => (
      <Icon
        type="arrow-down"
        onClick={event => {
          this.sortNumbers('desc');
          event.stopPropagation();
        }}
      />
    );

    return (
      <div>
        <Collapse
          defaultActiveKey={['1']}
          onChange={this.onClickCollapseHeader}
          expandIconPosition="left"
        >
          <Panel header="Mavis Couture" key="1" extra={genExtra()}>
            <div className="nums-controls">
              <div className='max-btn'>
                <Tag className='minmax-tag' onClick={() => this.getMinMax('Max')} color={ minMax === 'Max' && '#30021E' }>Max</Tag>
                <Tag className='minmax-tag' onClick={() => this.getMinMax('Min')} color={ minMax === 'Min' && '#30021E' }>Min</Tag>
                {minMaxValue && <Tag closable onClose={this.clearMinMax}>{ '0' + minMaxValue}</Tag>}
              </div>
              <div>
                <span className="control-items">Sort:</span>
                <span className="control-items">{upArrow()}</span>
                <span className="control-items">{downArrow()}</span>
              </div>
            </div>
            <div className="nums-container">
              {this.renderNumbers()}
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }

  renderNumbers() {
    const { generatedNumbers } = this.state;
    return generatedNumbers.map(number => <Tag className='num' key={number}>{ "0" + number }</Tag>);
  }

  render() {
    const { totalGenerated } = this.state;

    return (
      <div className="app">
        <div className="app-container">
          <header className="app-header">
            <p className="app-title">
              Phone Number Generator
          </p>
          </header>
          <main>
            <section className="stat-section">
              <p className="stat-text">Phone numbers generated to date: {totalGenerated}</p>
            </section>
            <section className="number-section">
              {this.generatedNumbers()}
            </section>
          </main>
        </div>
        <section className="reset-section">
          <Icon onClick={() => this.generateNumbers()} className="reset-icon" type="reload" />
          <p className="reset-text">Reset</p>
        </section>
        <footer>
          <p>&copy;2019 LMS Output</p>
        </footer>
      </div>
    );
  }
}

export default App;
