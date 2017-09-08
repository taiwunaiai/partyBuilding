
import { observable, action } from 'mobx';
import axios from 'axios';

class study {

    @observable data=[
            {name: '课程1', percent: 400, '排班数': 400},
            {name: '课程2', percent: 300, '排班数': 398},
            {name: '课程3', percent: 20, '排班数': 38},
            {name: '课程4', percent: 280, '排班数': 308},
            {name: '课程5', percent: 18, '排班数': 40},
            {name: '课程6', percent: 290, '排班数': 300},
            {name: '课程7', percent: 30, '排班数': 30},
            {name: '课程8', percent: 30, '排班数': 30},
            {name: '课程9', percent: 30, '排班数': 30},
            {name: '课程10', percent: 30, '排班数': 30},
            {name: '课程11', percent: 30, '排班数': 30},
            {name: '课程12', percent: 30, '排班数': 30},

        ]

    @observable showTabNum = 0;

    @action async query() {

        var response = await axios.get('/api/cavalry/query');
        self.data = response.data.data;
    }

    @action toggleTabNum(judege,e) {
        self.showTabNum =judege ;
        this.state.activeIndex=0;
    }
}

const self = new study();
export default self;
