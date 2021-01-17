import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-less/semantic.less'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducer'
import { Provider } from 'react-redux'
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer, applyMiddleware(thunk))



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
