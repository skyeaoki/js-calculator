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
      // If the display is 0 or has been reset, set display to digit
      // Otherwise concatenate digit to the display
      display: resetDisplay || display === "0" ? digit : display.concat(digit),
      // Do not reset display
      resetDisplay: false
    }));
  }

  onOperator = (e) => {
    const operator = e.target.innerHTML;

    this.setState(({ display, resetDisplay, operands, operators }) => ({
      // If the display was not reset and isn't "-" then concatenate the current display to the operands array
      operands: !resetDisplay && display !== "-" ? operands.concat(display) : operands,
      // If the display was not reset and isn't "-" rhwn concatenate the current operator to the operators array
      operators: !resetDisplay && display !== "-" ? operators.concat(operator) : [operator],
      // Reset display
      resetDisplay: true
    }));
  }

  onSubtract = (e) => {
    this.setState(({ display, resetDisplay, operands, operators }) => {
      // Subtract: If display was not reset or display is 0
      if (!resetDisplay || display === "0") {
        return {
          // If the display was not reset and isn't "-" then concatenate the current display to the operands array
          operands: !resetDisplay && display !== "-" ? operands.concat(display) : operands,
          // If the display was not reset concatenate '-' to the operators array
          // Otherwise set operators to ["-"]
          operators: !resetDisplay ? operators.concat("-") : ["-"],
          // Reset display
          resetDisplay: true
        }
        // Otherwise act as a negative sign 
      } else {
        return {
          display: "-",
          // Do not reset display
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
        <button id="divide" className="operator" onClick={onOperator}>/</button>
        <button id="multiply" className="operator" onClick={onOperator}>*</button>

        <button id="seven" className="digit" onClick={onDigit}>7</button>
        <button id="eight" className="digit" onClick={onDigit}>8</button>
        <button id="nine" className="digit" onClick={onDigit}>9</button>
        <button id="subtract" className="operator" onClick={onSubtract}>-</button>

        <button id="four" className="digit" onClick={onDigit}>4</button>
        <button id="five" className="digit" onClick={onDigit}>5</button>
        <button id="six" className="digit" onClick={onDigit}>6</button>
        <button id="add" className="operator" onClick={onOperator}>+</button>

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
