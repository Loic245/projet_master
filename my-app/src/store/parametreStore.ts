import { action, makeObservable, observable } from 'mobx';

export interface ParametreInterface {
    tabsValue : number;
    setTabsValue : (data : number) => void;
}

class ParametreStore implements ParametreInterface {

    @observable tabsValue = 0;

    constructor() {
        makeObservable(this);
    }

    @action setTabsValue = (data : any) => {
        this.tabsValue = data;
    }

}

export default new ParametreStore();