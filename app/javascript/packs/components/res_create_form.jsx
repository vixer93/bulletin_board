import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import rsScroller    from 'react-smooth-scroller';

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class ResCreateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: "",
      btnDisabled: true,
    }
    this.handleChangeRes = this.handleChangeRes.bind(this)
    this.handleSubmitRes = this.handleSubmitRes.bind(this)
    this.scrollBottom    = this.scrollBottom.bind(this)

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
  }

  handleChangeRes(event){
    let isNull = true;

    if (event.target.value) {
      isNull = false;
    }
    this.setState({
      response: event.target.value,
      btnDisabled: isNull,
    })
  }

  handleSubmitRes(event){
    event.preventDefault();

    let   formData    = new FormData();
    const current_url = location.href;

    formData.append('response[content]', this.state.response);

    axios.post(`${current_url}/responses`,
               formData,
               {headers: {'content-type': 'multipart/form-data',}}
              )
    .then(res=>{
      this.setState({response: ""})
      this.props.getResponse();
      this.scrollBottom();
    })

  }

  scrollBottom(){
    let response_area = document.getElementsByClassName('group-show')[0];
    rsScroller.scroller(window.pageYOffset, response_area.scrollHeight);
  }

  render() {

    return (
      <React.Fragment>
        <div className="res-create-form">
          <h1 className="res-create-form__title">新規レスポンス</h1>
          <p>from</p>
          <p className="res-create-form__user-name">名無しさん</p>
          <p>レスポンス</p>
          <textarea onChange={this.handleChangeRes} value={this.state.response} className="res-create-form__input" placeholder="内容を記入してください"/>
          <button onClick={this.handleSubmitRes} disabled={this.state.btnDisabled} className="res-create-form__submit">投稿</button>
          <button onClick={this.props.closeForm} className="res-create-form__close">閉じる</button>
        </div>
      </React.Fragment>
    );
  }
}

export default ResCreateForm;
