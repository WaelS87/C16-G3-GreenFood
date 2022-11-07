const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const Users = db.User;



const userAPIController = {
'list': (req, res) => {
    db.User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/userAPI'
                },
                data: users,

        catch(error) {
                console.log(error)
                return res.status(500).json({
                        ok: false,
                        msg: error.message? error.message : "Hubo un error"
                    })
                }
            } 
                res.json(respuesta);
            })
        }, 
    
'detail': (req, res) => {
    db.User.findByPk(req.params.id)
           .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: '/api/userAPI/:id'
                    },
                    data: user,
            catch(error) {
                console.log(error)
                return res.status(500).json({
                        ok: false,
                        msg: error.message? error.message : "Hubo un error"
                        })
                    }
                } 

                res.json(respuesta);
            });
    },

}

module.exports = userAPIController;