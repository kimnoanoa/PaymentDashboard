// // 가맹점 리스트용
// export interface Merchant {
//  mchtCode: string;      // 가맹점 코드
//   mchtName: string;      // 가맹점 이름
//   status: string;        // 활성 여부
//   bizType: string;       // 업종 종류
// }

// // 가맹점 상세용
// export interface MerchantDetail extends Merchant {
//   bizNo: string;         // 사업자번호
//   address: string;       // 주소
//   phone: string;         // 전화번호
//   email: string;         // 이메일
//   registeredAt: string;  // 등록일
//   updatedAt: string;     // 수정일
// }

export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

export interface MerchantDetail {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}
