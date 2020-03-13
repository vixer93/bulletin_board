import React, { Component, PropTypes } from 'react';
import ResCreateBtn from '../components/res_create_btn';
import ResCreateForm from '../components/res_create_form';
import axios             from 'axios';

class GroupShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      clickButton: false,
    }
  }

  handleClickBtn(){
    this.setState({clickButton: true})
  }

  closeForm(){
    this.setState({clickButton: false})
  }

  render() {
    let resCreateForm;

    if (this.state.clickButton) {
      resCreateForm = <ResCreateForm
                        closeForm={()=>{this.closeForm();}}
                      />
    }

    return (
      <React.Fragment>
        <ResCreateBtn
          handleClickBtn={()=>{this.handleClickBtn();}}
        />
        { resCreateForm }
      </React.Fragment>
    );
  }
}

export default GroupShow;
