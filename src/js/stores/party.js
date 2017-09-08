
import { observable, action } from 'mobx';
import axios from 'axios';

class study {

    @observable data={
            img:[
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
            '/images/M-M11.png',
       
            ],
            info:'  今天我们以集体谈话方式，今天我们以集体谈话方式，今天我们以集体谈话方式，今天我们以集体谈话方式',
        };

    @observable showTabNum = 0;

    @action async query() {

        var response = await axios.get('/api/cavalry/query');
        self.data = response.data.data;
    }

    @action toggleTabNum(judege,e) {
        self.showTabNum =judege ;
    }
}

const self = new study();
export default self;
