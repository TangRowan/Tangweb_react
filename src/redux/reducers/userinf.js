//用户信息
const initState = {Email:'-1',Admin:'-1',User:'-1',Committee:'-1',Userpower:'-1',Committeepower:'-1',Name:'-1',Phone:'-1',Password:'-1'}
export default function userinf(userState=initState,action){
	const {type,data} = action
	switch (type) {
		case 'login': 
			userState={...userState,...data};
			break;
		case 'logout':
			userState=initState
			break;
		default:break;
	}
	return userState
}
