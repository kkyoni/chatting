import React, { Component } from "react";
import { Link } from 'react-router-dom';
class Notes extends Component {
    render() {
        var notes_HTMLTABLE = "";
        if (this.props.notes.length > 0) {
            notes_HTMLTABLE =
                this.props.notes.map((item, i) => {
                    const originalDate = new Date(item.created_at);
                    const formattedDate = originalDate.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                    });
                    return (
                        <div className="note-container">
                            <div className="note">
                                <div className="note-body">
                                    <div className="note-added-on">{formattedDate}</div>
                                    <h5 className="note-title">{item.title}</h5>
                                    <p className="note-description">{item.description}</p>
                                </div>
                                <div className="note-footer">
                                    <div className="note-tools">
                                        <span className={`badge ${item.status === 'Personal' ? 'badge-info' : item.status === 'Important' ? 'badge-danger' : item.status === 'Favourite' ? 'badge-primary' : 'badge-warning'}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="note-tools">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg className="hw-20" xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item text-danger" onClick={() => this.props.NotesDelete(item.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
        } else {
            notes_HTMLTABLE = <div className="note-container"><div className="note"><div className="note-body"><p className="note-description">Data Not Found...</p></div></div></div>
        }
        return (
            <>
                <div className={this.props.notesFlage === false ? "tab-content appnavbar-content" : "tab-content appnavbar-content appnavbar-content-visible"}>
                    <div className="tab-pane h-100" id="notes" role="tabpanel" aria-labelledby="notes-tab">
                        <div className="appnavbar-content-wrapper">
                            <div className="appnavbar-scrollable-wrapper">
                                <div className="appnavbar-heading sticky-top">
                                    <ul className="nav justify-content-between align-items-center">
                                        <li className="text-center">
                                            <h5 className="text-truncate mb-0">Notes</h5>
                                        </li>
                                        <li className="nav-item list-inline-item">
                                            <div data-appcontent-close="" onClick={this.props.handleNotesCloseClick}>
                                                <svg className="hw-22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                                                    </path>
                                                </svg>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="appnavbar-body">
                                    <div className="appnavbar-body-title">
                                        <div className="dropdown mr-2">
                                            <button className="btn btn-outline-default dropdown-toggle" type="button" data-notes-filter-list=""
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Notes</button>
                                            <div className="dropdown-menu">
                                                <Link className="dropdown-item" data-notes-filter="" data-select="AllNotes" to={"/"} onClick={() => this.props.handleLinkClick('AllNotes')}> All Notes</Link>
                                                <Link className="dropdown-item" data-notes-filter="" data-select="Personal" to={"/"} onClick={() => this.props.handleLinkClick('Personal')}> Personal</Link>
                                                <Link className="dropdown-item" data-notes-filter="" data-select="Work" to={"/"} onClick={() => this.props.handleLinkClick('Work')}> Work</Link>
                                                <Link className="dropdown-item" data-notes-filter="" data-select="Favourite" to={"/"} onClick={() => this.props.handleLinkClick('Favourite')}> Favourite</Link>
                                                <Link className="dropdown-item" data-notes-filter="" data-select="Important" to={"/"} onClick={() => this.props.handleLinkClick('Important')}> Important</Link>
                                            </div>
                                        </div>
                                        <form className="form-inline">
                                            <div className="input-group">
                                                <input type="text" className="form-control search border-right-0 transparent-bg pr-0"
                                                    placeholder="Search notes" value={this.props.searchNotes} onChange={this.props.handleSearch} />
                                                <div className="input-group-append">
                                                    <div className="input-group-text transparent-bg border-left-0" role="button">
                                                        <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {notes_HTMLTABLE}
                                </div>

                                <div className="appnavbar-footer">
                                    <div className="btn btn-primary btn-block" role="button" data-toggle="modal" data-target="#addNoteModal">Add
                                        new note</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Notes;