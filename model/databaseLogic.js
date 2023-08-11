
export default function databaseInteraction(db) {

async function getRegistrations(db, regCode) {
    let filteredRegArr = [];
    let registrations = await db.any("SELECT * FROM registrations_test");

    if (regCode == undefined || regCode == "ALL") {
        filteredRegArr = registrations;
    } else {
        filteredRegArr = registrations.filter(function (item) {
            return item.registration.includes(regCode);
        });
    }
    return filteredRegArr.reverse();
}



async function addRegistration(db, regNum) {
    await db.none("INSERT INTO registrations_test (registration) VALUES ($1)", [regNum]);
}

async function resetData(db) {
    await db.none("DELETE FROM registrations_test");
}



return {
    getRegistrations,
    addRegistration,
    resetData
}
}