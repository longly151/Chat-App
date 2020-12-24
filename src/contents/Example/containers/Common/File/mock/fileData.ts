import { IFile } from '@core/utils/appHelper';

const fileData: IFile[] = [
  {
    name: 'Giấy phép bán hàng',
    mime: 'image/jpeg',
    updatedAt: new Date('2019-10-10'),
    remoteUrl: 'https://image.baodauthau.vn/w1024/Uploaded/2020/qjmfn/2018_06_18/t/02-1_sptz.jpg'
  },
  {
    name: 'Chính sách bán hàng 1',
    mime: 'application/pdf',
    remoteUrl: 'https://reesnext-prod.s3-ap-southeast-1.amazonaws.com/digital-contract.pdf',
    updatedAt: new Date('2020-06-05T21:14:46.762Z')
  },
  {
    name: 'Chính sách bán hàng 2',
    mime: 'application/pdf',
    remoteUrl: 'https://reesnext-prod.s3-ap-southeast-1.amazonaws.com/digital-contract.pdf',
    updatedAt: new Date('2020-10-20T23:06:42.959Z')
  }
];
export default fileData;
