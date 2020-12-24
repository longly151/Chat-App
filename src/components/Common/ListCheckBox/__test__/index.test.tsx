/* eslint-disable no-undef */
import React from 'react';
import TestHelper, { EnumComponent } from '@utils/testHelper';
import ListCheckBox from '..';

const data = [
  { id: '0', name: 'Mở bán dự án Residences Quy Nhơn' },
  { id: '17', name: 'Công bố dự án Phúc Yên Prosper Phố Đông Thủ Đức' },
  { id: '2', name: 'Công bố dự án Century City Long Thành' },
  { id: '5', name: 'Mở bán dự án Green Dragon City Quảng Ninh' },
];
const target = <ListCheckBox data={data} />;
const type = EnumComponent.SINGLE;

describe('ListCheckBox Component', () => {
  // TestHelper.basicTest(target, type);
  it('should apply all custom props', () => {
    /**
     * background
     */
    const lcbStyle = TestHelper.getStyle(target, { backgroundColor: 'red' }, type, 'style');
    expect(lcbStyle.backgroundColor).toBe('red');

    const props1 = TestHelper.getComponent(target, { row: true }, type).props();
    expect(props1.style).toMatchObject({
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    });

    // eslint-disable-next-line max-len
    const props2 = TestHelper.getComponent(target, { checkBoxProps: { iconRight: true } }, type).props();
    expect(props2.children).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            iconRight: true,
          }),
        }),
      ]),
    );

    const props3 = TestHelper.getComponent(target, { backgroundColor: '#E3E3E3' }, type).props();

    expect(props3.style.backgroundColor).toBe('#E3E3E3');

    const single = TestHelper.getComponent(target, { single: true }, type).props();
    expect(single.testID).toBe('ListRadioButton');

    const multiple = TestHelper.getComponent(target, { single: false }, type).props();
    expect(multiple.testID).toBe('ListCheckBox');
  });
});
