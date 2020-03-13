import React, { Component, PropTypes } from 'react';
import axios from 'axios';

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class GroupCreateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupTitle: "",
      btnDisabled: true,
    }
    this.handleChangeTitle      = this.handleChangeTitle.bind(this)
    this.handleSubmitGroupTitle = this.handleSubmitGroupTitle.bind(this)

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
  }

  handleChangeTitle(event){
    let isNull = true;

    if (event.target.value) {
      isNull = false;
    }
    this.setState({
      groupTitle: event.target.value,
      btnDisabled: isNull,
    })
  }

  handleSubmitGroupTitle(){
    event.preventDefault();

    let formData = new FormData();
    formData.append('group[title]', this.state.groupTitle);

    axios.post("/groups",
               formData,
               {headers: {'content-type': 'multipart/form-data',}}
              )
    .then(res=>{
      document.location.href = `/groups/${res.data.id}`
    })
  }

  render() {

    return (
      <React.Fragment>
        <div className="group-create-form">
          <div className="group-create-form__bg" onClick={this.props.closeGroupCreateModal}></div>
          <div className="group-create-form__input-area">
            <h1 className="group-create-form__title">新しいスレッドを作成</h1>
            <input onChange={this.handleChangeTitle} className="group-create-form__input-title" type="text" placeholder="タイトルを入力"/><br/>
            <button onClick={this.handleSubmitGroupTitle} disabled={this.state.btnDisabled} className="group-create-form__submit">作成！</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GroupCreateForm;
