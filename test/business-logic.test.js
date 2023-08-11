import assert from "assert";


import databaseInteraction from "../model/databaseLogic.js";

import db from "../model/db.js";

const databaseInstance = databaseInteraction(db);

describe("The basic database web app", function () {
    this.timeout(6000);

    beforeEach(async function () {
        await db.none("TRUNCATE TABLE registrations_test RESTART IDENTITY CASCADE;");
    });

    it("should able to add registration number ", async function () {
        await databaseInstance.addRegistration(db, "CA258") ;

        let regNums = await databaseInstance.getRegistrations(db,"ALL") ;

        assert.equal(1, regNums.length);
    });

    it("should able to add multiple registration numbers ", async function () {
        await databaseInstance.addRegistration(db, "CA258") ;
        await databaseInstance.addRegistration(db, "CL7845") ;
        await databaseInstance.addRegistration(db, "CK4158") ;

        let regNums = await databaseInstance.getRegistrations(db,"ALL") ;

        assert.equal(3, regNums.length);
    });

    it("should filter registrations according to locations (Cape Town)", async function () {
        await databaseInstance.addRegistration(db, "CA258") ;
        await databaseInstance.addRegistration(db, "CL7845") ;
        await databaseInstance.addRegistration(db, "CK4158") ;

        let regNums = await databaseInstance.getRegistrations(db,"CA") ;

        assert.equal(1, regNums.length);
    });

    it("should be able to reset data", async function () {
        await databaseInstance.addRegistration(db, "CA258") ;
        await databaseInstance.addRegistration(db, "CL7845") ;
        await databaseInstance.addRegistration(db, "CK4158") ;

        await databaseInstance.resetData(db)
        let regNums = await databaseInstance.getRegistrations(db,"CA") ;

        assert.equal(0, regNums.length);
    });

})