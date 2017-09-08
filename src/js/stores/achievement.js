
import { observable, action } from 'mobx';
import axios from 'axios';

class Achievement {

    /** Home page */
    @observable data = [];

    /** Cavalry page */
    @observable showConditions = false;
    @observable teams = [
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
        {name: '铁骑一组', img: '/images/team1.png', score: 99},
    ];

    @action async query() {

        var response = await axios.get('/api/cavalry/query');
        self.data = response.data.data;
    }

    @action toggleConditions() {
        self.showConditions = !self.showConditions;
    }
}

const self = new Achievement();
export default self;
