/* eslint-disable react/prop-types */
import React from 'react';
// redux
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authorization, element }) => (authorization.authorized ? element : <Navigate to="/" />);

const mapStateToProps = ({ authorization }) => ({ authorization });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
