import React, { Component, PropTypes } from 'react';
import axios             from 'axios';

class ResCreateBtn extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <React.Fragment>
        <div onClick={this.props.handleClickBtn} className="res-create-btn">
          <i className="res-create-btn__icon far fa-comment-dots"></i>
        </div>
      </React.Fragment>
    );
  }
}

export default ResCreateBtn;
