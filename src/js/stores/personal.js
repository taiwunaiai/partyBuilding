
import { observable, action } from 'mobx';
import axios from 'axios';

class Personal {

    /** Home page */
    @observable data = [];

    /** Cavalry page */
    @observable showConditions = false;
    @observable police = {name: '张晓峰', old:'2', birthDay:'1989.09.09',partyDuty:'福田党支部书记',ss:'福田大队党支部',zw:'二级警员',gw:'铁骑岗',img: '/images/team1.png', score: 99};

    @action async query() {

        var response = await axios.get('/api/cavalry/query');
        self.data = self.police;
    }

    @action toggleConditions() {
        self.showConditions = !self.showConditions;
    }
}

const self = new Personal();
export default self;
