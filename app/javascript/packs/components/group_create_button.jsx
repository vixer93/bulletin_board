import React, { Component, PropTypes } from 'react';

class GroupCreateButton extends Component {
  render() {

    return (
      <React.Fragment>
        <div className="group-create-button" onClick={this.props.handleClickButton}>
          <div className="group-create-button__content">
            <p className="group-create-button__description" >スレッドを開始する</p>
            <i className="group-create-button__icon fas fa-comments"></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GroupCreateButton;
