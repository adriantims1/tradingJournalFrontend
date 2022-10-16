/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
// redux
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authorization, element }) => {
  const checkAuthorization = useCallback(() => {
    console.log(authorization.authorized);
    return authorization.authorized;
  }, [authorization.authorized]);
  return checkAuthorization() ? element : <Navigate to="/" />;
};

const mapStateToProps = ({ authorization }) => ({ authorization });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
