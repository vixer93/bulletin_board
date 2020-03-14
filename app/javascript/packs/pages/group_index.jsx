import React, { Component, PropTypes } from 'react';
import GroupCreateButton from '../components/group_create_button';
import GroupCreateForm   from '../components/group_create_form.jsx';
import GroupCard         from '../components/group_card.jsx'
import axios             from 'axios';

class GroupIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      clickButton: false,
      groups: [],
    }
    this.getGroups = this.getGroups.bind(this)
  }

  componentDidMount(){
    this.getCurrentUser();
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

  getCurrentUser(){
    axios.get("/users/current")
    .then(res => {
      if (res.data.id) {
        this.setState({
          isLoggedIn: true,
          currentUser: res.data,
        })
      }else{
        this.setState({isLoggedIn: false})
      }
    })
  }

  render() {
    let groupCreateBtn;
    let groupCreateForm;
    let groups = [];

    if (this.state.isLoggedIn) {
      groupCreateBtn = <GroupCreateButton
                         handleClickButton={()=>{this.handleClickButton();}}
                       />
    }

    if (this.state.clickButton) {
      groupCreateForm = <GroupCreateForm
                          closeGroupCreateModal={()=>{this.closeGroupCreateModal();}}
                        />
    }

    for(let i=0; i < this.state.groups.length; i++){
      let lateRes;

      if (this.state.groups[i].lateRes) {
        lateRes = this.state.groups[i].lateRes.content;
      }else{
        lateRes = "まだレスポンスがありません"
      }

      groups.push(<GroupCard
                    title={this.state.groups[i].title}
                    id={this.state.groups[i].id}
                    lateRes={lateRes}
                    resNum={this.state.groups[i].resNum}
                    key={this.state.groups[i].id}
                 />)
    }

    return (
      <React.Fragment>
        <div className="group-index">
          { groups }
        </div>
        { groupCreateBtn }
        { groupCreateForm }
      </React.Fragment>
    );
  }
}

export default GroupIndex;
