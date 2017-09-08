
import { observable, action } from 'mobx';
import axios from 'axios';

class Chat {

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

    @action toggleConditions(judege,e) {
        self.showConditions =judege ;
    }
}

const self = new Chat();
export default self;
