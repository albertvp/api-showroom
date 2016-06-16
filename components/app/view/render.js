import ReactDOM from 'react-dom';
import './style.scss';

import { Search } from '../../search/component';
import '../../search/view/style.scss';

import { Service } from '../../service/component';
import '../../service/view/style.scss';

ReactDOM.render(
  Search,
  document.getElementById('search')
);

ReactDOM.render(
  Service,
  document.getElementById('content')
);
