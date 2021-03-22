var UserModel;
export default UserModel = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', indexed: true },
        name: { type: 'string', optional: true },
        sessionToken: { type: 'string', optional: true },
        company: { type: 'string', optional: true },
        lastCheckInTime: { type: 'string', optional: true },
        isCheckingCompleted: { type: 'string', optional: true },
        isOnLeave: { type: 'string', optional: true }
    }
}