import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import Button from '@material-ui/core/Button';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Grid,
} from '@material-ui/core/';
import RecipeCard from './RecipeCard';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const VerifyOtp = (props) => {
  const classes = useStyles();
  const [otp, setOtp] = useState('');

  const handleOtp = (e) => {
    setOtp(e.target.value);
  }

  const validateOtp = () => {
    if (otp.toString() === '123456') {
      props.history.push('/');
    }
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField onChange={(e) => handleOtp(e)} id="filled-basic" label="Verify Otp" variant="filled" />
      </form>
      <Button onClick={() => validateOtp()} style={{ marginTop: '10%' }} type="submit" variant="contained" color="primary">
        Continue
      </Button>
    </div>
  )
}

const Payment = (props) => {
  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps
  } = usePaymentInputs();
  const [otpScreen, setOtpScreen] = useState(false);

  const url = new URL(window.location.href);
  const title = url.searchParams.get("title");
  const description = url.searchParams.get("description");
  const img = url.searchParams.get("img");
  const price = url.searchParams.get("price");
  const label = url.searchParams.get("label");

  useEffect(() => {
    if (!title || !description || !img || !price) {
      props.history.replace('/');
    }
  })

  const setCardData = (data) => {
    if (data.cardNumber && data.expiryDate && data.cvc) {
      setOtpScreen(true);
    }
  }

  return (
    <Formik
      initialValues={{
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      }}
      onSubmit={data => setCardData(data)}
      validate={() => {
        let errors = {};
        if (meta.erroredInputs.cardNumber) {
          errors.cardNumber = meta.erroredInputs.cardNumber;
        }
        if (meta.erroredInputs.expiryDate) {
          errors.expiryDate = meta.erroredInputs.expiryDate;
        }
        if (meta.erroredInputs.cvc) {
          errors.cvc = meta.erroredInputs.cvc;
        }
        return errors;
      }}
    >
      {({ handleSubmit }) => (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Recipes</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" rel="noopener noreferrer" href="https://github.com/Praful-cs" target="_blank" >Github</a>
                </li>
              </ul>
            </div>
          </nav>
          <div style={{ padding: '5%' }}>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center"
              style={{ minHeight: '50vh' }}
            >
              <Grid style={{ padding: '20px' }} item xs={12} sm={6} md={3}>
                <RecipeCard
                  title={title}
                  description={description}
                  img={img}
                  price={price}
                  label={label}
                />
              </Grid>
              {
                !otpScreen ?
                <form onSubmit={handleSubmit}>
                  <div>
                    <PaymentInputsWrapper {...wrapperProps}>
                      <svg {...getCardImageProps({ images })} />
                      <Field name="cardNumber">
                        {({ field }) => (
                          <input {...getCardNumberProps({ onBlur: field.onBlur, onChange: field.onChange })} />
                        )}
                      </Field>
                      <Field name="expiryDate">
                        {({ field }) => (
                          <input {...getExpiryDateProps({ onBlur: field.onBlur, onChange: field.onChange })} />
                        )}
                      </Field>
                      <Field name="cvc">
                        {({ field }) => <input {...getCVCProps({ onBlur: field.onBlur, onChange: field.onChange })} />}
                      </Field>
                    </PaymentInputsWrapper>
                  </div>
                  <Button style={{ marginTop: '10%' }} type="submit" variant="contained" color="primary">
                    Continue
                  </Button>
                </form> :
                <VerifyOtp {...props} />
              } 
            </Grid>
          </div>
          <footer className="page-footer bottom font-small bg-dark fixed-bottom">
            <div className="footer-copyright text-center py-3">© 2020 Copyright : 
              <a rel="noopener noreferrer" href="/"> Praful Nikam</a>
            </div>
          </footer>
        </div>
      )}
    </Formik>
  );
}

export default Payment;