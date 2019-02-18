import React, { Component } from 'react'
import {connect} from 'react-redux'
import ErrorDesc from './ErrorDesc'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError || this.props.error.isError) {

      const errorDesc = this.props.error.error !== ''? `Error Description - ${this.props.error.error}`: '';

      return (
        <ErrorDesc error={errorDesc}/>
      )
    }

    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    error: state.error
  }
}

export default connect(mapStateToProps)(ErrorBoundary)
