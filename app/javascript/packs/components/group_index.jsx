import React, { Component, PropTypes } from 'react';
import GroupCreateButton from './group_create_button';
import GroupCreateForm   from './group_create_form.jsx';
import GroupCard         from './group_card.jsx'
import axios             from 'axios';

class GroupIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: true,
      clickButton: false,
      groups: [],
    }
    this.getGroups = this.getGroups.bind(this)
  }

  componentDidMount(){
    this.getGroups();
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

  getGroups(){
    axios.get("/groups/info")
    .then(res=>{
      this.setState({
        groups: res.data,
      })
    })
  }

  render() {
    let groupCreateForm;
    let groups = [];

    if (this.state.clickButton) {
      groupCreateForm = <GroupCreateForm
                          closeGroupCreateModal={()=>{this.closeGroupCreateModal();}}
                        />
    }

    for(let i=0; i < this.state.groups.length; i++){
      groups.push(<GroupCard
                    title={this.state.groups[i].title}
                    key={this.state.groups[i].id}
                 />)
    }

    return (
      <React.Fragment>
        <div className="group-index">
          { groups }
        </div>
        <GroupCreateButton
          handleClickButton={()=>{this.handleClickButton();}}
        />
        { groupCreateForm }
      </React.Fragment>
    );
  }
}

export default GroupIndex;
