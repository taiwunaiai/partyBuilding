
import { observable, action } from 'mobx';
import axios from 'axios';

class model {

    @observable  teams = [
        {name: '铁骑1组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑2组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑3组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑4组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑5组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑6组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑7组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑8组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑9组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑10组', img: '/images/team1.png', zw: "警员"},
         {name: '铁骑3组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑4组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑5组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑6组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑7组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑8组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑9组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑10组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑6组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑7组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑8组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑9组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑10组', img: '/images/team1.png', zw: "警员"},
         {name: '铁骑3组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑4组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑5组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑6组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑7组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑8组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑9组', img: '/images/team1.png', zw: "警员"},
        {name: '铁骑10组', img: '/images/team1.png', zw: "警员"},
    ];

    @observable showTabNum = 0;

    @action async query() {

        var response = await axios.get('/api/cavalry/query');
        self.data = response.data.data;
    }
}

const self = new model();
export default self;
