import React, { Component, createRef } from 'react';
import { hasLowerCase, hasUpperCase } from './util';

class App extends Component {

  id = 1;

  usernameInput = createRef();

  state = {
    username: '',
    usernameFlash: '',
    password: '',
    passwordFlash: '',
    disabled: true,
    list: []
  };


  handleChange = e => {

    const { value, name } = e.target;

    this.setState({
      [name]: value
    }, this.handleSubmitAvailable)

  };


  handleSubmitAvailable = () => {

    const { username, password } = this.state;

    const emailHasAt = username.includes('@');
    const passwordHasLength = password.length > 7;
    const passwordHasUpperCase = hasLowerCase(password);
    const passwordHasLowerCase = hasUpperCase(password);


    // 이메일 체크
    username.length 
      ?emailHasAt  
        ?this.setState({ usernameFlash: '' }) 
        :this.setState({ usernameFlash: '@가 반드시 필요합니다.' }) 
      :this.setState({ usernameFlash: '' });


    // 비밀번호 체크
    if (password.length) {
      if (passwordHasLength) {
        this.setState({ passwordFlash: '' });
        if (passwordHasUpperCase && passwordHasLowerCase) {
          this.setState({ passwordFlash: '' });
        } else {
          this.setState({ passwordFlash: '대소문자가 하나씩 필요합니다.' });
        }
      } else {
        this.setState({ passwordFlash: '8자 이상 필요합니다.' });
      }
    } else {
      this.setState({ passwordFlash: '' });
    };


  // 버튼 활성화
  emailHasAt && passwordHasLength && passwordHasUpperCase && passwordHasLowerCase 
    ?this.setState({ disabled: false })
    :this.setState({ disabled: true })

  };





  handleInsert = (e) => {
    e.preventDefault();
    const { list, username, password } = this.state

    this.setState({
      list: list.concat({
        username,
        password,
      }),
      username: '',
      password: ''
    })

    this.id++
    this.usernameInput.current.focus();
    
  };

  handleDelete = (id) => {
    this.setState({
      list: this.state.list.filter((user) => user.id !== id)
    })
  };


  render() {
    return (
      <div>

        <form>
          <input type="email" value={this.state.username} name="username" onChange={this.handleChange} ref={this.usernameInput}></input><span>{this.state.usernameFlash}</span>
          <br />
          <input type="password" value={this.state.password} name="password" onChange={this.handleChange} ></input><span>{this.state.passwordFlash}</span>
          <br />
          <button onClick={this.handleInsert} disabled={this.state.disabled}>추가하기</button>
         
        </form>
        <ul>
            {
              this.state.list.map((i, index) => {
                return (
                  <li key={i.id}>{i.username}의 비밀번호는 {i.password} 입니다
                    <br />
                    <button onClick={this.handleDelete}>삭제하기</button>
                  </li>
                )
              })
            }
          </ul>
      </div>
    );
  }
}

export default App;

