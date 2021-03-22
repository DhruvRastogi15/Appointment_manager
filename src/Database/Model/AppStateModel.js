var AppStateModel
export default AppStateModel = {
    name: 'AppValue',
    primaryKey: 'appKey',
    properties: {
        appKey: { type: 'string', indexed: true },
        auth_token: { type: 'string', optional: true },
        loginStatus: { type: 'string', optional: true },
    }
}