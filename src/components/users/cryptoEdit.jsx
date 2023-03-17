import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as cryptoActions from '../../actions/cryptoActions'
import { bindActionCreators } from 'redux';

const mapStateToProps = (states, props) => (
  {
    cryptoItem: states.cryptoItem
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    cryptoActions: bindActionCreators(cryptoActions , dispatch)
  }
)

class CryptoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infor: {},
      redirect: false
    };
  }

  componentWillMount() {
    const {cryptoItem} = this.props;

    this.setState({infor: cryptoItem})
  }

  handleSave() {
    const {infor} = this.state;
    const {cryptoActions} = this.props;

    cryptoActions.editCrypto(infor);
    this.setState({redirect: true});
  }

  render() {
    const {infor, redirect} = this.state;
    if(redirect) {
      return <Redirect to='/crypto/lists' />
    }
    return (
      <div className="learn-react">
        <div>
          <input
            type="text"
            value={infor.name}
            onChange={(e) => this.setState({infor : {...infor, name: e.target.value}})}
          />
          <input
            type="text"
            value={infor.value}
            onChange={(e) => this.setState({infor : {...infor, value: e.target.value}})}
          />
          <button onClick={() => this.handleSave()}>Save</button>
          <Link to='/crypto/lists'>
            <button type='button'>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoEdit);
