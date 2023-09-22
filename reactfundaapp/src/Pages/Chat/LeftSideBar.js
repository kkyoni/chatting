import React, { Component } from "react";
import Service from "../../services/EmployeeService";
import { toast } from 'react-toastify';
import Notes from "../PopUpModel/Notes";
import AddNotes from "../PopUpModel/AddNotes";
class LeftSideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            status: 'Personal',
            searchNotes: '',
            title_error: '',
            description_error: '',
            status_error: '',
            notes: [],
            notesFlage: false,
        }
    }
    async componentDidMount() {
        this.NotesGet();
    }
    NotesGet = () => {
        const login = JSON.parse(localStorage.getItem("userData"));
        Service.getNotes(login.id).then((res) => {
            if (res.data.status === 'success') {
                this.setState({ notes: res.data.notes });
            } else {
                this.setState({ notes: [] });
            }
        });
    }
    handleLinkClick = (filter) => {
        const login = JSON.parse(localStorage.getItem("userData"));
        Service.getNotesFilter(login.id, filter).then((res) => {
            if (res.data.status === 'success') {
                this.setState({ notes: res.data.notes });
            } else {
                this.setState({ notes: [] });
            }
        });
    }
    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleAddNotes = () => {
        const login = JSON.parse(localStorage.getItem("userData"));
        var data = {
            user_id: login.id,
            title: this.state.title,
            description: this.state.description,
            status: this.state.status
        };
        Service.CreateNotes(data).then((res) => {
            if (res.data.status === 'success') {
                toast.success("Notes SucessFully", { position: toast.POSITION.TOP_RIGHT });
                this.setState({
                    title: '',
                    description: '',
                    status: '',
                });
            } else {
                this.setState({
                    title_error: res.data.title_error,
                    description_error: res.data.description_error,
                    status_error: res.data.status_error,
                });
                setTimeout(() => {
                    this.setState({ title_error: "", description_error: "", status_error: "" });
                }, 2000);
                toast.error("Notes Validtion", { position: toast.POSITION.TOP_RIGHT });
            }
        });
    }
    NotesDelete = async (id) => {
        Service.DeleteNotes(id).then((res) => {
            if (res.data.status === 'success') {
                this.NotesGet();
            } else {
                console.log("Error");
                alert("Error");
            }
        });
    }
    handleSearch = (event) => {
        if (event.target.value) {
            const query = event.target.value;
            this.setState({ searchNotes: query });
            const filteredData = this.state.notes.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            this.setState({ notes: filteredData });
        } else {
            this.NotesGet();
            this.setState({ searchNotes: '' });
        }

    };
    handleNotesOpenClick = () => {
        this.setState({ notesFlage: true });
    };
    handleNotesCloseClick = () => {
        console.log("handleNotesCloseClick")
        this.setState({ notesFlage: false });
    };
    render() {
        return (
            <>
                <div className="appbar">
                    <div className="appbar-wrapper hide-scrollbar">
                        <div className="d-flex justify-content-center border-bottom w-100">
                            <button className="btn btn-secondary btn-icon m-0 btn-minimal btn-sm text-muted d-xl-none" type="button"
                                data-apps-close="">
                                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                        </div>

                        <div className="appbar-head">
                            <svg className="hw-20" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                                </path>
                            </svg>
                            <h6 className="mb-0 mt-1">Apps</h6>
                        </div>

                        <ul className="nav nav-minimal appbar-nav" id="appNavTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="notes-tab" data-toggle="tab" href="#notes" role="tab" aria-controls="notes"
                                    aria-selected="false" onClick={this.handleNotesOpenClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {this.state.notesFlage === true ? <Notes
                        notes={this.state.notes}
                        notesFlage={this.state.notesFlage}
                        handleNotesCloseClick={this.handleNotesCloseClick}
                        searchNotes={this.state.searchNotes}
                        handleSearch={this.handleSearch}
                        handleLinkClick={this.handleLinkClick}
                        NotesDelete={this.NotesDelete} /> : null}
                </div>
                <div className={this.state.notesFlage === false ? "backdrop" : "backdrop backdrop-visible"}></div>
                {this.state.notesFlage === true ? <AddNotes
                    title={this.state.title}
                    title_error={this.state.title_error}
                    description={this.state.description}
                    description_error={this.state.description_error}
                    status={this.state.status}
                    status_error={this.state.status_error}
                    handleAddNotes={this.handleAddNotes}
                    handleInput={this.handleInput} /> : null}
            </>
        );
    }
}

export default LeftSideBar;