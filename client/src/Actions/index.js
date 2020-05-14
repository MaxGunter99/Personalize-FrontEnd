import axios from 'axios';

// ADD A JOB
export const ADD_JOB = 'ADD_JOB';
export const ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS';
export const ADD_JOB_FAIL = 'ADD_JOB_FAIL';

export const AddJob = job => dispatch => {

    dispatch({ type: ADD_JOB });
    console.log( job )

    axios
        .post( 'http://localhost:3000/jobs/' , job )
        .then( response => {
            console.log( 'response' , response )
            dispatch({ type: ADD_JOB_SUCCESS, payload: response.data });
        })
        .catch( error => {
            console.log( 'error' , error )
            dispatch({ type: ADD_JOB_FAIL, payload: error });
        })
  
}

// GET ALL JOBS
export const GET_ALL_JOBS = 'GET_ALL_JOBS';
export const GET_ALL_JOBS_SUCCESS = 'GET_ALL_JOBS_SUCCESS';
export const GET_ALL_JOBS_ERROR = 'GET_ALL_JOBS_ERROR';

export const GetAllJobs = () => dispatch => {

    dispatch({ type: GET_ALL_JOBS });
    axios
        .get( 'http://localhost:3000/jobs' )
        .then( res => {
            dispatch({ type: GET_ALL_JOBS_SUCCESS ,  payload: res.data });
        })
        .catch( error => {
            // console.log( 'Get All Jobs Error' )
            dispatch({ type: GET_ALL_JOBS_ERROR , payload: error });
        })
  
}

// GET ONE JOB
export const GET_ONE_JOB = 'GET_ONE_JOB';
export const GET_ONE_JOB_SUCCESS = 'GET_ONE_JOB_SUCCESS';
export const GET_ONE_JOB_ERROR = 'GET_ONE_JOB_ERROR';

export const GetOneJob = ( id ) => dispatch => {

    dispatch({ type: GET_ONE_JOB });
    axios
        .get( `http://localhost:3000/jobs/${id}` )
        .then( res => {
            console.log( 'Get One Job Success!')
            dispatch({ type: GET_ONE_JOB_SUCCESS ,  payload: res.data });
        })
        .catch( error => {
            // console.log( 'Get All Jobs Error' )
            dispatch({ type: GET_ONE_JOB_ERROR , payload: error });
        })
  
}

// UPDATE JOB
export const UPDATE_JOB = 'UPDATE_JOB';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_ERROR = 'UPDATE_JOB_ERROR';

export const UpdateJob = ( id , newInfo ) => dispatch => {

    dispatch({ type: UPDATE_JOB });
    console.log( newInfo )
    axios
        .put( `http://localhost:3000/jobs/${id}` , newInfo )
        .then( res => {
            console.log( res )
            dispatch({ type: UPDATE_JOB_SUCCESS , payload: res.data })
        })
        .catch( error => {
            dispatch({ type: UPDATE_JOB_ERROR , payload: error })
        })

} 


//  DELETE JOB
export const DELETE_JOB = 'DELETE_JOB';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_FAIL = 'DELETE_JOB_FAIL';

export const DeleteJob = id => dispatch => {

    dispatch({ type: DELETE_JOB });
    axios
        .delete( `http://localhost:3000/jobs/${id}` )
        .then( res => {
            window.location.href = 'http://localhost:3001/Jobs';
            dispatch({ type: DELETE_JOB_SUCCESS, payload: res });
        })
        .catch( error => {
            // console.log( 'Delete Job Fail' )
            dispatch({ type: DELETE_JOB_FAIL, payload: error });
        })
  
}