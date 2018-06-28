import axios from 'axios';

// 请求拦截器，添加访问token
axios.interceptors.request.use(config => {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截器，返回401为登录失败
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

let base = 'http://127.0.0.1:8000/api';

export const getAblitys = page => axios.get(`${base}/ablitys/?page=${page}`).then(res => res.data);
export const getAblityDetail = id => axios.get(`${base}/ablitys/${id}/`).then(res => res.data);
export const updateAblity = (id, params) => axios.patch(`${base}/ablitys/${id}/`, params).then(res => res.data);
export const searchAblity = params => axios.post(`${base}/ablitys/search/`, params).then(res => res.data);
export const addAblity = params => axios.post(`${base}/ablitys/`, params).then(res => res.data);

export const getAblityLevelOne = params => axios.get(`${base}/ablitys/levelone/`).then(res => res.data);
export const AddLevelOne = params => axios.post(`${base}/ablitys/levelone/`, params).then(res => res.data);
export const getAblityLevelTwo = params => axios.get(`${base}/ablitys/leveltwo/`).then(res => res.data);
export const AddLevelTwo = params => axios.post(`${base}/ablitys/leveltwo/`, params).then(res => res.data);

/**
 * 面试问题管理
 */
export const getQuestions = page => axios.get(`${base}/questions/?page=${page}`).then(res => res.data);
export const getQuestionDetail = id => axios.get(`${base}/questions/${id}/`).then(res => res.data);
export const delQuestion = id => axios.delete(`${base}/questions/${id}/`).then(res => res.data);
export const updateQuestion = (id, params) => axios.patch(`${base}/questions/${id}/`, params).then(res => res.data);
export const searchQeustion = params => axios.post(`${base}/questions/search/`, params).then(res => res.data);

/**
 * 岗位管理
 */
export const getJobs = page => axios.get(`${base}/jobs/?page=${page}`).then(res => res.data);
export const getJobDetail = id => axios.get(`${base}/jobs/${id}/`).then(res => res.data);

export const getJobLevelOne = params => axios.get(`${base}/jobs/levelone/`).then(res => res.data);
export const getJobLevelTwo = params => axios.get(`${base}/jobs/leveltwo/`).then(res => res.data);