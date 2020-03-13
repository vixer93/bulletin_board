import React, { Component, PropTypes } from 'react';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  render() {
    let headerList;

    if (this.state.isLoggedIn) {
      headerList = <ul className="header__menu">
                    <li className="header__list"><a href="/users/edit" className="header__link">設定</a></li>
                    <li className="header__list"><a href="/users/sign_out" data-method="delete" className="header__link">ログアウト</a></li>
                  </ul>
    }else{
      headerList = <ul className="header__menu">
                    <li className="header__list"><a href="/users/sign_up" className="header__link">新規登録</a></li>
                    <li className="header__list"><a href="/users/sign_in" className="header__link">ログイン</a></li>
                  </ul>
    }

    return (
      <header>
        <nav>
          <div className="header">
            <h1 className="header__title">BulletinBoard</h1>
            { headerList }
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
