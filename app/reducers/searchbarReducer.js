export default function query (state = '', action) {
  switch (action.type) {
    case 'UPDATE_QUERY':
      return action.searchbarQuery;
    case 'CLEAR_QUERY':
      return '';
    default:
      return state;
  }
}
