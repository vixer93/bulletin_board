import React, { Component, PropTypes } from 'react';
import axios from 'axios';

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class GroupCreateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupTitle: "",
      tags: [],
      tagName: "",
      tagBtnDisabled: true,
      submitBtnDisabled: true,
    }
    this.handleChangeTitle      = this.handleChangeTitle.bind(this)
    this.handleSubmitGroup      = this.handleSubmitGroup.bind(this)
    this.handleClickAddTag      = this.handleClickAddTag.bind(this)
    this.handleChangeTag        = this.handleChangeTag.bind(this)
    this.handleClickRemoveTag   = this.handleClickRemoveTag.bind(this)

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
      submitBtnDisabled: isNull,
    })
  }

  handleChangeTag(event){
    let isNull = true;
    if (event.target.value) {
      isNull = false;
    }

    this.setState({
      tagName: event.target.value,
      tagBtnDisabled: isNull,
    })
  }

  handleClickAddTag(){
    let tag;
    if (/^#+.*/.test(this.state.tagName)) {
      tag = this.state.tagName.replace(/#/g, '')
    }else{
      tag = this.state.tagName;
    }

    const tags = this.state.tags.concat(tag)
    this.setState({
      tags: tags,
      tagName: "",
    })
  }

  handleClickRemoveTag(id){
    let tags = this.state.tags;
    tags.splice(id, 1)
    this.setState({tags: tags})
  }

  createTags(){
    let tagIds = [];
    let formData = new FormData();
    this.state.tags.forEach((tag,i)=>{
      formData.append('tag[name][]', tag);
    })

    axios.post("/tags",
               formData,
               {headers: {'content-type': 'multipart/form-data',}}
              )
    .then(res=>{
      for(let i=0; i<res.data.length; i++){
        tagIds.push(res.data.collection[i].id)
      }
    },err=>{
      console.log(err)
    })
    return tagIds;
  }

  async handleSubmitGroup(){
    event.preventDefault();
    let groupFormData = new FormData();

    if (this.state.tags.length > 0) {
      let tagFormData = new FormData();
      this.state.tags.forEach((tag,i)=>{
        tagFormData.append('tag[name][]', tag);
      })

      let res = await axios.post("/tags",
                                 tagFormData,
                                 {headers: {'content-type': 'multipart/form-data',}}
                                )

      res.data.forEach((id, i)=>{
        groupFormData.append('group[tag_ids][]', id);
      })
    }

    groupFormData.append('group[title]', this.state.groupTitle);

    axios.post("/groups",
               groupFormData,
               {headers: {'content-type': 'multipart/form-data',}}
              )
    .then(res=>{
      document.location.href = `/groups/${res.data.id}`
    })
  }

  render() {

    let tags = [];

    for(let i=0; i<this.state.tags.length; i++){
      const tag = <div className="group-create-form__tag" key={i}>
                    <h1 className="group-create-form__tag-name">#{this.state.tags[i]}</h1>
                    <i onClick={this.handleClickRemoveTag.bind(this, i)} className="group-create-form__tag-remove fas fa-times"></i>
                  </div>
      tags.push(tag)
    }

    return (
      <React.Fragment>
        <div className="group-create-form">
          <div className="group-create-form__bg" onClick={this.props.closeGroupCreateModal}></div>
          <div className="group-create-form__input-area">
            <h1 className="group-create-form__title">新しいスレッドを作成</h1>
            <input onChange={this.handleChangeTitle} className="group-create-form__input-title" type="text" placeholder="タイトルを入力"/><br/>
            <div className="group-create-form__tags">{ tags }</div>
            <div className="group-create-form__tag-form">
              <input onChange={this.handleChangeTag} className="group-create-form__tag-input" value={this.state.tagName} type="text" maxlength="20" placeholder="タグ付けしましょう！"/>
              <button onClick={this.handleClickAddTag} disabled={this.state.tagBtnDisabled} className="group-create-form__tag-btn">追加</button>
            </div>
            <button onClick={this.handleSubmitGroup} disabled={this.state.submitBtnDisabled} className="group-create-form__submit">作成！</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GroupCreateForm;
