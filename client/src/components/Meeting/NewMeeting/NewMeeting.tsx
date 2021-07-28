import React from 'react';
import './NewMeeting.scss';
import { useHistory } from 'react-router-dom';
import { PaperPlane, ChevronBack } from 'react-ionicons';
import { string, object } from 'yup';
import { useFormik } from 'formik';
import { AuthLayout as Layout, Button, ButtonBackground } from '../../Reusable';

const NewMeetingSchema = object().shape({
  name: string().required('meeting title is required'),
});

export const NewMeeting = () => {
  const history = useHistory();

  const handleGoBack = () => history.goBack();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { name: '' },
    validationSchema: NewMeetingSchema,
    onSubmit: (value) => {},
  });

  const { values, errors } = formik;

  return (
    <Layout>
      <div className='newMeeting mx-auto'>
        <div className='flex items-center' style={{ marginBottom: '10px' }}>
          <button
            type='button'
            className='outline-none focus:outline-none back flex items-center justify-center'
            onClick={handleGoBack}
          >
            <ChevronBack />
          </button>
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
              <small className='text-secondaryColor font-bold'>{errors.name}</small>
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
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default NewMeeting;
