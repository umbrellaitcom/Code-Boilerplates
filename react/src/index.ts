import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { Root } from '~/components/Root';

ReactDOM.render(createElement(Root), document.getElementById('app'));

if (process.env.REACT_APP_HOT_LOADER_ENABLED === 'true' && module.hot) {
  module.hot.accept();
}
