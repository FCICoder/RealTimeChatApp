import './AddUser.css'
const AddUser = () => {

    return<>
    <div className="addUser">
        <form >
            <input type="text" placeholder='UserName' name='userName' />
            <button>Search</button>
        </form>
        <div className="user">
            <div className="detail">
                <img src="./avatar.png" alt="" />
                <span>jane Doe</span>
            </div>
            <button>Add User</button>
        </div>
    </div>
    </>
}

export default  AddUser;