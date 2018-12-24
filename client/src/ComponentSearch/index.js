import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNumbersList } from "../reducers";
import { findPrime } from "../actions/Actions";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      isTouched: {
        searchValue: false
      }
    };
  }

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  isSubmitDisabled = () => {
    const errors = this.validate(this.state.searchValue);
    return Object.values(errors).some(errMsg => {
      return errMsg;
    });
  };

  validate = searchValue => {
    const errors = {
      searchValue: !searchValue
        ? "Input field cannot be empty"
        : !/^[0-9]*$/.test(searchValue)
        ? "Please insert only numbers"
        : /^[0-9]{3}$/.test(searchValue)
        ? ""
        : "Number must contain three digits"
    };
    return errors;
  };

  handleFocus = e => {
    const field = e.target.name;
    this.setState(prevState => ({
      isTouched: {
        ...prevState.isTouched,
        [field]: true
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.isSubmitDisabled()) {
      const { searchValue } = this.state;
      const { numberList } = this.props;
      const NumbersArray = numberList.split(" ");

      this.props.findPrime(NumbersArray, searchValue);
    }
  };
  render() {
    const { searchValue, isTouched } = this.state;
    let errors = this.validate(searchValue);

    return (
      <div>
        <form className="searchComponent" onSubmit={this.handleSubmit}>
          <label htmlFor="searchValue">Search the Number:</label>
          <input
            name="searchValue"
            className={
              errors.searchValue && isTouched.searchValue ? "invalid" : ""
            }
            type="text"
            value={searchValue}
            onChange={this.handleChange}
            onBlur={this.handleFocus}
          />
          {isTouched.searchValue && errors.searchValue && (
            <span className="err-msg">{errors.searchValue}</span>
          )}

          <button className="searchButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
Search.propTypes = {
  findPrime: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  numberList: getNumbersList(state)
});

export default connect(
  mapStateToProps,
  { findPrime }
)(Search);
