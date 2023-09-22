import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class EmployeeService {
    Login(data) {
        return axios.post(API_BASE_URL + 'user-login/', data);
    }
    EditChat(data) {
        return axios.post(API_BASE_URL + 'edit-chat/', data);
    }
    Signup(data) {
        return axios.post(API_BASE_URL + 'user-signup/', data);
    }
    ForgotPassword(data) {
        return axios.post(API_BASE_URL + 'forgotPassword/', data);
    }
    getUser(user_id) {
        return axios.get(API_BASE_URL + 'get-user/' + user_id);
    }
    getNotes(user_id) {
        return axios.get(API_BASE_URL + 'get-notes/' + user_id);
    }
    getDownload(id) {
        return axios.get(API_BASE_URL + 'get-download/' + id);
    }
    getNotesFilter(user_id, filter) {
        return axios.get(API_BASE_URL + 'get-notesfilter/' + user_id + '/' + filter);
    }
    getChatStatus(sent_from, sent_to) {
        return axios.get(API_BASE_URL + 'get-chatstatus/' + sent_from + '/' + sent_to);
    }
    getBlockUserDelete(user_id, rece_id) {
        return axios.get(API_BASE_URL + 'get-chatstatus/' + user_id + '/' + rece_id);
    }
    DeleteNotes(id) {
        return axios.get(API_BASE_URL + 'get-deletenotes/' + id);
    }
    CreateNotes(data) {
        return axios.post(API_BASE_URL + 'add-notes/', data);
    }
    getChat(user_id, rece_id) {
        return axios.get(API_BASE_URL + 'get-chat/' + user_id + '/' + rece_id);
    }
    getDeleteAllChatUser(user_id, rece_id) {
        return axios.get(API_BASE_URL + 'get-deleteUserChat/' + user_id + '/' + rece_id);
    }
    getBlockUser(user_id, rece_id) {
        return axios.get(API_BASE_URL + 'get-bolckUserDelete/' + user_id + '/' + rece_id);
    }
    SaveUserProfile(data) {
        return axios.post(API_BASE_URL + 'profile/', data);
    }
    SaveMessage(data) {
        return axios.post(API_BASE_URL + 'message-save/', data);
    }
    getViewInfo(user_id, rece_id) {
        return axios.get(API_BASE_URL + 'get-viewinfo/' + user_id + '/' + rece_id);
    }
    getReceviceInfo(rece_id) {
        return axios.get(API_BASE_URL + 'get-receviceviewinfo/' + rece_id);
    }
    getDeleteChat(id) {
        return axios.get(API_BASE_URL + 'get-deleteChat/' + id);
    }
    getPopupmodelFile(id) {
        return axios.get(API_BASE_URL + 'get-popupmodelfile/' + id);
    }
}

export default new EmployeeService()