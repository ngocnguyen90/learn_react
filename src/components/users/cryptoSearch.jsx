import React from 'react';

class CryptoSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  handleSearch(e) {
    const { searchDelay } = this.props
    const query = e.target.value;
    searchDelay(query)
  }

  render() {
    return (
      <div className='learn-react'>
        <input
          onChange={(e) => this.handleSearch(e)}
        />
      </div>
    );
  }
}

export default CryptoSearch;
