/* eslint-disable class-methods-use-this */
/* eslint-disable no-mixed-operators */

import _ from 'lodash';

class CHelper {
  private static _instance: CHelper;

  private constructor() {
    // ...
  }

  public static get Instance(): CHelper {
    if (!this._instance) {
      this._instance = new this();
    }
    return CHelper._instance;
  }

  enumToArray(enumme: any) {
    return Object.keys(enumme)
      .map((key: string) => enumme[key]);
  }

  vndPriceFormat(price: number) {
    if (price > 0 && price < 1000000) {
      return `${Math.round(price / 1000 * 100) / 100} ngàn`;
    }
    if (price >= 1000000 && price < 1000000000) {
      return `${Math.round(price / 1000000 * 100) / 100} triệu`;
    }
    if (price > 1000000000) {
      return `${Math.round(price / 1000000000 * 100) / 100} tỷ`;
    }
    return price;
  }

  /* eslint-disable */

  getValueFromObjectField(theObject: any, field: string, arrayResult: any = []): any {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        result = this.getValueFromObjectField(theObject[i], field, arrayResult);
        if (result) {
          break;
        }
      }
    } else {
      for (const prop in theObject) {
        if (prop === field) {
          arrayResult.push(theObject[prop]);
        }
        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
          result = this.getValueFromObjectField(theObject[prop], field, arrayResult);
          if (result) {
            break;
          }
        }
      }
    }
    return result;
  };

  selectFields(collection: Array<any>, fields: Array<string> | string) {
    if (typeof fields === 'string') {
      const result: any = [];
      collection.forEach((e: any) => {
        result.push(e[fields]);
      });
      return result;
    }
    return _.map(collection, _.partialRight(_.pick, fields));
  }

  selectDeepFields(theObject: any, field: string) {
    const result: any = [];
    this.getValueFromObjectField(theObject, field, result);
    return result;
  }


  findDeepFields(theObject: any, field: string, value: any): any {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        result = this.findDeepFields(theObject[i], field, value);
        if (result) {
          break;
        }
      }
    } else {
      for (const prop in theObject) {
        if (prop === field) {
          if (theObject[prop] == value) {
            return theObject;
          }
        }
        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
          result = this.findDeepFields(theObject[prop], field, value);
          if (result) {
            break;
          }
        }
      }
    }
    return result;
  }

  assignKeyToPlainArray(array: Array<string | number>, assignedKey: string) {
    return array.map(e =>
      ({[assignedKey]: e})
    )
  }

  convertToRgb(hex: any){
    let c: any;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgb('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+')';
    }
    return hex;
  }

  getRgbArray(rgb: any){
    let rgbArray: string[] = [];
    let rgbValueArray: number[] = [];
    const rgbValue = rgb.replace('rgb(','').replace(')','');
    rgbArray = _.split(rgbValue, ',')
    rgbArray.forEach((e, index)=>{
      rgbValueArray[index] = parseInt(e, 10);
    })
    return rgbValueArray;
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

const Helper = CHelper.Instance;
export default Helper;
