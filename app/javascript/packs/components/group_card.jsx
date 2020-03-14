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
          <h1 className="group-card__title">
            <a className="group-card__link" href={"/groups/"+this.props.id}>{ this.props.title }</a>
          </h1>
          <p>最新のレスポンス：</p>
          <p className="group-card__response">{ this.props.lateRes }</p>
          <div className="group-card__res-sum">
            <i className="group-card__res-icon fas fa-comment-dots"></i>
            <p>{ this.props.resNum }</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GroupCard;
