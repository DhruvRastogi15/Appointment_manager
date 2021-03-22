import Realm from 'realm';

import AppStateModel from './Model/AppStateModel';
import MasterValueModel from './Model/MasterValueModel';
import UserModel from './Model/UserModel';
let repository = new Realm({
    schema: [
        AppStateModel,
        MasterValueModel,
        UserModel
    ]
});

class RealmController {

    static insertUpdateAppStateKey(dataToWrite) {
        repository.write(() => {
            repository.create(AppStateModel.name, dataToWrite, true);
        });
    }

    //Below function helps to add Master data into local database
    static insertUpdateUserRecord(dataToWrite) {
        repository.write(() => {
            repository.create(UserModel.name, dataToWrite, true);
        });
    }

    static insertUpdateMasterRecord(dataToWrite) {
        repository.write(() => {
            repository.create(MasterValueModel.name, dataToWrite, true);
        });
    }


    static getAppStateKey() {
        return repository.objects(AppStateModel.name).filtered(`appKey="AttendanceMhril"`).slice();
    }

    static getMasterValues(typeName) {
        return repository.objects(MasterValueModel.name).filtered(`type="${typeName}"`).slice();
    }
    static getUserData() {
        return repository.objects(UserModel.name).slice();
    }
    static getIdByTypeName(type, name) {
        let query = repository.objects(MasterValueModel.name).filtered(`type="${type}" AND name="${name}"`);
        let resultArray = Array.from(query);
        if (resultArray.length > 0) {
            return resultArray[0].id;
        }
        return '';
    }
    static getNameByTypeId(type, id) {
        let query = repository.objects(MasterValueModel.name).filtered(`type="${type}" AND id="${id}"`);
        let resultArray = Array.from(query);
        if (resultArray.length > 0) {
            return resultArray[0].name;
        }
        return '';
    }
    static getAttendanceIdByName(name) {
        let query = repository.objects(MasterValueModel.name).filtered(`type="attendance" AND name="${name}"`);
        let resultArray = Array.from(query);
        if (resultArray.length > 0) {
            return resultArray[0].id;
        }
        return '';
    }

    //Deleting users data from local db
    static deleteUserData() {
        repository.write(() => {
            let User = repository.objects(UserModel.name);
            repository.delete(User);

        });
    }

    static deleteAppState() {
        repository.write(() => {
            let AppState = repository.objects(AppStateModel.name);
            repository.delete(AppState);
        });
    }

    static deleteCallActionData(id) {

        repository.write(() => {
            let leadObject = repository.objects(CallPendingModel.name).filtered(`leadId="${id}"`);
            repository.delete(leadObject);
        });
    }

}

export default RealmController;