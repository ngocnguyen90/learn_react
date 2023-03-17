import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class CryptoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      cryptoData: {
        name: '',
        value: '',
      },
    };
  }

  submit() {
    const { handleSave } = this.props;
    const { cryptoData } = this.state;

    handleSave(cryptoData);
    this.setState({redirect: true});
  }

  render() {
    const { cryptoData, redirect } = this.state;
    if(redirect) {
      return <Redirect to='/crypto/lists' />
    }
    return (
      <div className="learn-react">
        <input
          type="text"
          value={cryptoData.name}
          onChange={(e) =>
            this.setState({
              cryptoData: { ...cryptoData, name: e.target.value },
            })
          }
        />
        <input
          type="text"
          value={cryptoData.value}
          onChange={(e) =>
            this.setState({
              cryptoData: {
                ...cryptoData,
                value: e.target.value,
              },
            })
          }
        />
        <button onClick={() => this.submit()}>Save</button>
        <Link to="/crypto/lists">
          <button type="button">Cancel</button>
        </Link>
      </div>
    );
  }
}

export default CryptoAdd;
