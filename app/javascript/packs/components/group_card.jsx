import React, { Component, PropTypes } from 'react';

class GroupCard extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <React.Fragment>
        <div className="group-card">
          <h1 className="group-card__title">{ this.props.title }</h1>
          <p className="group-card__response">ここに最新のレスの内容が入ります。</p>
          <div className="group-card__res-sum">
            <i className="group-card__res-icon fas fa-comment-dots"></i>
            <p>123</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GroupCard;
