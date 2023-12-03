import React from "react";
import styles from "./index.less";
import { Button } from "antd";

export default () => (
  <div className={styles.container}>
    <div id="components-button-demo-block">
      <div>
        <Button type="primary" block>
          上传
        </Button>
      </div>
    </div>
  </div>
);
