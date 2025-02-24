import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/'
import * as api from '../../api/'


function* getPersonalPosts(action){
    try {
        console.log('getPersonalPosts', action)
        const res = yield call(api.getPersonalPosts, action.payload);
        console.log("getPersonalPosts data", res.data)
        yield put(actions.getPersonalPosts.getPersonalPostsSuccess(res.data))
    } catch (error) {
        console.log('error getPersonalPosts', error)
        yield put(actions.getPersonalPosts.getPersonalPostsFailure(error))
    }
}

function* personal(){
    yield takeLatest(actions.getPersonalPosts.getPersonalPostsRequest, getPersonalPosts);
}

export default personal