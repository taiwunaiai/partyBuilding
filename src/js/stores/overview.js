
import { observable, action } from 'mobx';
import axios from 'axios';

class Overview {

    @observable data = {};

    @action async query() {

        var response = await axios.get('/api/overview/query');
        self.data = response.data.data;
    }
}

const self = new Overview();
export default self;
