import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { complainReducer } from './complainRelated/complainSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer
    }
})

export default store;