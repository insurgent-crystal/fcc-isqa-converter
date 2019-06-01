function ConvertHandler() {
  
  this.getNum = function(input) {
    let result
    
    const reg = /^[0-9\-./]+/
    result = input.match(reg) ? input.match(reg)[0] : '1'
    
    if (result.match(/\//g) && result.match(/\//g).length > 1) {
      return 'invalid number'
    }
    
    try {
      result = isFinite(eval(result)) ? eval(result) : 'invalid number'
    } 
    catch(error) {
      return 'invalid number'
    }   
    
    return result
  }
  
  this.getUnit = function(input) {
    let result
    
    const reg = /(^[0-9\-./]*)(.*)/
    const validUnits = /^gal$|^l$|^lbs$|^kg$|^mi$|^km$/
    
    const unit = input.match(reg)[2].toLowerCase()
    if (unit) {
      if (validUnits.test(unit)) {
        result = unit
      } else {
        result = 'invalid unit'
      }
    } else {
      result = 'invalid unit'
    }
    
    return result
  }
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case 'gal': return 'l'
      case 'l'  : return 'gal'
      case 'lbs': return 'kg'
      case 'kg' : return 'lbs'
      case 'mi' : return 'km'
      case 'km' : return 'mi'
    }
  }

  this.spellOutUnit = function(unit) { //What's this supposed to do
    switch (unit) {
      case 'gal': return 'gallons'
      case 'l'  : return 'liters'
      case 'lbs': return 'pounds'
      case 'kg' : return 'kilograms'
      case 'mi' : return 'miles'
      case 'km' : return 'kilometers'
    }
  }
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934
    
    switch (initUnit) {
      case 'gal': return initNum * galToL
      case 'l'  : return initNum / galToL
      case 'lbs': return initNum * lbsToKg
      case 'kg' : return initNum / lbsToKg
      case 'mi' : return initNum * miToKm
      case 'km' : return initNum / miToKm
    }
  }
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit)
  }
  
}

module.exports = ConvertHandler