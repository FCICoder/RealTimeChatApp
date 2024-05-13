import ChatList from './Chatlist/ChatList';
import style from './List.module.css'
import UserInfo from './userInfo/UserInfo';
const List = () =>{
    return <>
    <div className={`${style.list}`}>
        <UserInfo />
        <ChatList /> 
    </div>
    </>
}

export default List;