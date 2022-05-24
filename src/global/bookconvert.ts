const axios = require('axios');

const url = 'https://api.cloudconvert.com/v2/jobs';

interface BookInfo {
  type: string;
  file: File;
}

const pat =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWIxYTA2YmQyNTU2NjE5NmI0MWI2ODM2NGFkM2NmZTZhNTU1MWI4OWQ2NTBjN2NmOWQ2NTg5OTQ2NjIxMjE1ODVmNDNkYzY5M2E0NTgwOGIiLCJpYXQiOjE2NTEwODM3MTQuODA0OTc3LCJuYmYiOjE2NTEwODM3MTQuODA0OTgsImV4cCI6NDgwNjc1NzMxNC44MDI0MjcsInN1YiI6IjU3NjAyNDc4Iiwic2NvcGVzIjpbInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIiwid2ViaG9vay53cml0ZSIsIndlYmhvb2sucmVhZCJdfQ.PxWtCMlfv7MF7DVyoDQ117MEfl56KqfOsHwl8Tte7_UKjtcrZYIeZCttYi_b2ZCD2_Y98NMiNkr4nx6qtl0FoETZE8de7wKGA9PPBRoWbfgp3v3CU7uH5WlUe-OjPj-7NpsTK2BZz9C97m6tu3_JSgnUGAvwiGlAk_bOZbe4yKVhEynYVEZuC-b63MhvOtvJeB_4DIerGCcg_l41pprqC37Raave6VMt54CyuQ5uMmA10f9yeOAMEOHwNJetn788wqM_YKBzLXBjl1dL-xo6dj1ikk_uSnKBvxtob8TRT3pn4L60t0q4e7xIRIs9CerUi4rif-M4CzqU7Cl8SrRnXC7hW_S8PsYujnfiiM2azbqFT7BxJyb_bLIVNkEqSP-tzDjcUC2O6ZQM1KeZLs2HBr8v5JJcKtTsl1jef3cDWPZcpmmqAkOY215DHXiWwvRlrt7BUr2Zj5MCfEr5042f-e5FoMgKJAQCnq6dGZ3btLsDw_ykOLcyr4dqq12aTsRJRaE4dv_Tl49cJyM-BG3_9XbR-LOXwAzOpjyoC1BjEjV5hn3Q3tkvB1r4dycvxDgn_6qyb0-PVTC77B9DHNMmM5hsRe6SUxaupBgvHFrbCH4eeoUS3fhOLqvL_bqMEv4ISGPPavHnLQeUFR8l_L_909x32GXCchdBz-pgNVlnRn0';

export const setBookConversion = (bookInfo: BookInfo) => {
  return axios
    .post(url, bookInfo, {
      maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
      headers: {
        authorization: pat,
      },
    })
    .then(function (response) {
      console.log('pin successful: ', response);
    })
    .catch(function (error) {
      //handle error here
    });
};
