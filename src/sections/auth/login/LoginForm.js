/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { useState } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { connect } from 'react-redux';
import { fetchProfile } from '../../../redux/action/profile';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// redux

// ----------------------------------------------------------------------

function LoginForm({ fetchProfile, profile }) {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = ({ email, password }) => {
    // navigate('/dashboard', { replace: true });
    fetchProfile(email, password);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}
      {profile.hasError ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {profile.errorMessage}
        </Alert>
      ) : null}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={profile.isFetching}
        sx={{ my: 2 }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = { fetchProfile };
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
