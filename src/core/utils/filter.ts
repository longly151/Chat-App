import _ from 'lodash';

type IConditionalOperator = 'OR' | 'AND';

type IOperator = '$eq' | '$not'
| '$ne'
| '$gt'
| '$lt'
| '$gte'
| '$lte'
| '$starts'
| '$ends'
| '$cont'
| '$like'
| '$ilike'
| '$excl'
| '$in'
| '$notin'
| '$isnull'
| '$notnull'
| '$between'
| '$eqL'
| '$neL'
| '$startsL'
| '$endsL'
| '$contL'
| '$exclL'
| '$inL'
| '$notinL'
| '$contL';

class Filter {
  constructor(filterObject: any = {}) {
    this.filterObject = filterObject;
  }

  public filterObject: any;

  public mergeFilter(
    key: string,
    operator: IOperator,
    value: string | number | Array<number> | boolean,
    conditionalOperator: IConditionalOperator = 'AND',
  ): any {
    const valueWithCondition: any = {};
    valueWithCondition[operator] = value;
    const newFilter: any = {};
    newFilter[key] = valueWithCondition;

    if (conditionalOperator === 'AND') {
      this.filterObject = { ...this.filterObject, ...newFilter };
    } else {
      const orNewFilter: any = {};
      orNewFilter.$or = { ...this.filterObject[key], ...newFilter[key] };
      this.filterObject[key] = orNewFilter;
    }

    return this.filterObject;
  }

  public clearFilter(): void {
    this.filterObject = {};
  }

  public deleteFilterByKey(key: string): void {
    this.filterObject = _.omit(this.filterObject, key);
    // delete this.filterObject[key];
  }
}

export default Filter;
