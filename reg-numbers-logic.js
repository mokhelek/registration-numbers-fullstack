export default function regNumbersFactory() {
    let registrationNumbers = [];
    let registrationFormat = /^[a-zA-Z]{0,3}\s*\d{3}(?:[-\s]?\d{0,3})$/;

    function filterRegNumbers(town) {
        let filteredArray = [];
        if (town == "ALL") {
            filteredArray = registrationNumbers;
        } else {
            registrationNumbers.filter(function (regNum) {
                if (regNum.startsWith(town)) {
                    filteredArray.push(regNum);
                }
            });
        }
        return filteredArray;
    }

    function regFormatCheck(input) {
        return registrationFormat.test(input);
    }

    function countForTown() {
        if (registrationNumbers[registrationNumbers.length - 1].startsWith("CA")) {
            countingPlaces["Cape Town"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CJ")) {
            countingPlaces["Paarl"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CY")) {
            countingPlaces["Bellville"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CL")) {
            countingPlaces["Stellenbosch"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CF")) {
            countingPlaces["Kuils River"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CK")) {
            countingPlaces["Malmesbury"]++;
        } else {
            return false;
        }
        return true; // ? if process successful
    }

    async function getRegistrations(db) {
        let registrations = await db.any("SELECT * FROM registrations");
        return registrations.reverse();
    }

    async function checkDuplicates(regNum) {
        let regNums = await getRegistrations();
        return regNums.some((obj) => obj.registration == regNum);
    }

    async function addRegistration(db, regNum, req) {
        if (regNum) {
            if (regFormatCheck(regNum)) {
                await db.none("INSERT INTO registrations (registration) VALUES ($1)", [regNum]);
            } else {
                req.flash("info", "This is an invalid format");
            }
        } else {
            req.flash("info", "Input cannot be empty");
        }
    }
    return {
        addRegistration,
        getRegistrations,
        filterRegNumbers,
        countForTown,
        regFormatCheck,
    };
}
