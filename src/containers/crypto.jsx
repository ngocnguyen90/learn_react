import React from 'react';
import CryptoLists from '../components/users/cryptoLists';
import CryptoSearch from '../components/users/cryptoSearch';
import _ from 'lodash';
import CryptoAdd from '../components/users/cryptoAdd';
import CryptoEdit from '../components/users/cryptoEdit';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as cryptoActions from '../actions/cryptoActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (states, props) => ({
  cryptoLists: states.cryptoState,
  searchData: states.searchData,
  cryptoItem: states.cryptoItem
});

const mapDispatchToProps = (dispatch) => ({
  cryptoActions: bindActionCreators(cryptoActions, dispatch),
});

class Crypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: null,
      notFound: false,
      pageTitle: 'Crypto Lists'
    };
  }

  componentWillMount() {
    const { cryptoActions, cryptoLists } = this.props;
    cryptoActions.setSearchData(cryptoLists);
  }

  searchDelay(query) {
    const { timeout } = this.state;
    const { cryptoLists, cryptoActions } = this.props;
    if (_.isEmpty(cryptoLists)) {
      return;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    const search = setTimeout(() => {
      const searchData = this.searching(query);
      if (_.isEmpty(searchData)) {
        this.setState({ notFound: true });
      } else {
        this.setState({ notFound: false });
      }
      cryptoActions.setSearchData(searchData);
    }, 500);
    this.setState({ timeout: search });
  }

  searching(query) {
    const { cryptoLists } = this.props;
    if (_.isEmpty(query)) {
      return cryptoLists;
    }
    return cryptoLists.filter(
      (crypto) =>
        parseInt(query) === parseInt(crypto.id) ||
        _.startsWith(crypto.value, query) ||
        _.startsWith(crypto.name.toLowerCase(), query.toLowerCase())
    );
  }

  setPageTitle(title) {
    this.setState({ pageTitle: title });
  }

  handleEdit(id) {
    const { cryptoLists, cryptoActions } = this.props;
    const data = cryptoLists.find((crypto) => crypto.id === id);

    cryptoActions.setCryptoItem(data);
    this.setPageTitle('Edit Crypto');
  }

  handleRemove(id) {
    const { cryptoLists, cryptoActions } = this.props;
    const cryptoData = cryptoLists.filter((crypto) => {
      return crypto.id !== id;
    });
    cryptoActions.setListCrypto(cryptoData);
    cryptoActions.setSearchData(cryptoData);
  }

  handleSave(cryptoData) {
    const { cryptoActions } = this.props;
    cryptoActions.addCrypto(cryptoData);
  }

  render() {
    const { notFound, pageTitle } = this.state;
    const { searchData } = this.props;
    return (
      <div>
        <h1 style={{ margin: '20px' }}>{pageTitle}</h1>
        <Switch>
          <Route
            exact
            path="/crypto/lists"
            render={() => (
              <div>
                <Link to="/crypto/add">
                  <button
                    style={{ marginLeft: '20px' }}
                    type="button"
                  >
                    Add Crypto
                  </button>
                </Link>
                <CryptoSearch
                  searchDelay={(query) => this.searchDelay(query)}
                />
                <CryptoLists
                  cryptoLists={searchData}
                  notFound={notFound}
                  handleEdit={(id) => this.handleEdit(id)}
                  handleRemove={(id) => this.handleRemove(id)}
                />
              </div>
            )}
          />
          <Route
            path="/crypto/add"
            render={() => (
              <CryptoAdd
                setPageTitle={(title) => this.setPageTitle(title)}
                handleSave={(data) => this.handleSave(data)}
              />
            )}
          />
          <Route
            path="/crypto/edit/:id"
            render={() => (
              <CryptoEdit
                setPageTitle={(title) => this.setPageTitle(title)}
                doEdit={(data) => this.doEdit(data)}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Crypto);
