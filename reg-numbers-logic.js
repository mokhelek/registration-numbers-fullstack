export default function regNumbersFactory() {
    let registrationNumbers =  [];
    let countingPlaces = { "Cape Town": 0, Paarl: 0, Bellville: 0, Stellenbosch: 0, "Kuils River": 0, Malmesbury: 0 };
    let registrationFormat =  /^[a-zA-Z]{0,3}\s*\d{3}(?:[-\s]?\d{0,3})$/

    function handleDuplicates(regNum) {
        if (!registrationNumbers.includes(regNum)) {
            return true;
        } else {
            return false;
        }
    }
    
 

    function filterRegNumbers(town) {
        let filteredArray = [];
        if(town == "ALL"){
            filteredArray = registrationNumbers ;
        }else{
            registrationNumbers.filter(function (regNum) {
                if (regNum.startsWith(town)) {
                    filteredArray.push(regNum);
                }
            });
        }
        return filteredArray;
    }

    function regFormatCheck(input){
        return registrationFormat.test(input)
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
        return true ; // ? if process successful
    }

    function getCountingPlaces() {
        return countingPlaces;
    }
  

    async function getRegistrations(db) {
        let registrations = await db.any("SELECT * FROM registrations");
        return registrations;
    }

    async function addRegistration(db, regNum, req) {
        // if (handleDuplicates(regNum)) {
        //     registrationNumbers.push(regNum);
        // }

        await db.none("INSERT INTO registrations (registration) VALUES ($1)", [regNum])
    }

    return {
        addRegistration,
        getRegistrations,
        filterRegNumbers,
        countForTown,
        handleDuplicates,
        getCountingPlaces,
        regFormatCheck,
            
    };
}
