
export default function regNumsRoutes(regNumsInstance) {

    async function show(req, res) {
        let regNums = await regNumsInstance.getRegistrations(req.params.regCode);
        let townData = await regNumsInstance.getTowns(req.params.regCode);
  
        res.render("home", {
            regNums,
            townData,
            emptyList: regNums.length == 0,
        });
    }

    async function add(req, res) {
        
        let regNum = (req.body.regNumInput).toUpperCase()

        if (regNum) {
            if(regNum.startsWith("CA") || regNum.startsWith("CJ") ||regNum.startsWith("CJ") ||regNum.startsWith("CF") ||regNum.startsWith("CK") ||regNum.startsWith("CY") ){
                if (regNumsInstance.regFormatCheck(regNum)) {
                    if (!(await regNumsInstance.checkDuplicates(regNum))) {
                        await regNumsInstance.addRegistration((req.body.regNumInput).toUpperCase(), req);
                    } else {
                        req.flash("info", "Registration already exists");
                    }
                } else {
                    req.flash("info", "This is an invalid format");
                    req.flash("examples", "Registration examples");
                }
            }else{
                req.flash("info", "Unknown Location Registration");
            }

        } else {
            req.flash("info", "Input cannot be empty");
        }
    

        res.redirect("/");
    }

    async function showOne(req, res) {
        let selectedReg = req.params.selectedReg ;
        res.render('registration-selected', {selectedReg})
    }

    async function reset(req, res) {
        await regNumsInstance.resetData();
        res.redirect("/");
    }

    return {
        show,
        add,
        reset,
        showOne
        
    };
}
