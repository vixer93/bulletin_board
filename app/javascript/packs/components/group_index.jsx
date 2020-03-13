import React, { Component, PropTypes } from 'react';
import GroupCreateButton from './group_create_button';
import GroupCreateForm   from './group_create_form.jsx';
import axios from 'axios';

class GroupIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: true,
      clickButton: false,
    }
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton(){
    this.setState({
      clickButton: true,
    })
  }

  closeGroupCreateModal(){
    this.setState({
      clickButton: false,
    })
  }

  render() {
    let groupCreateForm;

    if (this.state.clickButton) {
      groupCreateForm = <GroupCreateForm
                          closeGroupCreateModal={()=>{this.closeGroupCreateModal();}}
                        />
    }

    return (
      <React.Fragment>
        <div className="group-index"></div>
        <GroupCreateButton
          closeModal={()=>{this.closeModal();}}
          handleClickButton={()=>{this.handleClickButton();}}
        />
        { groupCreateForm }
      </React.Fragment>
    );
  }
}

export default GroupIndex;
