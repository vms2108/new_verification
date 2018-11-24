// import { Application } from '../../../verification.models';

// export const identificationRequest: Application = {
//   id: '11123',
//   type: 'identification',
//   date_of_creation: '2017-11-09T21:00:00.000Z',
//   expiration_date: '2019-11-08T14:00:17.979Z',
//   user_data: {
//     id: 120,
//     first_name: {
//       status: 'UNDEFINED',
//       value: 'Konstantin'
//     },
//     middle_name: {
//       status: 'UNDEFINED',
//       value: 'Konstantinovich'
//     },
//     last_name: {
//       status: 'UNDEFINED',
//       value: 'Konstantinopolskiy'
//     },
//     birth_place: {
//       status: 'UNDEFINED',
//       value: 'Moscow'
//     },
//     birth_date: {
//       status: 'UNDEFINED',
//       value: '1990-10-09T21:00:00Z'
//     },
//     phone: [
//       {
//         status: 'UNDEFINED',
//         id: 99,
//         country_code: '+7',
//         number: '9104419425'
//       }
//     ],
//     address: {
//       index: {
//         status: 'UNDEFINED',
//         value: '107150'
//       },
//       state: {
//         status: 'UNDEFINED',
//         value: 'leningradskaya'
//       },
//       country: {
//         status: 'UNDEFINED',
//         value: 'Russia'
//       },
//       city: {
//         status: 'UNDEFINED',
//         value: 'Moscow'
//       },
//       street: {
//         status: 'UNDEFINED',
//         value: 'Lenina'
//       },
//       building: {
//         status: 'UNDEFINED',
//         value: '24'
//       },
//       apartment: {
//         status: 'UNDEFINED',
//         value: '234234234234234234234'
//       }
//     },
//     main_document: {
//       id: 239,
//       path:
//         'https://storage.googleapis.com/user-documents-dev/91/d3f981a0-d5f3-4998-a915-d3746e32d631_685d7e76-1553-42af-96f9-03775dbd006c.jpeg?Expires=1543048783&GoogleAccessId=pd-tmp-storage%40api-project-206881048866.iam.gserviceaccount.com&Signature=kt%2F3vNTe5152HLd%2F%2FlyKB5zg0Kvi1EsZq2fIXojDS5LwkWEh2iI%2F6AfOfy7RHizrgykJXXgCzA69zrgX%2Bbqq4B8stsT3opq%2B1bJdI%2BEWWiuV%2BiTC71toxbTfDGpMtYuU%2FVKbIiWcX6GlNQuWI9rwcfRVdVlgVopdRiEJo1XI12HHdv6LlJvfLZPp1jp7Hy3uwuw5134HRl3idvUcfQPhwCqqOm8s8BknFzZHnwHDI4wMtAJOF7C%2FEuUYUc8adyzk092%2BxoZ9eiIK1Jq3KGG85c9v2%2FpxOIks0LQFhf6E8%2Fvjs%2FdHKNHz34oxo%2FK%2FcgFJSXBKvpP1wX7mU9xZM35d0w%3D%3D',
//       endless: true,
//       number: 'test-001',
//       type: 'OTHER',
//       type_custom: 'drugop tip documents',
//       expiration_date: null,
//       issue_date: '1970-01-30T21:00:00Z',
//       selfie_path:
//         'https://storage.googleapis.com/user-documents-dev/91/f2f265f3-2266-487d-9f0a-e1c5574fb5e9_1833ced9-e6d9-46a3-8836-2ceb10d17cdb.jpeg?Expires=1543048783&GoogleAccessId=pd-tmp-storage%40api-project-206881048866.iam.gserviceaccount.com&Signature=GAOqwLqnEWPDQnLHtlJ%2BPMgvI6p%2B%2Fb8Z0BO7ccMjEVnRg0VRFmS16Wt9KV2K1gI1B6m8CJ6Gp4qkki2LJ99JYtXWS31cwklww0m7VL6pJlQ07X76YyvOceB3HguAjEhrlbvOpAA75vm2nBT97zggaElLvRleFBj5fF49W33s8qtSogXOhAl91J2WkcIcdGSLxXKgQ%2FLR7r3TvH3X%2F4feJge4F1tSi%2Bx6CiZUB25hZa%2FuagrWiNxFrC40kfgvgfAFp%2FF5VIkECQsLgbVQGBbja5u5wOS3cTj9olGr95ITnEmvmv0kWyIiVaV9cld0bq8Ze2%2FSoQ33PZRF84bnP7E2Yg%3D%3D',
//       status: 'UNDEFINED',
//       storage_path: '91/d3f981a0-d5f3-4998-a915-d3746e32d631_685d7e76-1553-42af-96f9-03775dbd006c.jpeg',
//       storage_selfie_path: '91/f2f265f3-2266-487d-9f0a-e1c5574fb5e9_1833ced9-e6d9-46a3-8836-2ceb10d17cdb.jpeg'
//     },
//     extra_document: {
//       id: 240,
//       path:
//         'https://storage.googleapis.com/user-documents-dev/91/c00bfd9a-a07f-49ab-8959-0f2338730b7e_deposit.jpg?Expires=1543048783&GoogleAccessId=pd-tmp-storage%40api-project-206881048866.iam.gserviceaccount.com&Signature=AP2CuFoaDCRS%2BUH%2Bh0kanVESxTpvlqJcp52zg%2FGgKe1nvUgKW0SWKYenfJZc%2BAE3IuRoISixlGuKSVI2VaIsn0DbcUm2eVVFaNb%2F0El6ClFkjOKz%2B7G5cXu9wx0RYlEo1RBgIV9rh%2Fa5enGTtyJmByI%2Fs2cpnoEfkwD46uTDm5wuAhrTp4nGp1HmtZvwjVZd7gNVGvcfBZikcr0Tmlc07doPm%2FjK4Kn%2BVhBWwP0vUsSaj9cikTPIJR8N3P7QFrocZYu%2BbvZ8eOOFfXM56CKuU5SGC4SJhq61rhRnen2hPCKCi8eJ7SaPPuQ8T%2FoKN1sEo4AQJDOfXK%2F5JbwryNgIJA%3D%3D',
//       endless: true,
//       number: 'asdoifj q3io4f poiq3u 4fiou poiwaeu fioqu weofiu qp3io4 fopiuq eoifu qioweu fopiquw eopifu qwopiefu',
//       type: 'OTHER',
//       type_custom: 'super custom document type',
//       expiration_date: null,
//       issue_date: '1970-01-29T21:00:00Z',
//       selfie_path:
//         'https://storage.googleapis.com/user-documents-dev/91/69f11ee9-40fc-4a8f-b17a-f492aaa1a955_Bender.jpg?Expires=1543048783&GoogleAccessId=pd-tmp-storage%40api-project-206881048866.iam.gserviceaccount.com&Signature=JF7Lsj1X735JXjtvtYK75LD9ESIVG0rFo7XKk9sBL7LjKm4azvgWYNEnuXwEq9lSv8yap%2BYWkPacyAbxZ5MOOeBzKtF7bLMNsTDv9gnKK7K2dEjWu%2FVTwRXYALOuIFlmXkLV0D5U%2FlM6JdY%2BaFzFsthqHmEr4EZW3YcaWQlFLGfmXZNIyERMju2lAqck2xtRxR4IJgYq7Hj800lU%2FUz7Mud%2FSwBBmgnEZTyy4TOKelJxcpF3VJYGRFi2m2hzE8AvXrOWLXyDBZOzh4exZmrQqlkBHoBREJCg42sRZj0exSPkrzWm8%2Fq7nhaztJx7H6DfuLRVpf5cjZygzwjzICsNQg%3D%3D',
//       status: 'UNDEFINED',
//       storage_path: '91/c00bfd9a-a07f-49ab-8959-0f2338730b7e_deposit.jpg',
//       storage_selfie_path: '91/69f11ee9-40fc-4a8f-b17a-f492aaa1a955_Bender.jpg'
//     },
//     status: 'UNDEFINED'
//   }
// };
