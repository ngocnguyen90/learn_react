import React from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class CryptoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectEdit: false,
      cryptoId: null,
    };
  }

  handleEditButton(id) {
    const { handleEdit } = this.props;
    handleEdit(id);

    this.setState({ redirectEdit: true });
    this.setState({ cryptoId: id });
  }

  render() {
    const { cryptoLists, handleRemove, notFound } = this.props;
    const { redirectEdit, cryptoId } = this.state;

    if (redirectEdit) {
      return <Redirect to={`/crypto/edit/${cryptoId}`} />;
    }
    return (
      <div>
        {!notFound && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Value</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cryptoLists.map((crypto) => {
                return (
                  <tr key={crypto.id}>
                    <td>{crypto.id}</td>
                    <td>{crypto.name}</td>
                    <td>{crypto.value}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          this.handleEditButton(crypto.id)
                        }
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleRemove(crypto.id)}
                      >
                        remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {notFound && <span>not found</span>}
      </div>
    );
  }
}

CryptoLists.propTypes = {
  cryptoLists: PropTypes.array.isRequired,
};

export default CryptoLists;
