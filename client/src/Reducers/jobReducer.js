
import {

    ADD_JOB,
    ADD_JOB_SUCCESS,
    ADD_JOB_FAIL,
    GET_ALL_JOBS,
    GET_ALL_JOBS_SUCCESS,
    GET_ALL_JOBS_ERROR,
    GET_ONE_JOB,
    GET_ONE_JOB_SUCCESS,
    GET_ONE_JOB_ERROR,
    DELETE_JOB_FAIL,
    DELETE_JOB_SUCCESS,
    DELETE_JOB,
    UPDATE_JOB,
    UPDATE_JOB_SUCCESS,
    UPDATE_JOB_ERROR

} from '../Actions/index';

const initialState = {
    job: [],
    jobs: [],
    loading: true,
    addJob: false,
    addJobFail: false,
    addJobSuccess: false,
    getAllJobs: false,
    getAllJobsSuccess: false,
    getAllJobsError: false,
    getOneJob: false,
    getOneJobSuccess: false,
    getOneJobError: false,
    updateJob: false,
    updateJobSuccess: false,
    updateJobError: false,
    error: null
}

export default function reducer(state = initialState, action) {

    switch ( action.type ) {

        case ADD_JOB:
            return {
                ...state,
                addJob: true,
                loading: true,
                addJobFail: false,
                addJobSuccess: false,
                error: null
            }

        case ADD_JOB_FAIL:
            return {
                ...state,
                addJob: false,
                addJobFail: true,
                loading: false,
                addJobSuccess: false,
                error: action.payload
            }

        case ADD_JOB_SUCCESS:
            return {

                ...state,
                addJob: false,
                addJobFail: false,
                loading: false,
                addJobSuccess: true,
                error: null

            }

        case GET_ALL_JOBS:
            return {
                ...state,
                jobs: [],
                loading: true,
                getAllJobs: true,
                error: null
            }

        case GET_ALL_JOBS_SUCCESS:

            return {
                ...state,
                loading: false,
                getAllJobsSuccess: true,
                getAllJobsError: false,
                getAllJobs: false,
                jobs: action.payload,
                error: null

            }

        case GET_ALL_JOBS_ERROR:

            return {
                ...state,
                loading: false,
                getAllJobsError: true,
                getAllJobs: false,
                getAllJobsSuccess: false,
                jobs: [],
                error: action.payload
            }

        case GET_ONE_JOB:
            return {
                ...state,
                loading: true,
                getOneJob: true,
                error: null
            }

        case GET_ONE_JOB_SUCCESS:
            return {
                ...state,
                job: action.payload,
                loading: false,
                getOneJob: false,
                getOneJobError: false,
                getOneJobSuccess: true,
                error: null
            }

        case GET_ONE_JOB_ERROR:
            return {
                ...state,
                loading: false,
                getOneJob: false,
                getAllJobsError: true,
                getAllJobsSuccess: false,
                error: action.payload
            }

        case DELETE_JOB:
            return {
                ...state,
                loading: true,
                deleteJobSuccess: false,
                deleteJobFail: false,
                error: action.payload
            }

        case DELETE_JOB_FAIL:
            return {
                ...state,
                loading: false,
                deleteJobSuccess: false,
                deleteJobFail: true,
                error: action.payload
            }

        case DELETE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteJobFail: false,
                deleteJobSuccess: true
            }

        case UPDATE_JOB:
            return {
                ...state,
                loading: true,
                updateJob: true,
                updateJobSuccess: false,
                updateJobError: false,
                error: null
            }

        case UPDATE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                updateJob: false,
                updateJobError: true,
                updateJobSuccess: false,
                error: false
            }

        case UPDATE_JOB_ERROR:
            return {
                ...state,
                updateJob: false,
                updateJobError: true,
                updateJobSuccess: false,
                error: action.payload

        }

        // ! Return inital state as a default or the client recieves undefined !
        default:

            return state

    };

};