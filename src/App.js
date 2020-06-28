import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      resetDisplay: null,
      operands: [],
      operators: []
    };
  }

  componentDidUpdate() {
    // If calculation is due
    if (this.state.operands.length > 1 && this.state.operators.length > 0 && this.state.display !== "-") {
      // Update state with calculation results
      this.setState(({ operands, operators, equals }) => {
        const result = this.calculateResult(operands, operators);
        return {
          display: result,
          // Set the new result as the new operand
          operands: [result],
          // If equal sign was pressed reset operators, otherwise retain the second operator
          operators: equals ? [] : [operators[1]],
          equals: false
        };
      });
    }
  }

  // Make calculations 
  calculateResult = ([a, b], [operator]) => {
    // Parse a into floating point integer
    const x = parseFloat(a);
    // Parse b into floating point integer
    const y = parseFloat(b);
    // Result of calculation
    let result = operator === "/" ? x / y :
      operator === "*" ? x * y :
        operator === "-" ? x - y :
          x + y;

    // Return result as a string
    return result.toString();
  }

  // Clear entire state
  clear = (e) => {
    this.setState({
      display: "0",
      resetDisplay: null,
      operands: [],
      operators: [],
      equals: null
    });
  }

  onDigit = (e) => {
    const digit = e.target.innerHTML;
    this.setState(({ display, resetDisplay }) => ({
      display: resetDisplay || display === "0" ? digit : display.concat(digit),
      resetDisplay: false
    }));
  }

  onOperator = (e) => {
    const operator = e.target.innerHTML;

    this.setState(({ display, resetDisplay, operands, operators }) => ({
      operands: !resetDisplay && display !== "-" ? operands.concat(display) : operands,
      operators: !resetDisplay && display !== "-" ? operators.concat(operator) : [operator],
      resetDisplay: true
    }));
  }

  onSubtract = (e) => {
    this.setState(({ display, resetDisplay, operands, operators }) => {
      // Subtract
      if (!resetDisplay || display === "0") {
        return {
          operands: !resetDisplay && display !== "-" ? operands.concat(display) : operands,
          operators: !resetDisplay ? operators.concat("-") : ["-"],
          resetDisplay: true
        }
        // Negative Sign
      } else {
        return {
          display: "-",
          resetDisplay: false
        }
      }
    });
  }

  onDecimal = () => {
    this.setState(({ display }) => ({
      // If the display does not already contain a "." then concatenate the ".", otherwise return orginal display
      display: display.indexOf(".") === -1 ? display.concat(".") : display,
      resetDisplay: false
    }));
  }

  onEquals = () => {
    this.setState(({ display, operands }) => ({
      operands: display !== "-" ? operands.concat(display) : operands,
      equals: true,
      resetDisplay: true
    }));
  }

  render() {
    const { clear, onDigit, onOperator, onSubtract, onDecimal, onEquals } = this;

    return (
      <div className="App" >

        <div id="display">{this.state.display}</div>

        <button id="clear" onClick={clear}>AC</button>
        <button id="divide" className="operation" onClick={onOperator}>/</button>
        <button id="multiply" className="operation" onClick={onOperator}>*</button>

        <button id="seven" className="digit" onClick={onDigit}>7</button>
        <button id="eight" className="digit" onClick={onDigit}>8</button>
        <button id="nine" className="digit" onClick={onDigit}>9</button>
        <button id="subtract" className="operation" onClick={onSubtract}>-</button>

        <button id="four" className="digit" onClick={onDigit}>4</button>
        <button id="five" className="digit" onClick={onDigit}>5</button>
        <button id="six" className="digit" onClick={onDigit}>6</button>
        <button id="add" className="operation" onClick={onOperator}>+</button>

        <button id="one" className="digit" onClick={onDigit}>1</button>
        <button id="two" className="digit" onClick={onDigit}>2</button>
        <button id="three" className="digit" onClick={onDigit}>3</button>
        <button id="equals" onClick={onEquals}>=</button>

        <button id="zero" className="digit" onClick={onDigit}>0</button>
        <button id="decimal" onClick={onDecimal}>.</button>

      </div>
    );
  }
}

export default App;
