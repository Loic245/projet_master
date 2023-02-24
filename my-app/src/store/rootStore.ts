import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import config from '../config';
import { SnackBarSeverity } from '../common/utils/function';

export interface rootStoreInterface {
    snackBarState : ISnackBarState,
    duration: number;
    setSnackBar: (open: boolean, severity: SnackBarSeverity, message: string) => void;
}

interface ISnackBarState {
    open: boolean,
    severity: SnackBarSeverity,
    message: string,
    duration?: number
}

const defaultSnackBarState: ISnackBarState = {
    open: false,
    severity: 'error',
    message: '',
    duration: 2000
}

class rootStore implements rootStoreInterface {

    @observable duration = 4000;

    @observable snackBarState = defaultSnackBarState;

    constructor() {
        makeObservable(this);
    }

    @action setSnackBar = (open: boolean, severity: SnackBarSeverity, message: string) => {
        this.snackBarState = {
            open: open,
            severity: severity,
            message: message
        } 
    }

}

export default new rootStore()