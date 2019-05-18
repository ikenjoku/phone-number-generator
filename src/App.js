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
  }

  generateNumbers = () => {
    const { amountToGenerate } = this.state;
    const generatedNumbers = generatePhoneNumbers(amountToGenerate);
    this.setState((prevState, nextState) => {
      return {
        totalGenerated: prevState.totalGenerated + 50,
        generatedNumbers
      }
    });
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

  generatedNumbers() {
    const genExtra = () => (
      <Icon
        type="download"
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
              <div>
                <span>Max</span>
                <span>Min</span>
              </div>
              <div>
                <span>Sort:</span> {upArrow()}{downArrow()}
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
    return generatedNumbers.map(number => <Tag key={number} color="purple">{ "0" + number }</Tag>);
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
              <p className="stat-text">Phone numbers generated till date: {totalGenerated}</p>
            </section>
            <section className="number-section">
              {this.generatedNumbers()}
            </section>
          </main>
        </div>
        <section className="reset-section">
          <Icon onClick={() => this.generateNumbers()} className="reset-icon" type="reload" />
          <p className="reset-text">Reload</p>
        </section>
        <footer>
          <p>&copy;2019 LMS Output</p>
        </footer>
      </div>
    );
  }
}

export default App;
