import React, { Component, PropTypes } from 'react';
import ResCreateBtn  from '../components/res_create_btn';
import ResCreateForm from '../components/res_create_form';
import ResCard       from '../components/res_card';
import axios         from 'axios';

class GroupShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      clickButton: false,
      responses: [],
      userResponse: false,
      isLoggedIn: false,
      userName: "",
    }
    this.getResponse  = this.getResponse.bind(this)
  }

  componentDidMount(){
    this.getCurrentUser();
    this.getResponse();
  }

  handleClickBtn(){
    this.getUserName();
    this.setState({clickButton: true})
  }

  closeForm(){
    this.setState({clickButton: false})
  }

  getResponse(){
    let url = `${location.href}/responses`

    axios.get(url)
    .then(res=>{
      this.setState({responses: res.data})
    })
  }

  getCurrentUser(){
    axios.get("/users/current")
    .then(res => {
      if (res.data) {
        this.setState({
          userResponse: true,
          isLoggedIn: true
        })
      }else{
        this.setState({
          userResponse: true,
          isLoggedIn: false
        })
      }
    })
  }

  getUserName(){
    axios.get("/users/user_name")
    .then(res => {
      this.setState({userName: res.data})
    })
  }

  render() {
    let resCreateBtn;
    let resCreateForm;
    let resCards = [];
    let tags = [];

    if (this.state.userResponse && this.state.isLoggedIn) {
      resCreateBtn = <ResCreateBtn
                       handleClickBtn={()=>{this.handleClickBtn();}}
                     />
    }

    if (this.state.clickButton) {
      resCreateForm = <ResCreateForm
                        userName={this.state.userName}
                        closeForm={()=>{this.closeForm();}}
                        getResponse={()=>{this.getResponse();}}
                      />
    }

    for(let i=0; i < this.state.responses.length; i++){
      resCards.push(<ResCard
                      responser={this.state.responses[i].responser}
                      content={this.state.responses[i].content}
                      date={this.state.responses[i].date}
                      key={i}
                      num={i+1}
                    />)
    }

    for(let i=0; i<this.props.tags.length; i++){
      tags.push(<span className="group-show__tag" key={i}>
                  {this.props.tags[i].name}
                </span>
               )
    }

    return (
      <React.Fragment>
        <div className="group-show">
          <div className="group-show__title">
            { this.props.group.title }
          </div>
          <div className="group-show__tags">
            { tags }
          </div>
          { resCards }
          { resCreateBtn }
          { resCreateForm }
        </div>
      </React.Fragment>
    );
  }
}

export default GroupShow;
