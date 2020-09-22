import React, { useState } from "react";

import axios from "axios";
import config from "../config";
interface SignUpForm {
  name: string;
  email: string;
  password: string;
  password2: string;
}

interface IErrors {
  message: string;
}

interface Props {
  history: {
      push(url: string): void;
  };
}

export default function Signup(props:Props): JSX.Element {
  const [error, setErrors] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let target = e.currentTarget as any;
    var values: SignUpForm = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
      password2: target.password2.value,
    };
    console.log(values);
    const { name, email, password, password2 } = values;
    axios
      .post(`${config.API_URL}/users/signup`, {
        name,
        email,
        password,
        password2,
      })
      .then((result) => {
        console.log(result);
        props.history.push('/home')
      })
      .catch((err) => {
        setErrors(err.response.data.error);
        console.log(err.response.data.error);
      });
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div>
          <input type="submit" value="Signup" />
          <a href="/login">Already have an account?</a>
        </div>
      </form>
    {error ? <p>{error}</p>: null}
      
    </div>
  );
}
