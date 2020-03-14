import React, { Component, PropTypes } from 'react';

class ResCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      clickButton: false,
    }
  }

  render() {

    return (
      <React.Fragment>
        <div className="res-card">
          <div className="res-card__head">
            {this.props.num}
            <h3 className="res-card__user-name">{this.props.responser}</h3>
            <p className="res-card__date">{this.props.date}</p>
          </div>
          <p className="res-card__response">
            {this.props.content}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default ResCard;
