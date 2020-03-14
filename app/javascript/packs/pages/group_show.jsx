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
    }
    this.getResponse  = this.getResponse.bind(this)
  }

  componentDidMount(){
    this.getResponse();
  }

  handleClickBtn(){
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

  render() {
    let resCreateForm;
    let resCards = [];

    if (this.state.clickButton) {
      resCreateForm = <ResCreateForm
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

    return (
      <React.Fragment>
        <div className="group-show">
          <div className="group-show__title">
            {this.props.group.title}
          </div>
          { resCards }
          <ResCreateBtn
            handleClickBtn={()=>{this.handleClickBtn();}}
          />
          { resCreateForm }
        </div>
      </React.Fragment>
    );
  }
}

export default GroupShow;
