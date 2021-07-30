import React from 'react';
import './NewMeeting.scss';
import { useHistory, Redirect } from 'react-router-dom';
import { PaperPlane } from 'react-ionicons';
import { string, object } from 'yup';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import {
  AuthLayout as Layout,
  Button,
  ButtonBackground,
  BackButton,
} from '../../Reusable';
import { MEETING, GetMeetingsType } from '../generated';

const NewMeetingSchema = object().shape({
  name: string().required('meeting title is required'),
});

const ADD_MEETING = gql`
  mutation AddMeeting($name: String!) {
    addMeeting(name: $name) {
      message
      data {
        ...MeetingItem
      }
    }
  }
  ${MEETING}
`;

interface AddMeetingResponse {
  addMeeting: {
    data: GetMeetingsType;
    message: string;
  };
}

interface AddMeetingVariables {
  name: string;
}

export const NewMeeting = () => {
  const history = useHistory();

  const handleGoBack = () => history.goBack();

  const [addMeeting, { loading, error, data }] = useMutation<
    AddMeetingResponse,
    AddMeetingVariables
  >(ADD_MEETING);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { name: '' },
    validationSchema: NewMeetingSchema,
    onSubmit: (value) => addMeeting({ variables: value }),
  });

  const { values, errors } = formik;

  if (data && data.addMeeting && !error && !loading) {
    return <Redirect to={`/meeting/${data.addMeeting.data._id}`} />;
  }

  return (
    <Layout>
      <div className='newMeeting mx-auto'>
        <div className='flex items-center' style={{ marginBottom: '10px' }}>
          <BackButton handleGoBack={handleGoBack} />
          <h1 className='font-bold ml-2'>Schedule new meeting</h1>
        </div>
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
          <div className='formGroup'>
            <input
              type='text'
              name='name'
              onChange={formik.handleChange}
              placeholder='title'
              className='w-full outline-none focus:outline-none bg-primaryColor border border-secondaryColor'
              value={values.name}
            />
            {errors && errors.name && (
              <small className='text-secondaryColor font-bold'>
                {errors.name}
              </small>
            )}
          </div>
          <div className='formGroup' style={{ width: '253px' }}>
            <Button
              name='save'
              backgroundColor={ButtonBackground.White}
              showBlackBorder
              type='submit'
              icon={<PaperPlane />}
              borderRadius='5px'
              bold
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default NewMeeting;
