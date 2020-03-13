import React, { Component, PropTypes } from 'react';
import axios from 'axios';

class GroupCreateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupTitle: "",
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
  }

  handleChangeTitle(event){
    this.setState({
      groupTitle: event.target.value,
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
            <button className="group-create-form__submit">作成！</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GroupCreateForm;
