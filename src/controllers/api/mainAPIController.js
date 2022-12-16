const db = require("../../database/models");

module.exports = {
    totals : async (req, res) => {
        try {

           
            const totalUsers = await db.User.count(); 
            const totalCategories = await db.Category.count(); 

            return res.status(200).json({
                ok: true,
                data: {
                    totalCategories,
                    totalUsers
                } 
            })

        } catch(error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg : error.message || "Comunicate con el administrador." 
            })
        }


    }
}
