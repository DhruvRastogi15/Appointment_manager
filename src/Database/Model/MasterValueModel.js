var MasterValueModel;
export default MasterValueModel = {
    name: 'MasterValueModel',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', indexed: true },
        name: { type: 'string', optional: true },
        latitude: { type: 'string', optional: true },
        longitude: { type: 'string', optional: true },
        parent_id: { type: 'string', optional: true },
        working_days: { type: 'string', optional: true },
        address: { type: 'string', optional: true },
        type: { type: 'string', optional: true },
        weekedDays: { type: 'string', optional: true },
    }
}