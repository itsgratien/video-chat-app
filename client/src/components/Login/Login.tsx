import React from 'react';
import './Login.scss';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useMutation, gql } from '@apollo/client';
import { AppEnum } from '../../utils';
import { isLoggedInVar } from '../../cache';
import { Button, ButtonBackground } from '../Reusable';

const LoginSchema = object().shape({
  email: string().required('email is required').email('email must be valid'),
});

interface LoginVariable {
  email: string;
}

interface User {
  _id: string;
  email: string;
}

interface LoginType {
  login: {
    token: string;
    data: User;
  } | null;
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      token
      data {
        _id
        email
      }
    }
  }
`;

const Login = () => {
  const [login, { loading }] = useMutation<LoginType, LoginVariable>(
    LOGIN_MUTATION,
    {
      onCompleted: (res) => {
        if (res.login) {
          localStorage.setItem(AppEnum.Token, res.login.token);

          isLoggedInVar(true);
        }
      },
    }
  );

  const formik = useFormik({
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: (value) => login({ variables: value }),
    initialValues: { email: '' },
  });

  const { values, errors } = formik;

  return (
    <div className='login relative w-full h-screen flex items-center justify-center'>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className='formGroup'>
          <input
            type='text'
            placeholder='Your email'
            value={values.email}
            className='outline-none focus:outline-none text-sm'
            onChange={formik.handleChange}
            name='email'
          />
          {errors && errors.email && (
            <small className='ml-2 font-bold'>{errors.email}</small>
          )}
        </div>
        <div className='formGroup'>
          <Button
            type='submit'
            name='Login'
            backgroundColor={ButtonBackground.Black}
            bold
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
