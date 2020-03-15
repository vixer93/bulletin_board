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
      searchWord: "",
    }
    this.getGroups = this.getGroups.bind(this)
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
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
    axios.get("/groups/info",
              {params: {keyword: this.state.searchWord}}
             )
    .then(res=>{
      this.setState({
        groups: res.data,
        searchWord: "",
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

  handleChangeSearch(e){
    this.setState({searchWord: e.target.value},)
  }

  handleClickTag(word){
    axios.get("/groups/info",
              {params: {keyword: word}}
             )
    .then(res=>{
      this.setState({
        groups: res.data,
        searchWord: word,
      })
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
      let tags;

      if (this.state.groups[i].lateRes) {
        lateRes = this.state.groups[i].lateRes.content;
      }else{
        lateRes = "まだレスポンスがありません"
      }

      if (this.state.groups[i].tags) {
        tags = this.state.groups[i].tags;
      }else{
        tags = null
      }

      groups.push(<GroupCard
                    title={this.state.groups[i].title}
                    id={this.state.groups[i].id}
                    lateRes={lateRes}
                    resNum={this.state.groups[i].resNum}
                    tags={tags}
                    handleClickTag={(word)=>{this.handleClickTag(word);}}
                    key={this.state.groups[i].id}
                 />)
    }

    return (
      <React.Fragment>
        <div className="group-index">
          <div className="group-index__search">
            <input onChange={this.handleChangeSearch} value={this.state.searchWord} className="group-index__search-form" placeholder="検索ワード"/>
            <i onClick={this.getGroups} className="group-index__search-icon fas fa-search">検索</i>
          </div>
          { groups }
        </div>
        { groupCreateBtn }
        { groupCreateForm }
      </React.Fragment>
    );
  }
}

export default GroupIndex;
