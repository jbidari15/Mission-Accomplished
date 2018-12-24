import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { fetchNumberList, fetchSavedData } from "./actions/Actions";
import { connect } from "react-redux";
import Search from "./ComponentSearch";
import { getSavedResults, isLoading, isNotFound } from "./reducers";
import "./app.css";
import spinner from "./spinner.gif";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchNumberList();
    this.props.fetchSavedData();
  }

  render() {
    const { savedResults, notFound, loading } = this.props;
    const tableRows = savedResults.map((item, i) => (
      <tr key={`${i + 1}`}>
        <td>{item.searchValue}</td>
        <td>{item.searchResult}</td>
        <td>
          <Moment format="DD.MM.YYYY">{item["start date"]}</Moment>
        </td>
      </tr>
    ));
    return (
      <div className="app">
        <Search />
        <div className="title">
          Below are the list of all saved data arranged in descending order by
          searched date
        </div>

        {loading ? (
          <div className="loader">
            <img src={spinner} alt="loadingIimage" />
          </div>
        ) : notFound ? (
          <div className="notFound">
            Prime Number containing given search value does not exist
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Searched Value</th>
                <th>Result(First Prime Number)</th>
                <th>Searched Date</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        )}
      </div>
    );
  }
}
App.propTypes = {
  fetchNumberList: PropTypes.func.isRequired,
  fetchSavedData: PropTypes.func.isRequired,
  savedResults: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  savedResults: getSavedResults(state),
  loading: isLoading(state),
  notFound: isNotFound(state)
});

export default connect(
  mapStateToProps,
  { fetchNumberList, fetchSavedData }
)(App);
