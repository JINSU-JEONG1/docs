const formatterMaxLength = function(val, maxLength){
  const ml = maxLength || 50;
  return String(val).substring(0, ml);
};

/**
 *  예제
 *  :formatter="(val)=>{return eufmtMaxLength(val, 10)}"
 *  :formatter="eufmtMaxLength30"
 *  :formatter="(val)=>{return eufmtToLowerMax(val, 10)}"
 *  :formatter="(val)=>{return eufmtToUpperMax(val, 10)}"
 *  :
 */
export default {
  data() {
    return {

    }
  },
  filters: {
    //전화번호 하이픈 처리
    eufmtPhoneDash(val){
      if(!val) {
        return "-";
      }
      const tv = val || "";
      const t1 = tv.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3");
      //console.debug(t1);
      return t1.replace("--", "-");
    },

    //사업자번호 하이픈 처리
    eufmtBizNumDash(val){
      if(!val) {
        return "-";
      }
      const tv = val || "";
      const t1 = tv.replace(/[^0-9]/g, "").replace(/(^[0-9]{3})([0-9]+)?([0-9]{5})$/,"$1-$2-$3");
      //console.debug(t1);
      return t1.replace("--", "-");
    },

    eufmtNewLineToBr(val) {
      const tv = val || "";
      return tv.replace(/(?:\r\n|\r|\n)/g, '<br />');
    },

    //말줄임
    eufmtEllipsis(val, maxLength){
      const tv = val || "";
      const ml = maxLength || 100;

      if(tv.length <= ml){
        return tv;
      }
      return tv.substring(0, ml) + '...';
    },

    //계좌번호 하이픈 처리
    eufmtBankAccountDash(val){
      if(!val) {
        return "-";
      }
      const tv = val || "";
      const t1 = tv.replace(/(^[0-9|\*]{4})([0-9|\*]+)?([0-9\\*]{5})$/,"$1-$2-$3");
      //console.debug(t1);
      return t1.replace("--", "-");
    },

    //카드번호 하이픈 처리
    eufmtCardNumDash(val){
      if(!val) {
        return "-";
      }
      const tv = val || "";
      const t1 = tv.replace(/(^[0-9|\*]{4})([0-9|\*]{4})([0-9|\*]{4})([0-9\\*]{2,4})$/,"$1-$2-$3-$4");
      //console.debug(t1);
      return t1.replace("--", "-");
    },
  },
  methods: {
    //최대 글자 제한
    eufmtMaxLength(val, maxLength){
      return formatterMaxLength(val, maxLength || 50);
    },

    //최대 글자 제한 50자
    eufmtMaxLength50(val){
      return formatterMaxLength(val, 50);
    },

    //최대 글자 제한 30자
    eufmtMaxLength30(val){
      return formatterMaxLength(val, 30);
    },

    //최대 글자 제한 4자
    eufmtMaxLength4(val) {
      return formatterMaxLength(val, 4);
    },

    //소문자만
    eufmtToLowerCase(val){
      return val.toLowerCase();
    },

    //대문자만
    eufmtToUpperCase(val){
      return val.toUpperCase();
    },

    //소문자만 글자제한
    eufmtToLowerMax(val, maxLength){
      const tv = val.toLowerCase();
      return this.eufmtMaxLength(tv, maxLength);
    },

    //대문자만 글자제한
    eufmtToUpperMax(val, maxLength){
      const tv = val.toUpperCase();
      return this.eufmtMaxLength(tv, maxLength);      
    },

    //바이트 글자제한
    eufmtToBtyeMax(val, maxLength){
      const tv = val.toUpperCase();
      return this.eufGetByteB(tv, maxLength);      
    },

    //한글2, 영문/숫자 1
    eufGetByteB(pStr) {
      const str = pStr || "";

      let byteCnt = 0;      
      for (let i=0; i<str.length; ++i) {      
        // 기본 한글 2바이트 처리      
        (str.charCodeAt(i) > 127) ? byteCnt += 2 : byteCnt++ ;      
      }
      
      return byteCnt;      
    },

    //사업자번호 하이픈 처리
    eufmtBizNumDash(val) {
      if (!val) {
        return "-";
      }
      const tv = val || "";
      const t1 = tv.replace(/[^0-9]/g, "").replace(/(^[0-9]{3})([0-9]+)?([0-9]{5})$/, "$1-$2-$3");
      //console.debug(t1);
      return t1.replace("--", "-");
    },
    
  }
}