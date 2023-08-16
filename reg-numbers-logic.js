export default function regNumbersFactory() {
    let registrationFormat = /^[a-zA-Z]{0,3}\s*\d{3}(?:[-\s]?\d{0,3})$/;

    function regFormatCheck(input) {
        return registrationFormat.test(input);
    }

    async function getRegistrations(db, regCode) {
        if (regCode == undefined || regCode == "ALL") {
            return (await db.any("SELECT * FROM registrations")).reverse() ;
        } else {
            return (await db.any("SELECT registration FROM registrations WHERE code = $1", regCode)).reverse() ;
        }
    }

    async function getTowns(db) {
        let townsData = await db.any("SELECT * FROM towns");
        return townsData.reverse();
    }

    async function checkDuplicates(db, regNum) {
        let regNums = await getRegistrations(db);
        return regNums.some((obj) => obj.registration == regNum);
    }

    async function addRegistration(db, regNum, req) {
        await db.none("INSERT INTO registrations (code, registration) VALUES ($1, $2)", [regNum.substring(0, 2), regNum]);
        await db.none("UPDATE towns SET counter = towns.counter + 1 WHERE code = $1", [regNum.substring(0, 2)]);
    }

    async function resetData(db) {
        await db.none("DELETE FROM registrations");
        await db.none("UPDATE towns SET counter = 0");
    }

    return {
        addRegistration,
        getRegistrations,
        regFormatCheck,
        resetData,
        getTowns,
        checkDuplicates,
    };
}
