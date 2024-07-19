import React from 'react';

const SummaryFooter = ({ projectCount, taskCount, version }) => (
  <footer>
    <span>Total Projects: {projectCount}</span>
    &nbsp;|&nbsp;
    <span>Total Tasks: {taskCount}</span>
    &nbsp;|&nbsp;
    <span>Version {version}</span>
  </footer>
);

export default SummaryFooter;