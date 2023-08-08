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


    async function getRegistrations(db, regCode) {
        let registrations = await db.any("SELECT * FROM registrations");
        /*
            ? After fetching all the data
            ? Filter it according to a code passed
            ? And thereafter return the reverse of the new filtered array
        */
        let filteredRegArr = registrations.filter(function(item){
            return (item.registration).includes(regCode)
        })
        console.log("Filtered ", filteredRegArr)

        return filteredRegArr.reverse();
    }

    async function checkDuplicates(db, regNum) {
        let regNums = await getRegistrations(db);
        return regNums.some((obj) => obj.registration == regNum);
    }

    async function addRegistration(db, regNum, req) {
        // TODO : -> Add unknown location error handling

        if (regNum) {

            if (regFormatCheck(regNum)) {
                if( !(await checkDuplicates(db, regNum)) ){
                    await db.none("INSERT INTO registrations (registration) VALUES ($1)", [regNum]);
                }else{
                    req.flash("info", "Registration already exists");
                }
            } else {
                req.flash("info", "This is an invalid format");
            }

        } else {
            req.flash("info", "Input cannot be empty");
        }
    }

    async function resetData(db) {
        await db.none("DELETE FROM registrations");
    }


    return {
        addRegistration,
        getRegistrations,
        filterRegNumbers,
        regFormatCheck,
        resetData,
    };
}
