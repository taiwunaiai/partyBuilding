
import { observable, action } from 'mobx';
import axios from 'axios';

class Remediation {

    @observable data = {};

    @action async query() {

        var response = await axios.get('/api/remediation/query');
        self.data = response.data.data;
    }
}

const self = new Remediation();
export default self;
