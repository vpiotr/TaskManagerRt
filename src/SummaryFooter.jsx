import React from 'react';
import PropTypes from 'prop-types';

const SummaryFooter = ({ projectCount, taskCount, version }) => (
  <footer>
    <span>Total Projects: {projectCount}</span>
    &nbsp;|&nbsp;
    <span>Total Tasks: {taskCount}</span>
    &nbsp;|&nbsp;
    <span>Version {version}</span>
  </footer>
);

SummaryFooter.propTypes = {
  projectCount: PropTypes.number,
  taskCount: PropTypes.number,
  version: PropTypes.string
};

export default SummaryFooter;