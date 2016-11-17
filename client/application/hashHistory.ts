import {useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

const hashHistory = useRouterHistory(createHashHistory)({queryKey: false});

export default hashHistory;