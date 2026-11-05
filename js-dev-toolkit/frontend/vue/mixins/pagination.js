import format from 'format-number';

/**
 * 페이지네이션 mixin
 * 리스트의 행 번호 계산 및 페이지 범위 표시 기능 제공
 */

/**
 * 행 번호를 오름차순으로 계산
 * @param {number} rowIdx - 현재 행 인덱스 (0부터 시작)
 * @param {number} curPage - 현재 페이지 번호
 * @param {number} itemPerPage - 페이지당 항목 수
 * @returns {string} - 포맷된 행 번호 문자열
 */
const fncRowNumber = (rowIdx, curPage, itemPerPage)=>{
  const cp = curPage || 1;
  const cFormat = format({});
  return `${cFormat((cp-1)*itemPerPage + (rowIdx+1))}`;
};

/**
 * 행 번호를 내림차순으로 계산
 * @param {number} rowIdx - 현재 행 인덱스 (0부터 시작)
 * @param {number} curPage - 현재 페이지 번호
 * @param {number} totalItem - 전체 항목 수
 * @param {number} itemPerPage - 페이지당 항목 수
 * @returns {string} - 포맷된 행 번호 문자열 (내림차순)
 */
const fncRowNumberDesc = (rowIdx, curPage, totalItem, itemPerPage)=>{
  const cp = curPage || 1;
  const cFormat = format({});
  return `${cFormat(totalItem - ((cp-1)*itemPerPage + (rowIdx)))}`;
};

export default {
  mixins: [],
  data() {
    return {
      // mixin 데이터는 필요에 따라 추가
    }
  },
  computed: {
    // computed 속성은 필요에 따라 추가
  },
  filters: {
    /**
     * Filter: pageInfo 객체를 받아 내림차순 행 번호 계산
     * @param {number} rowIdx - 행 인덱스
     * @param {object} pageInfo - 페이지 정보 객체 { curPage, totalItem, perPage }
     * @returns {string} - 포맷된 행 번호
     */
    eufRowNumberDescForPageInfo(rowIdx, pageInfo){
      return fncRowNumberDesc(rowIdx, pageInfo.curPage, pageInfo.totalItem, pageInfo.perPage);
    },

    /**
     * Filter: 개별 파라미터를 받아 내림차순 행 번호 계산
     * @param {number} rowIdx - 행 인덱스
     * @param {number} curPage - 현재 페이지
     * @param {number} totalItem - 전체 항목 수
     * @param {number} itemPerPage - 페이지당 항목 수
     * @returns {string} - 포맷된 행 번호
     */
    eufRowNumberDesc(rowIdx, curPage, totalItem, itemPerPage){
      return fncRowNumberDesc(rowIdx, curPage, totalItem, itemPerPage);
    },

    /**
     * Filter: pageInfo 객체를 받아 오름차순 행 번호 계산
     * @param {number} rowIdx - 행 인덱스
     * @param {object} pageInfo - 페이지 정보 객체 { curPage, perPage }
     * @returns {string} - 포맷된 행 번호
     */
    eufRowNumberForPageInfo(rowIdx, pageInfo){
      return fncRowNumber(rowIdx, pageInfo.curPage, pageInfo.perPage);
    },

    /**
     * Filter: 개별 파라미터를 받아 오름차순 행 번호 계산
     * @param {number} rowIdx - 행 인덱스
     * @param {number} curPage - 현재 페이지
     * @param {number} itemPerPage - 페이지당 항목 수
     * @returns {string} - 포맷된 행 번호
     */
    eufRowNumber(rowIdx, curPage, itemPerPage){
      return fncRowNumber(rowIdx, curPage, itemPerPage);
    },
  },
  methods: {
    /**
     * Method: pageInfo 객체를 받아 페이지 범위 문자열 생성
     * @param {object} pageInfo - 페이지 정보 객체 { curPage, perPage, totalItem }
     * @returns {string} - "start ~ end of total" 형식의 문자열
     */
    eumPaginationRangeForPageInfo(pageInfo){
      return this.eumPaginationRange(pageInfo.curPage, pageInfo.perPage, pageInfo.totalItem);
    },

    /**
     * Method: 개별 파라미터를 받아 페이지 범위 문자열 생성
     * @param {number} curPage - 현재 페이지 번호
     * @param {number} itemPerPage - 페이지당 항목 수
     * @param {number} totalItem - 전체 항목 수
     * @returns {string} - "start ~ end of total" 형식의 문자열
     */
    eumPaginationRange(curPage, itemPerPage, totalItem){
      const cp = curPage || 1;
      const start = Math.max(((cp-1) * itemPerPage) + 1, 0);
      const end = (cp) * itemPerPage;

      const cFormat = format({});
      return `${cFormat(start)} ~ ${cFormat(end)} of ${cFormat(totalItem)}`;
    }
  }
}