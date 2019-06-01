'use strict'

const expect = require('chai').expect
const ConvertHandler = require('../controllers/convertHandler.js')

module.exports = app => {
  
  var convertHandler = new ConvertHandler()

  app.route('/api/convert')
    .get((req, res) => {
      const input      = req.query.input
      
      const initNum    = convertHandler.getNum(input)
      const initUnit   = convertHandler.getUnit(input)
      
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.type('text').send('invalid number and unit')
      }
      if (initNum === 'invalid number') {
        return res.type('text').send('invalid number')
      }
      if (initUnit === 'invalid unit') {
        return res.type('text').send('invalid unit')
      }
      
      const returnNum  = convertHandler.convert(initNum, initUnit)
      const returnUnit = convertHandler.getReturnUnit(initUnit)
      const toString   = convertHandler.getString(Math.round(initNum * 100000) / 100000, initUnit, Math.round(returnNum * 100000) / 100000, returnUnit)
    
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      })
    })
    
}