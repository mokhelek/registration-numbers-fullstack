
export default function regNumsRoutes(db, regNumsInstance) {

    async function show(req, res) {
        let regNums = await regNumsInstance.getRegistrations(db, req.params.regCode);
        let townData = await regNumsInstance.getTowns(db, req.params.regCode);
  
        res.render("home", {
            regNums,
            townData,
            emptyList: regNums.length == 0,
        });
    }

    async function add(req, res) {
        await regNumsInstance.addRegistration(db, (req.body.regNumInput).toUpperCase(), req);
        res.redirect("/");
    }


    async function reset(req, res) {
        await regNumsInstance.resetData(db);
        res.redirect("/");
    }

    return {
        show,
        add,
        reset
        
    };
}
