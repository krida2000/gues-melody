import * as React from "react";
import {PureComponent} from "react";
import {authorizationData} from "../../types";
import {Redirect} from "react-router-dom";

type props = {
  onAuthorization: (authData: authorizationData) => void,
  isAuthorizationRequired: boolean,
};

class AuthorizationScreen extends PureComponent<props, {}> {
  render() {
    const {onAuthorization, isAuthorizationRequired} = this.props;

    if(!isAuthorizationRequired){
      return <Redirect to={`/`} />
    }

    let login = React.createRef<HTMLInputElement>();
    let pass = React.createRef<HTMLInputElement>();

    return (
      <form className="login__form" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name" ref={login}/>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password" ref={pass}/>
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit" onClick={(evt) => {
          evt.preventDefault();
          const log = login.current.value;
          const password = pass.current.value;
          onAuthorization({login: log, password});
        }}>Войти
        </button>
      </form>
    );
  }
}

export default AuthorizationScreen;
