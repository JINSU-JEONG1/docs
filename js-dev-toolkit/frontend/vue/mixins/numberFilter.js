import format from 'format-number';


const fncFmtCurrency = function(value, prefix, suffix){
  const s = suffix || '';
  const cFormat = format({prefix: prefix, suffix: s});
  return cFormat(value, {noSeparator: false});
};

const fncFmtNumber = function(value, round, truncate, prefix, suffix){
  const s = suffix || '';
  const p = prefix || '';
  const op = {
    prefix: p, suffix: s
  };
  if(round != null){
    op.round = round;
  }
  if(truncate != null){
    op.truncate = truncate;
  }  
  const cFormat = format(op);
  return cFormat(value, {noSeparator: false});
};

/**
 *  예제
 *  {{12312312 | eFmtWon}}<br/>
    {{12312312.12 | eFmtWon}}<br/>
    {{12312312.12 | eFmtDolar}}<br/>
    {{12312312.12 | eFmtNum}} <br/> 
    {{12312312.167 | eFmtNumT(2)}} <br/> 
    {{12312312.168 | eFmtNumR(2)}} <br/> 
 */
export default {
  data() {
    return {

    }
  },
  filters: {
    //소수 반올림
    eFmtNumR(value, round, prefix, suffix){
      const r = round || 0;
      return fncFmtNumber(value, r, null, prefix, suffix);
    },

    //소수 버림
    eFmtNumT(value, truncate, prefix, suffix){
      const t = truncate || 0;
      return fncFmtNumber(value, null, t, prefix, suffix);
    },

    //통화
    eFmtCurrency(value, prefix, suffix){
      return fncFmtCurrency(value, prefix, suffix);
    },

    //원화
    eFmtWon(value, suffix) {
      return fncFmtCurrency(value, '₩', suffix);
    },

    //달러
    eFmtDolar(value, suffix) {
      return fncFmtCurrency(value, '$', suffix);
    },

    //리뷰 별점 평균값 (소수점 아래 1자리 출력)
    eFmtReviewPoint(val) {
      if(!val){
        return "0.0";
      }
      val = val / 10;
      return val.toFixed(1);
    },

    // 금액 한글로 변환
    eFmtNum2han(num) {
      if (num === null || !/\d/.test(num)) {
        return '올바른 숫자를 입력해주세요.';
      }

      num = num.replace(/,/g, "");
      num = parseInt((num + '').replace(/[^0-9]/g, ''), 10) + '';  // 숫자/문자/돈 을 숫자만 있는 문자열로 변환

      if (num == '0')
        return '영';

      if (num.length > 16) {
        return '';
      }

      var number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
      var unit = ['', '만', '억', '조'];
      var smallUnit = ['천', '백', '십', ''];
      var result = [];  //변환된 값을 저장할 배열
      var unitCnt = Math.ceil(num.length / 4);  //단위 갯수. 숫자 10000은 일단위와 만단위 2개이다.
      num = num.padStart(unitCnt * 4, '0')  //4자리 값이 되도록 0을 채운다
      var regexp = /[\w\W]{4}/g;  //4자리 단위로 숫자 분리
      var array = num.match(regexp);
      //낮은 자릿수에서 높은 자릿수 순으로 값을 만든다(그래야 자릿수 계산이 편하다)
      for (var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
        var hanValue = _makeHan(array[i]);  //한글로 변환된 숫자
        if (hanValue == '')  //값이 없을땐 해당 단위의 값이 모두 0이란 뜻. 
          continue;
        result.unshift(hanValue + unit[unitCnt]);  //unshift는 항상 배열의 앞에 넣는다.
      }
      //여기로 들어오는 값은 무조건 네자리이다. 1234 -> 일천이백삼십사
      function _makeHan(text) {
        var str = '';
        for (var i = 0; i < text.length; i++) {
          var num = text[i];
          if (num == '0') {
            continue;
          }  //0은 읽지 않는다
          str += number[num] + smallUnit[i];
        }
        return str;
      }
 
      return '금 ' + result.join('') + '원 정';
    }
  },
  methods: {
    
    
  }
}