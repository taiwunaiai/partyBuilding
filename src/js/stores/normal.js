
import { observable, action } from 'mobx';
import axios from 'axios';

class Normal {

    @observable data = [];

    @action async query() {

        var response = await axios.get('/api/normal/chart');
        self.data = response.data.data;
    }
}

const self = new Normal();
export default self;
