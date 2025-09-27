import React from 'react';
import Styles from './loader.module.css'; // Create this CSS file

const Loader = () => {
  return (
    <div className={Styles.loader_container}>
      <div className={Styles.loader}></div>
    </div>
  );
};

export default Loader;