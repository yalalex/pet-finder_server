import React from 'react';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div
        key={alert.id}
        className='card center grey white-text'
        style={{ margin: '1rem', padding: '1rem' }}
      >
        <h6>
          <i className='tiny material-icons'>error</i> {alert.msg}
        </h6>
      </div>
    ))
  );
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps, null)(Alerts);
